/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This page allows an administrator to add a new movie to the Supabase database.
The form collects a movie title, actors, and release year from the user.
All required fields and the release year are validated before database insertion.
After a successful insert, the user is redirected to the main movie list.
*/

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

export default function AddMoviePage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");

    const year = Number(releaseYear);
    const currentYear = new Date().getFullYear();

    if (
      !title.trim() ||
      !actors.trim() ||
      !releaseYear.trim()
    ) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (
      Number.isNaN(year) ||
      !Number.isInteger(year) ||
      year < 1888 ||
      year > currentYear + 5
    ) {
      setErrorMessage(
        "Please enter a valid release year."
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("movies")
      .insert({
        title: title.trim(),
        actors: actors.trim(),
        release_year: year,
      });

    if (error) {
      console.error("ADD MOVIE ERROR:", error);

      setErrorMessage(
        "Unable to add movie: " + error.message
      );

      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-[70vh] bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">
          Add Movie
        </h1>

        <p className="mt-2 text-slate-600">
          Enter the movie information below.
        </p>

        {errorMessage && (
          <div className="mt-6 rounded-lg bg-red-100 p-4 text-red-700">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-semibold text-slate-800"
            >
              Movie Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              placeholder="Enter movie title"
            />
          </div>

          <div>
            <label
              htmlFor="actors"
              className="mb-2 block font-semibold text-slate-800"
            >
              Actors
            </label>

            <input
              id="actors"
              type="text"
              value={actors}
              onChange={(event) =>
                setActors(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              placeholder="Example: Actor One, Actor Two"
            />
          </div>

          <div>
            <label
              htmlFor="releaseYear"
              className="mb-2 block font-semibold text-slate-800"
            >
              Release Year
            </label>

            <input
              id="releaseYear"
              type="number"
              value={releaseYear}
              onChange={(event) =>
                setReleaseYear(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              placeholder="2024"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Movie"}
            </button>

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}