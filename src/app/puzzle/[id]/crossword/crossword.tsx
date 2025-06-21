import { MyCrossword } from "mycrossword";
import { type JsonValue } from "@prisma/client/runtime/library";
import { parseCrosswordDataJson } from "~/helpers/crossword-helpers";
import { useMemo } from "react";

export default function Crossword(props: {
  id: number;
  instructions: string | null;
  data: JsonValue;
}) {
  const crosswordData = useMemo(
    () => parseCrosswordDataJson(props.data),
    [props.data],
  );

  return (
    <>
      {props.instructions && (
        <p className="text-pretty">{props.instructions}</p>
      )}

      {crosswordData && (
        <MyCrossword
          id={props.id.toString()}
          data={crosswordData}
          theme="deepOrange"
        />
      )}
    </>
  );
}
