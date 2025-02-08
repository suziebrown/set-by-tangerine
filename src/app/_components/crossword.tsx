import { Puzzle } from "@prisma/client";

export default function Crossword(props: { puzzle: Puzzle }) {
  return (
    <h1>{props.puzzle.id}</h1>
  );
}
