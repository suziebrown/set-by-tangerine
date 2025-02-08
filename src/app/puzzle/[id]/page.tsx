import { Puzzle } from "@prisma/client";
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
      <p>{puzzleDetails.blurb}</p>

      {puzzleDetails?.crossword && (
        <Crossword crossword={puzzleDetails.crossword} />
      )}
    </>
  );
}
