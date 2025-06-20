"use client";

import DownloadButton from "@components/download-button";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type PuzzleWithCrossword } from "prisma/types";
import { useState } from "react";
import Crossword from "~/app/puzzle/[id]/crossword/crossword";
import Title from "../../_components/title";
import InfoBox from "./info-box";
import { parseCrosswordDataJson } from "~/helpers/crossword-helpers";

export default function PuzzleDetail({
  puzzleDetails,
}: {
  puzzleDetails: PuzzleWithCrossword;
}) {
  const [showInfo, setShowInfo] = useState(false);

  const crosswordData = parseCrosswordDataJson(puzzleDetails?.crossword?.data);

  return (
    <>
      <div className="space-between flex w-full items-center">
        <span className="inline-flex flex-grow items-center">
          <Title>{puzzleDetails.title}</Title>

          <button
            onClick={() => setShowInfo((show) => !show)}
            className="ml-2 h-5 w-5 rounded-full border border-orange-700 bg-orange-500 hover:bg-orange-600"
            aria-label={showInfo ? "Hide info" : "Show info"}
          >
            <FontAwesomeIcon className="mb-1 h-3 w-3" icon={faInfo} />
          </button>
        </span>

        {puzzleDetails.downloadUrl && (
          <DownloadButton url={puzzleDetails.downloadUrl} />
        )}
      </div>

      {showInfo && <InfoBox puzzleDetails={puzzleDetails} />}

      {puzzleDetails?.crossword && crosswordData && (
        <Crossword
          id={puzzleDetails.crossword.id}
          instructions={puzzleDetails.crossword.instructions}
          data={crosswordData}
        />
      )}
    </>
  );
}
