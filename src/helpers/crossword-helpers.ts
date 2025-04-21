import { type JsonValue } from "@prisma/client/runtime/library";
import { type SeparatorLocationsOptional } from "node_modules/mycrossword/dist/types";
import {
  type MyCrosswordClue,
  type MyCrosswordBasicClue,
  type MyCrosswordBasicData,
  type MyCrosswordData,
} from "../app/puzzle/[id]/crossword/crossword.type";

// QQ Add tests for the top-level function too
export const parseCrosswordDataJson = (
  json?: JsonValue,
): MyCrosswordData | null => {
  if (json == null) return null;

  const crosswordData = JSON.parse(json as string) as MyCrosswordBasicData;
  return mapMyCrosswordData(crosswordData);
};

export const mapMyCrosswordData = (
  basicData: MyCrosswordBasicData,
): MyCrosswordData => ({
  ...basicData,
  solutionAvailable: true,
  entries: basicData.entries.map((entry) =>
    mapCrosswordEntry(entry, basicData.entries),
  ),
});

const mapCrosswordEntry = (
  entry: MyCrosswordBasicClue,
  allEntries: MyCrosswordBasicClue[],
): MyCrosswordClue => {
  const id = getId(entry);
  const normalisedSolution = getNormalisedSolution(entry);

  return {
    ...entry,
    id: id,
    separatorLocations: entry.separatorLocations ?? getSeparators(entry),
    clue: getNormalisedClue(entry, id, allEntries),
    solution: normalisedSolution,
    length: normalisedSolution.length,
    group: entry.group ?? [id],
    humanNumber: entry.humanNumber ?? entry.number.toString(),
  };
};

// TODO Add tests for the lower-level helper functions too
const getId = (entry: MyCrosswordBasicClue): string =>
  entry.number.toString() + (entry.direction === "across" ? "a" : "d");

const getNormalisedSolution = (entry: MyCrosswordBasicClue): string =>
  entry.solution.toUpperCase().replaceAll(/\s|-|'/g, "");

const getNormalisedClue = (
  entry: MyCrosswordBasicClue,
  id: string,
  allEntries: MyCrosswordBasicClue[],
): string => {
  if (entry.group && entry.group.length > 1 && entry.group[0] !== id) {
    const firstLinkedClue = entry.group[0]!;
    const firstLinkedClueNumber = firstLinkedClue.slice(0, -1);

    // TODO look up the actual linked clue from allEntries
    if (firstLinkedClue.endsWith("a")) {
      if (entry.direction === "across") {
        return `See ${firstLinkedClueNumber}`;
      }
      return `See ${firstLinkedClueNumber} across`;
    } else if (firstLinkedClue.endsWith("d")) {
      if (entry.direction === "down") {
        return `See ${firstLinkedClueNumber}`;
      }
      return `See ${firstLinkedClueNumber} down`;
    }

    throw new Error(
      `Error in clue '${id}': Couldn't establish direction of first linked clue.`,
    );
  }

  return entry.clue + " (" + getHumanWordLengths(entry, id, allEntries) + ")";
};

const getLinkedNormalisedSolution = (
  entry: MyCrosswordBasicClue,
  allEntries: MyCrosswordBasicClue[],
): string => {
  if (!entry.group || entry.group.length === 1) {
    return getNormalisedSolution(entry);
  }

  const linkedSolutions = entry.group.map((id) => {
    const linkedEntry = allEntries.find((entry) => getId(entry) === id);

    if (!linkedEntry) {
      throw new Error(`Linked entry with id ${id} not found`);
    }

    return getNormalisedSolution(linkedEntry);
  });

  return linkedSolutions.join("");
};

const getLinkedSeparators = (
  entry: Readonly<MyCrosswordBasicClue>,
  allEntries: ReadonlyArray<MyCrosswordBasicClue>,
): SeparatorLocationsOptional => {
  if (!entry.group || entry.group.length === 1) {
    return getSeparators(entry);
  }

  const allSpaceLocations: number[] = [];
  const allHyphenLocations: number[] = [];

  for (const id of entry.group) {
    const linkedEntry = allEntries.find((entry) => getId(entry) === id);

    if (!linkedEntry) {
      throw new Error(`Linked entry with id ${id} not found`);
    }

    const separators = linkedEntry.separatorLocations;
    if (!separators) {
      throw new Error(
        `Error in clue '${id}': Separator locations must be specified manually for linked clues.`,
      );
    }

    const spaces = separators[","] ?? [];
    allSpaceLocations.push(...spaces);

    const hyphens = separators["-"] ?? [];
    allHyphenLocations.push(...hyphens);
  }

  let result: SeparatorLocationsOptional = {};
  if (allSpaceLocations.length > 0) {
    result = { ...result, ",": allSpaceLocations };
  }
  if (allHyphenLocations.length > 0) {
    result = { ...result, "-": allHyphenLocations };
  }
  return result;
};

const getHumanWordLengths = (
  entry: MyCrosswordBasicClue,
  id: string,
  allEntries: MyCrosswordBasicClue[],
): string => {
  if (entry.group && entry.group.length > 1 && entry.group[0] !== id) {
    return "";
  }

  const normalisedSolution = getLinkedNormalisedSolution(entry, allEntries);
  const { ",": spaces, "-": hyphens } = getLinkedSeparators(entry, allEntries);

  const allSeparatorsInOrder = [...(spaces ?? []), ...(hyphens ?? [])];
  allSeparatorsInOrder.sort((a, b) => a - b);

  if (allSeparatorsInOrder[0] === undefined) {
    return normalisedSolution.length.toString();
  }

  let result = "";
  let characterIndex = 0;
  allSeparatorsInOrder.forEach((position) => {
    result += (position - characterIndex).toString();

    if (spaces?.includes(position)) {
      result += ",";
    } else if (hyphens?.includes(position)) {
      result += "-";
    }

    characterIndex = position;
  });

  result += (normalisedSolution.length - characterIndex).toString();
  return result;
};

const getSeparators = (
  entry: Readonly<MyCrosswordBasicClue>,
): SeparatorLocationsOptional => {
  if (entry.group && entry.group.length > 1) {
    throw new Error(
      `Error in clue '${getId(entry)}': Separator locations must be specified manually for linked clues.`,
    );
  }

  const solution = entry.solution.replaceAll(/'/g, "");

  const spaceLocations: number[] = [];
  const hyphenLocations: number[] = [];
  let separatorCount = 0;

  for (let i = 0; i < solution.length; i++) {
    const char = solution[i];
    if (char === " ") {
      spaceLocations.push(i - separatorCount);
      separatorCount++;
    } else if (char === "-") {
      hyphenLocations.push(i - separatorCount);
      separatorCount++;
    }
  }

  let result: SeparatorLocationsOptional = {};
  if (spaceLocations.length > 0) {
    result = { ...result, ",": spaceLocations };
  }
  if (hyphenLocations.length > 0) {
    result = { ...result, "-": hyphenLocations };
  }
  return result;
};
