"use client";

import DownloadButton from "@components/download-button";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type PuzzleWithCrossword } from "prisma/types";
import { useState } from "react";
import Crossword from "~/app/puzzle/[id]/crossword";
import Title from "../../_components/title";
import InfoBox from "./info-box";

export default function PuzzleDetail({
  puzzleDetails,
}: {
  puzzleDetails: PuzzleWithCrossword;
}) {
  const [hideInfo, setHideInfo] = useState(false);

  return (
    <>
      <div className="space-between flex w-full items-center">
        <span className="inline-flex flex-grow items-center">
          <Title>{puzzleDetails.title}</Title>

          <button
            onClick={() => setHideInfo((show) => !show)}
            className="h-8 w-8 text-orange-500 hover:text-orange-600"
            aria-label={hideInfo ? "Show info" : "Hide info"}
          >
            <FontAwesomeIcon className="h-4 w-4" icon={faInfoCircle} />
          </button>
        </span>

        {puzzleDetails.downloadUrl && (
          <DownloadButton url={puzzleDetails.downloadUrl} />
        )}
      </div>

      {!hideInfo && <InfoBox puzzleDetails={puzzleDetails} />}

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
