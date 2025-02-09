import Crossword from "~/app/_components/crossword";
import { api } from "~/trpc/server";
import Title from "../../_components/title";

export default async function ViewPuzzle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const puzzleDetails = await api.puzzle.getById({ id: parseInt(id) });

  return (
    <>
      <Title>{puzzleDetails.title}</Title>
      <p className="text-pretty rounded-lg border border-white/30 bg-white/20 px-4 py-2">
        {puzzleDetails.blurb}
      </p>

      {puzzleDetails?.crossword && (
        <Crossword crossword={puzzleDetails.crossword} />
      )}
    </>
  );
}
