import { PuzzlePreview } from "~/app/_components/puzzle-preview";
import { api } from "~/trpc/server";

export default async function Browse() {
  const puzzles = await api.puzzle.getAll();

  void api.post.getLatest.prefetch();

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">Browse puzzles</h1>

      <div className="flex w-full flex-wrap justify-center">
        {puzzles.map((p) => (
          <PuzzlePreview puzzle={p} key={p.id} />
        ))}
      </div>
    </>
  );
}
