import { type GuardianClue, type GuardianCrossword } from "mycrossword";
import { type SeparatorLocationsOptional } from "node_modules/mycrossword/dist/types";

export type MyCrosswordBasicClue = Omit<
  GuardianClue,
  "id" | "solution" | "separatorLocations" | "length" | "group" | "humanNumber"
> & {
  solution: string;
  separatorLocations?: SeparatorLocationsOptional;
  group?: string[];
  humanNumber?: string;
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

export type MyCrosswordData = MyCrosswordBasicData & {
  solutionAvailable: true;
  entries: (MyCrosswordBasicData["entries"][number] & {
    id: string;
    length: number;
    group: string[];
    humanNumber: string;
  })[];
};
