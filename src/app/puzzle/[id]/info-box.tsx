import { type PuzzleWithCrossword } from "prisma/types";
import { Badge } from "@components/badge";

export default function InfoBox({
  puzzleDetails,
}: {
  puzzleDetails: PuzzleWithCrossword;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 border-orange-300 bg-orange-200 p-4">
      <i className="text-sm">
        Published on{" "}
        {puzzleDetails.firstPublishedAt
          ? puzzleDetails.firstPublishedAt.toLocaleDateString("en-GB")
          : puzzleDetails.publishedAt.toLocaleDateString("en-GB")}
      </i>

      {puzzleDetails.blurb && (
        <p className="text-pretty">{puzzleDetails.blurb}</p>
      )}

      {puzzleDetails.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1">
          {puzzleDetails.tags.map((tag) => (
            <li key={tag.id}>
              <Badge label={tag.label} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
