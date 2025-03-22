import {
  type MyCrosswordBasicData,
  type MyCrosswordData,
} from "./crossword.type";

// QQ Add tests

export const mapMyCrosswordData = (
  basicData: MyCrosswordBasicData,
): MyCrosswordData => {
  return {
    ...basicData,
    solutionAvailable: true,
    entries: basicData.entries.map((entry) => ({
      ...entry,
      separatorLocations: entry.separatorLocations ?? {},
      clue: entry.clue + " (" + entry.solution.length + ")", // QQ Logic will need to be more sophisticated
      solution: entry.solution.toLocaleUpperCase(),
      length: entry.solution.length,
    })),
  };
};
