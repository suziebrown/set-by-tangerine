import { CrosswordWithClues } from "prisma/types";

export default function Crossword(props: { crossword: CrosswordWithClues }) {
  return (
    <>
      <h2>Across</h2>
      <ul>
        {props.crossword.clues.map((clue) => (
          <li key={clue.id}>
            <strong>{clue.numberLabel}</strong> {clue.clue} ({clue.lengthLabel})
          </li>
        ))}
      </ul>

      <h2>Down</h2>
      <ul>
        {props.crossword.clues.map((clue) => (
          <li key={clue.id}>
            <strong>{clue.numberLabel}</strong> {clue.clue}
          </li>
        ))}
      </ul>
    </>
  );
}
