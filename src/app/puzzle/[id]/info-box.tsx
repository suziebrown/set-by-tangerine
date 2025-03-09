import { type PuzzleWithCrossword } from "prisma/types";
import { Badge } from "~/app/_components/badge";

export default function InfoBox({
  puzzleDetails,
}: {
  puzzleDetails: PuzzleWithCrossword;
}) {
  return (
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
  );
}
