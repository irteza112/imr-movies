/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This page allows the user to edit an existing movie record stored in Supabase.
The selected movie is retrieved using the dynamic movie ID from the page URL.
The title, actors, and release year are displayed in a form and validated before update.
After a successful update, the user is redirected to the main movie list.
*/

"use client";

import {
  FormEvent,
  use,
  useEffect,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function EditMoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      const { data, error } = await supabase
        .from("movies")
        .select("title, actors, release_year")
        .eq("id", Number(id))
        .single();

      if (error || !data) {
        setErrorMessage("Unable to load movie.");
        setLoading(false);
        return;
      }

      setTitle(data.title);
      setActors(data.actors);
      setReleaseYear(String(data.release_year));
      setLoading(false);
    }

    loadMovie();
  }, [id]);

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
      .update({
        title: title.trim(),
        actors: actors.trim(),
        release_year: year,
      })
      .eq("id", Number(id));

    if (error) {
      setErrorMessage(
        "Unable to update movie: " + error.message
      );
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-gray-100 px-6 py-12">
        <p className="text-center text-slate-600">
          Loading movie...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-slate-900">
          Edit Movie
        </h1>

        <p className="mt-2 text-slate-600">
          Update the movie information below.
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
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              Save Changes
            </button>

            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}