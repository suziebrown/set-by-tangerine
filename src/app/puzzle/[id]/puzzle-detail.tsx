"use client";

import Crossword from "~/app/_components/crossword";
import DownloadButton from "~/app/_components/download-button";
import Title from "../../_components/title";
import { useState } from "react";
import { type PuzzleWithCrossword } from "prisma/types";
import { faCircleInfo, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "~/app/_components/badge";

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

      {!hideInfo && (
        <div className="flex flex-col gap-2 rounded-lg border-2 border-orange-500/30 bg-white/20 p-4">
          <i className="text-sm">
            Published on{" "}
            {puzzleDetails.firstPublishedAt
              ? puzzleDetails.firstPublishedAt.toLocaleDateString()
              : puzzleDetails.publishedAt.toLocaleDateString()}
          </i>

          {puzzleDetails.blurb && (
            <p className="text-pretty">{puzzleDetails.blurb}</p>
          )}

          {puzzleDetails.tags.length > 0 && (
            <ul>
              {puzzleDetails.tags.map((tag) => (
                <li key={tag.id}>
                  <Badge label={tag.label} />
                </li>
              ))}
            </ul>
          )}
        </div>
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
