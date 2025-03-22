import { MyCrossword } from "mycrossword";
import { type CrosswordWithClues } from "prisma/types";
import { helloMyNameIs } from "../../../../hello-my-name-is";
import { mapMyCrosswordData } from "./crossword-helpers";

// QQ Save crossword data (JSON stringified) into db and JSON.parse on retrieval

export default function Crossword(props: { crossword: CrosswordWithClues }) {
  return (
    <>
      <MyCrossword
        id="crossword-1"
        data={mapMyCrosswordData(helloMyNameIs)}
        theme="deepOrange"
      />

      {props.crossword.instructions && (
        <p className="text-pretty">{props.crossword.instructions}</p>
      )}

      <div className="flex flex-col gap-12 lg:flex-row">
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
