/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This page retrieves movie records from the Supabase database.
Only authenticated users can access the movie portal.
The user's profile determines whether administrator controls are displayed.
Movie information is loaded securely using the authenticated Supabase server client.
*/

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import MovieActions from "./components/MovieActions";

type Movie = {
  id: number;
  title: string;
  actors: string;
  release_year: number;
};

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

export default async function Home() {
  const supabase = await getSupabaseServerClient();

  // Check current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Visitors must sign in before accessing movies
  if (!user) {
    redirect("/login");
  }

  // Read current user's role
  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  const isAdmin = profile?.role === "admin";

  // Retrieve all movie records
  const { data, error } = await supabase
    .from("movies")
    .select("id, title, actors, release_year")
    .order("id", { ascending: true });

  const movies: Movie[] = data ?? [];

  return (
    <main className="min-h-[70vh] bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Internet Movies Rental
            </h1>

            <p className="mt-3 text-lg text-slate-600">
              Browse and manage the IMR movie collection.
            </p>
          </div>

          <div className="rounded-lg bg-white px-4 py-3 shadow-sm">
            <p className="text-sm text-slate-500">
              Signed in as
            </p>

            <p className="font-semibold text-slate-900">
              {isAdmin ? "Administrator" : "Regular User"}
            </p>
          </div>
        </div>

        {profileError && (
          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
            Profile error: {profileError.message}
          </div>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Movies
          </h2>

          {error && (
            <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
              Database error: {error.message}
            </div>
          )}

          {!error && movies.length === 0 ? (
            <div className="mt-6 rounded-xl bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">
                No movies found.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {movies.map((movie) => (
                <article
                  key={movie.id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    {movie.title}
                  </h3>

                  <p className="mt-4 text-slate-700">
                    <span className="font-semibold">
                      Actors:
                    </span>{" "}
                    {movie.actors}
                  </p>

                  <p className="mt-2 text-slate-700">
                    <span className="font-semibold">
                      Release Year:
                    </span>{" "}
                    {movie.release_year}
                  </p>

                  {isAdmin && (
                    <MovieActions id={movie.id} />
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}