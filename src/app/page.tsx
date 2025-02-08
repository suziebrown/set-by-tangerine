import { api, HydrateClient } from "~/trpc/server";
import { PuzzlePreview } from "./_components/puzzle-preview";

export default async function Home() {
  const puzzles = await api.puzzle.getAll();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-orange-300 to-orange-500 text-black">
        <div className="container flex flex-col justify-start gap-4 p-4">
          <h1 className="text-2xl font-bold tracking-tight">Browse puzzles</h1>

          <div className="flex w-full justify-center flex-wrap">
            {puzzles.map((p) => (
              <PuzzlePreview puzzle={p} key={p.id} />
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
