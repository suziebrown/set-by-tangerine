import {
  type JsonValue,
  type JsonObject,
} from "@prisma/client/runtime/library";
import {
  type MyCrosswordBasicClue,
  type MyCrosswordBasicData,
  type MyCrosswordData,
} from "../app/puzzle/[id]/crossword/crossword.type";

// QQ Add tests
export const parseCrosswordDataJson = (
  json?: JsonValue,
): MyCrosswordData | null => {
  if (json == null) return null;

  const crosswordData = JSON.parse(json as string) as MyCrosswordData;
  return mapMyCrosswordData(crosswordData);
};

export const mapMyCrosswordData = (
  basicData: MyCrosswordBasicData,
): MyCrosswordData => ({
  ...basicData,
  solutionAvailable: true,
  entries: basicData.entries.map((entry) => ({
    ...entry,
    id: getId(entry),
    separatorLocations: entry.separatorLocations ?? {},
    clue: entry.clue + " (" + getSolution(entry).length + ")", // QQ Logic will need to be more sophisticated for split answers
    solution: getSolution(entry),
    length: getSolution(entry).length,
    group: entry.group ?? [getId(entry)],
    humanNumber: entry.humanNumber ?? entry.number.toString(),
  })),
});

const getId = (entry: MyCrosswordBasicClue): string =>
  entry.number.toString() + (entry.direction === "across" ? "a" : "d");

const getSolution = (entry: MyCrosswordBasicClue): string =>
  entry.solution.toUpperCase().replaceAll(/\s|-|'/g, "");
