import { type GuardianClue, type GuardianCrossword } from "mycrossword";
import { type SeparatorLocationsOptional } from "node_modules/mycrossword/dist/types";

export type MyCrosswordBasicClue = Omit<
  GuardianClue,
  "id" | "solution" | "separatorLocations" | "length" | "group" | "humanNumber"
> & {
  solution: string;
  separatorLocations?: SeparatorLocationsOptional;
  group?: string[];
  explanation?: string;
  clueWithDefinitionUnderlined?: string;
};

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
  entries: MyCrosswordBasicClue[];
};

export type MyCrosswordClue = Omit<GuardianClue, "solution"> & {
  solution: string;
};

export type MyCrosswordData = MyCrosswordBasicData & {
  solutionAvailable: true;
  entries: MyCrosswordClue[];
};
