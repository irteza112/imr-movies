/*
Name: Irteza Hassan
Date: August 2026
Program: Internet Movies Rental (IMR) Movie Management Application.
This component provides Edit and Delete controls for each movie record.
The Edit button opens the selected movie in the edit page using its unique ID.
The Delete button asks for confirmation before removing the movie from Supabase.
After deletion, the movie list is refreshed to display the latest database records.
*/

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type MovieActionsProps = {
  id: number;
};

export default function MovieActions({ id }: MovieActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("movies")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Unable to delete movie: " + error.message);
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-5 flex gap-3">
      <Link
        href={`/movies/edit/${id}`}
        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
      >
        Edit
      </Link>

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}