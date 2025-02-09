import { type PuzzleWithTags } from "prisma/types";
import { Badge } from "./badge";

export function PuzzlePreview(props: { puzzle: PuzzleWithTags }) {
  return (
    <a
      href={`/puzzle/${props.puzzle.id}`}
      className="flex-grow rounded-lg border border-white/30 bg-white/20 p-2"
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
      <img
        src={props.puzzle.imageUrl ?? undefined}
        alt={`Preview of ${props.puzzle.title}`}
        className="mt-2 h-auto w-full"
      />
    </a>
  );
}
