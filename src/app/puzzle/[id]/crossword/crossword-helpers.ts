import {
  type MyCrosswordBasicClue,
  type MyCrosswordBasicData,
  type MyCrosswordData,
} from "./crossword.type";

// QQ Add tests

export const mapMyCrosswordData = (
  basicData: MyCrosswordBasicData,
): MyCrosswordData => {
  const foo: MyCrosswordData = {
    ...basicData,
    solutionAvailable: true,
    entries: basicData.entries.map((entry) => ({
      ...entry,
      id: getId(entry),
      separatorLocations: entry.separatorLocations ?? {},
      clue: entry.clue + " (" + getSolution(entry).length + ")", // QQ Logic will need to be more sophisticated
      solution: getSolution(entry),
      length: getSolution(entry).length,
      group: entry.group ?? [getId(entry)],
      humanNumber: entry.humanNumber ?? entry.number.toString(),
    })),
  };
  console.log(foo);
  return foo;
};

const getId = (entry: MyCrosswordBasicClue): string =>
  entry.number.toString() + (entry.direction === "across" ? "a" : "d");

const getSolution = (entry: MyCrosswordBasicClue): string =>
  entry.solution.toUpperCase().replaceAll(/\s|-|'/g, "");
