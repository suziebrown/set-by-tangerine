import { api } from "~/trpc/server";
import PuzzleDetail from "./puzzle-detail";
import { type Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const puzzleDetails = await api.puzzle.getById({ id: parseInt(id) });

  return {
    title: puzzleDetails.title + " | Set by Tangerine",
  };
}

export default async function ViewPuzzle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const puzzleDetails = await api.puzzle.getById({ id: parseInt(id) });

  return <PuzzleDetail puzzleDetails={puzzleDetails} />;
}
