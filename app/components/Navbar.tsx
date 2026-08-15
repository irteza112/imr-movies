/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This component displays the main navigation bar for the IMR application.
It checks the current authenticated Supabase user and retrieves the user's role.
Administrators can access movie management features such as adding movies.
Regular users can browse movies but cannot access administrator controls.
*/

import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import LogoutButton from "./logoutbutton";

async function getSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(
              ({ name, value, options }) => {
                cookieStore.set(name, value, options);
              }
            );
          } catch {
            // Cookie updates may not be available
            // while rendering a Server Component.
          }
        },
      },
    }
  );
}

export default async function Navbar() {
  const supabase = await getSupabaseServerClient();

  // Get the currently authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;

  // Check the user's application role
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    isAdmin = profile?.role === "admin";
  }

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          IMR Movies
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="hover:text-gray-300"
          >
            Home
          </Link>

          {user && isAdmin && (
            <Link
              href="/movies/add"
              className="hover:text-gray-300"
            >
              Add Movie
            </Link>
          )}

          {!user && (
            <>
              <Link
                href="/login"
                className="hover:text-gray-300"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="hover:text-gray-300"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && <LogoutButton />}
        </div>
      </div>
    </nav>
  );
}