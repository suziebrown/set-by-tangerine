import Crossword from "~/app/_components/crossword";
import { api } from "~/trpc/server";

export default async function ViewPuzzle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const puzzleDetails = await api.puzzle.getById({ id: parseInt(id) });

  return (
    <>
      <div>Puzzle ID: {id}</div>
      <div>Tags: {puzzleDetails.tags[0]?.label}</div>

      {/* {puzzleDetails?.crosswordPuzzle && <Crossword puzzle={puzzleDetails} />} */}
    </>
  );
}
