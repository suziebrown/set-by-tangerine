"use client";

import Crossword from "~/app/_components/crossword";
import DownloadButton from "~/app/_components/download-button";
import Title from "../../_components/title";
import { useState } from "react";
import { type PuzzleWithCrossword } from "prisma/types";

export default function PuzzleDetail({
  puzzleDetails,
}: {
  puzzleDetails: PuzzleWithCrossword;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="space-between flex w-full items-center">
        <Title>
          {puzzleDetails.title}
          <button
            onClick={() => setShowDetails((show) => !show)}
            className="text-pretty underline"
          >
            {showDetails ? "Hide" : "Show"} details
          </button>
        </Title>

        {puzzleDetails.downloadUrl && (
          <DownloadButton url={puzzleDetails.downloadUrl} />
        )}
      </div>

      {showDetails && puzzleDetails.blurb && (
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
