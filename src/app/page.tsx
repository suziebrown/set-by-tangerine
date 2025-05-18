import { PuzzlePreview } from "@app/browse/puzzle-preview";
import { api } from "~/trpc/server";
import Title from "@components/title";

export default async function Browse() {
  const puzzles = await api.puzzle.list();

  return (
    <>
      <Title>Browse puzzles</Title>

      <div className="flex w-full flex-wrap justify-start gap-4">
        {puzzles.map((p) => (
          <PuzzlePreview puzzle={p} key={p.id} />
        ))}
      </div>
    </>
  );
}
