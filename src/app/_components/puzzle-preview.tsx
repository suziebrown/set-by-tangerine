"use client";

import { Puzzle } from "@prisma/client";

export function PuzzlePreview(props: { puzzle: Puzzle }) {
  return (
    <div className="flex-grow rounded-lg border border-white/30 bg-white/20 p-2">
      {props.puzzle.title}
    </div>
  );
}
