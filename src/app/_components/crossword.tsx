import { type CrosswordWithClues } from "prisma/types";

export default function Crossword(props: { crossword: CrosswordWithClues }) {
  return (
    <>
      {props.crossword.instructions && (
        <p className="text-pretty">{props.crossword.instructions}</p>
      )}

      <div className="gap-12 lg:flex">
        <div>
          <h2 className="mb-2 font-bold">Across</h2>
          <table>
            <tbody>
              {props.crossword.clues
                .filter((c) => c.direction === "across")
                .sort((a, b) => Number(a.numberLabel) - Number(b.numberLabel))
                .map((clue) => (
                  <tr key={clue.id}>
                    <td className="min-w-16 align-baseline font-semibold">
                      {clue.numberLabel}.
                    </td>
                    <td>
                      <span
                        dangerouslySetInnerHTML={{ __html: clue.clue }}
                      ></span>{" "}
                      ({clue.lengthLabel})
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="mb-2 font-bold">Down</h2>
          <table>
            <tbody>
              {props.crossword.clues
                .filter((c) => c.direction === "down")
                .sort((a, b) => Number(a.numberLabel) - Number(b.numberLabel))
                .map((clue) => (
                  <tr key={clue.id}>
                    <td className="min-w-16 align-baseline font-semibold">
                      {clue.numberLabel}.
                    </td>
                    <td>
                      <span
                        dangerouslySetInnerHTML={{ __html: clue.clue }}
                      ></span>{" "}
                      ({clue.lengthLabel})
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
