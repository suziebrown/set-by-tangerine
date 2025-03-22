import { MyCrossword } from "mycrossword";
import { type MyCrosswordData } from "./crossword.type";

export default function Crossword(props: {
  id: number;
  instructions: string | null;
  data: MyCrosswordData;
}) {
  return (
    <>
      {props.instructions && (
        <p className="text-pretty">{props.instructions}</p>
      )}

      <MyCrossword
        id={props.id.toString()}
        data={props.data}
        theme="deepOrange"
      />
    </>
  );
}
