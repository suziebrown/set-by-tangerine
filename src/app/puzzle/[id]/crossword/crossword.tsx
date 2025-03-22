import { MyCrossword } from "mycrossword";
import { helloMyNameIs } from "../../../../../prisma/crossword-data/hello-my-name-is";
import { mapMyCrosswordData } from "../../../../helpers/crossword-helpers";
import { type Crossword as PrismaCrossword } from "@prisma/client";

// QQ Save crossword data (JSON stringified) into db and JSON.parse on retrieval

export default function Crossword(props: { crossword: PrismaCrossword }) {
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
