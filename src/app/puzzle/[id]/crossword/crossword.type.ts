import { type GuardianClue, type GuardianCrossword } from "mycrossword";
import { type SeparatorLocationsOptional } from "node_modules/mycrossword/dist/types";

export type MyCrosswordBasicData = Omit<
  GuardianCrossword,
  | "id"
  | "name"
  | "number"
  | "date"
  | "crosswordType"
  | "solutionAvailable"
  | "entries"
> & {
  entries: (Omit<GuardianClue, "solution" | "separatorLocations" | "length"> & {
    solution: string;
    separatorLocations?: SeparatorLocationsOptional | undefined;
  })[];
};

export type MyCrosswordData = MyCrosswordBasicData & {
  solutionAvailable: true;
  entries: (MyCrosswordBasicData["entries"][number] & {
    length: number;
  })[];
};
