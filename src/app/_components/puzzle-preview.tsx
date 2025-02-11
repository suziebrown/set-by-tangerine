import { type PuzzleWithTags } from "prisma/types";
import { Badge } from "./badge";

export function PuzzlePreview(props: { puzzle: PuzzleWithTags }) {
  return (
    <a
      href={`/puzzle/${props.puzzle.id}`}
      className="max-w-[400px] flex-grow rounded-lg border border-white/30 bg-white/20 p-2"
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

      <div className="mt-4 h-[150px] w-full overflow-hidden rounded">
        <img
          src={props.puzzle.imageUrl ?? undefined}
          alt={`Preview of ${props.puzzle.title}`}
          className="scale-125"
        />
      </div>
    </a>
  );
}
