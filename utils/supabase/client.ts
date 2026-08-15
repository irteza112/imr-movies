/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This file creates the Supabase browser client used by the application.
It reads the Supabase URL and publishable key from environment variables.
The client allows the application to communicate with the Supabase database.
*/

import { createBrowserClient } from "@supabase/ssr";

// Create and return the Supabase browser client
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}