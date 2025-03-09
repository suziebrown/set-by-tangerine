import { type PuzzleWithTags } from "prisma/types";
import { Badge } from "@components/badge";
import { PreviewImage } from "@app/browse/preview-image";

export function PuzzlePreview(props: { puzzle: PuzzleWithTags }) {
  return (
    <a
      href={`/puzzle/${props.puzzle.id}`}
      className="max-w-[400px] flex-grow rounded-lg border border-white/30 bg-white/20 p-2 hover:bg-white/30"
    >
      <h3 className="text-lg font-semibold">{props.puzzle.title}</h3>

      <span className="text-sm">
        First published on {props.puzzle.firstPublishedAt?.toLocaleDateString()}
      </span>

      <ul className="mt-2">
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
