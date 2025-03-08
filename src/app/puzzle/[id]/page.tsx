import Crossword from "~/app/_components/crossword";
import DownloadButton from "~/app/_components/download-button";
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
      <div className="space-between flex w-full items-center">
        <Title>{puzzleDetails.title}</Title>

        {puzzleDetails.downloadUrl && (
          <DownloadButton url={puzzleDetails.downloadUrl} />
        )}
      </div>

      {puzzleDetails.blurb && (
        <p className="text-pretty rounded-lg border border-white/30 bg-white/20 px-4 py-2">
          {puzzleDetails.blurb}
        </p>
      )}

      {puzzleDetails?.imageUrl && (
        <img
          src={
            process.env.NEXT_PUBLIC_IMAGES_BLOB_PREFIX + puzzleDetails.imageUrl
          }
          alt={puzzleDetails.imageUrl}
          className="max-w-[600px]"
        />
      )}

      {puzzleDetails?.crossword && (
        <Crossword crossword={puzzleDetails.crossword} />
      )}
    </>
  );
}
