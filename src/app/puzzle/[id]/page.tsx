import { api } from "~/trpc/server";
import PuzzleDetail from "./puzzle-detail";

export default async function ViewPuzzle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const puzzleDetails = await api.puzzle.getById({ id: parseInt(id) });

  return <PuzzleDetail puzzleDetails={puzzleDetails} />;
}
