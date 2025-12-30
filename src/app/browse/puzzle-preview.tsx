import { type PuzzleWithTags } from "prisma/types";
import { Badge } from "@components/badge";
import { PreviewImage } from "@app/browse/preview-image";

export function PuzzlePreview(props: { puzzle: PuzzleWithTags }) {
  return (
    <a
      href={`/puzzle/${props.puzzle.id}`}
      className="max-w-[400px] flex-grow rounded-lg border border-orange-300 bg-orange-200 p-2 hover:bg-orange-300"
    >
      <h3 className="text-lg font-semibold">{props.puzzle.title}</h3>

      <span className="text-sm">
        Published on{" "}
        {props.puzzle.firstPublishedAt
          ? props.puzzle.firstPublishedAt.toLocaleDateString("en-GB")
          : props.puzzle.publishedAt.toLocaleDateString("en-GB")}
      </span>

      <ul className="mt-2 flex flex-wrap gap-1">
        {props.puzzle.tags.map((tag) => (
          <li key={tag.id}>
            <Badge label={tag.label} />
          </li>
        ))}
      </ul>

      <PreviewImage src={props.puzzle.imageUrl} alt={props.puzzle.title} />
    </a>
  );
}
