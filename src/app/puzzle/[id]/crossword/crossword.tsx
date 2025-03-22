import { MyCrossword } from "mycrossword";
import { type CrosswordWithClues } from "prisma/types";
import { helloMyNameIs } from "../../../../hello-my-name-is";
import { mapMyCrosswordData } from "./crossword-helpers";

// QQ Save crossword data (JSON stringified) into db and JSON.parse on retrieval

export default function Crossword(props: { crossword: CrosswordWithClues }) {
  return (
    <>
      {props.crossword.instructions && (
        <p className="text-pretty">{props.crossword.instructions}</p>
      )}

      <MyCrossword
        id={props.crossword.id.toString()}
        data={mapMyCrosswordData(helloMyNameIs)}
        theme="deepOrange"
      />
    </>
  );
}
