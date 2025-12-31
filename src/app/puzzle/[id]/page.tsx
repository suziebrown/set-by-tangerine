import { api } from "~/trpc/server";
import PuzzleDetail from "./puzzle-detail";
import { type Metadata } from "next";
import { defaultPageTitle } from "~/app/layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const puzzleDetails = await api.puzzle.getById({ id });

  return {
    title: puzzleDetails.title + " | " + defaultPageTitle,
  };
}

export default async function ViewPuzzle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return <PuzzleDetail id={id} />;
}
