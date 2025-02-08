import { PuzzlePreview } from "~/app/_components/puzzle-preview";
import { api } from "~/trpc/server";
import Title from "../_components/title";

export default async function Browse() {
  const puzzles = await api.puzzle.list();

  return (
    <>
      <Title>Browse puzzles</Title>

      <div className="flex w-full flex-wrap justify-center">
        {puzzles.map((p) => (
          <PuzzlePreview puzzle={p} key={p.id} />
        ))}
      </div>
    </>
  );
}
