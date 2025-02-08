import { api, HydrateClient } from "~/trpc/server";
import { PuzzlePreview } from "./_components/puzzle-preview";

export default async function Home() {
  const puzzles = await api.puzzle.getAll();

  void api.post.getLatest.prefetch();

  return (
          <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
  );
}
