import { type JsonValue } from "@prisma/client/runtime/library";
import {
  type Direction,
  type SeparatorLocationsOptional,
} from "node_modules/mycrossword/dist/types";
import {
  type MyCrosswordClue,
  type MyCrosswordBasicClue,
  type MyCrosswordBasicData,
  type MyCrosswordData,
} from "../app/puzzle/[id]/crossword/crossword.type";

// TODO Add tests for the top-level function too
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
    humanNumber: getHumanNumber(entry, id, allEntries),
  };
};

// TODO Add tests for the lower-level helper functions too
export const getId = (entry: MyCrosswordBasicClue): string =>
  entry.number.toString() + (entry.direction === "across" ? "a" : "d");

export const getNormalisedSolution = (entry: MyCrosswordBasicClue): string =>
  entry.solution.toUpperCase().replaceAll(/\s|-|'/g, "");

export const getHumanNumber = (
  entry: Readonly<MyCrosswordBasicClue>,
  id: string,
  allEntries: ReadonlyArray<MyCrosswordBasicClue>,
): string => {
  if (!isPartOfLinkedEntries(entry)) {
    return entry.number.toString();
  }

  if (!isFirstPartOfLinkedEntries(entry, id)) {
    return entry.number.toString();
  }

  const allLinkedNumbers: Array<string> = [];

  entry.group!.forEach((linkedEntryId) => {
    const linkedEntry = getLinkedEntryById(linkedEntryId, allEntries);

    const linkedEntryHumanNumber =
      linkedEntry.direction === entry.direction
        ? linkedEntry.number.toString()
        : linkedEntry.number + " " + linkedEntry.direction;

    allLinkedNumbers.push(linkedEntryHumanNumber);
  });

  return allLinkedNumbers.join(", ");
};

export const isPartOfLinkedEntries = (entry: MyCrosswordBasicClue): boolean =>
  entry.group != undefined && entry.group.length > 1;

export const isFirstPartOfLinkedEntries = (
  entry: Readonly<MyCrosswordBasicClue>,
  id: string,
): boolean => isPartOfLinkedEntries(entry) && entry.group![0] === id;

const getLinkedEntryById = (
  id: string,
  allEntries: ReadonlyArray<MyCrosswordBasicClue>,
): MyCrosswordBasicClue => {
  let direction: Direction;

  switch (id.slice(-1)) {
    case "a": {
      direction = "across";
      break;
    }
    case "d": {
      direction = "down";
      break;
    }
    default:
      throw new Error(
        `Error finding linked clue '${id}': couldn't establish direction`,
      );
  }

  const number = parseInt(id.slice(0, -1));

  const matchedEntry = allEntries.find(
    (entry) => entry.number === number && entry.direction === direction,
  );

  if (matchedEntry == undefined) {
    throw new Error(
      `Error finding linked clue '${id}': no clue exists with number '${number}' and direction '${direction}'`,
    );
  }

  return matchedEntry;
};

export const getNormalisedClue = (
  entry: Readonly<MyCrosswordBasicClue>,
  id: string,
  allEntries: ReadonlyArray<MyCrosswordBasicClue>,
): string => {
  if (isPartOfLinkedEntries(entry) && !isFirstPartOfLinkedEntries(entry, id)) {
    const firstLinkedClueId = entry.group![0]!;
    const firstLinkedClue = getLinkedEntryById(firstLinkedClueId, allEntries);

    if (firstLinkedClue.direction === entry.direction) {
      return "See " + firstLinkedClue.number;
    }

    return "See " + firstLinkedClue.number + " " + firstLinkedClue.direction;
  }

  return entry.clue + " (" + getHumanWordLengths(entry, id, allEntries) + ")";
};

const getLinkedNormalisedSolution = (
  entry: Readonly<MyCrosswordBasicClue>,
  allEntries: ReadonlyArray<MyCrosswordBasicClue>,
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
  entry: Readonly<MyCrosswordBasicClue>,
  id: string,
  allEntries: ReadonlyArray<MyCrosswordBasicClue>,
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
