import test, { expect } from "@playwright/test";
import {
  MyCrosswordBasicClue,
  MyCrosswordBasicData,
} from "~/app/puzzle/[id]/crossword/crossword.type";
import { mapMyCrosswordData } from "~/helpers/crossword-helpers";

test.describe("mapMyCrosswordData", () => {
  test("maps simple entry", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      solution: "test",
    };

    const result = mapMyCrosswordData(setUpBasicCrosswordData([entry]));
    const mappedEntry = result.entries[0];

    expect(mappedEntry?.id).toBe("1a");
    expect(mappedEntry?.separatorLocations).toEqual({});
    expect(mappedEntry?.clue).toBe("Test clue (4)");
    expect(mappedEntry?.solution).toBe("TEST");
    expect(mappedEntry?.length).toBe(4);
    expect(mappedEntry?.group).toEqual(["1a"]);
    expect(mappedEntry?.humanNumber).toBe("1");
  });

  test("maps entry with spaces", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      solution: "test answer",
    };

    const result = mapMyCrosswordData(setUpBasicCrosswordData([entry]));
    const mappedEntry = result.entries[0];

    expect(mappedEntry?.separatorLocations).toEqual({ ",": [4] });
    expect(mappedEntry?.clue).toBe("Test clue (4,6)");
    expect(mappedEntry?.solution).toBe("TESTANSWER");
    expect(mappedEntry?.length).toBe(10);
  });

  test("maps entry with hyphens", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      solution: "test-ready",
    };

    const result = mapMyCrosswordData(setUpBasicCrosswordData([entry]));
    const mappedEntry = result.entries[0];

    expect(mappedEntry?.separatorLocations).toEqual({ "-": [4] });
    expect(mappedEntry?.clue).toBe("Test clue (4-5)");
    expect(mappedEntry?.solution).toBe("TESTREADY");
    expect(mappedEntry?.length).toBe(9);
  });

  test("maps entry with multiple separators", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      solution: "test-ready clue",
    };

    const result = mapMyCrosswordData(setUpBasicCrosswordData([entry]));
    const mappedEntry = result.entries[0];

    expect(mappedEntry?.separatorLocations).toEqual({ ",": [9], "-": [4] });
    expect(mappedEntry?.clue).toBe("Test clue (4-5,4)");
    expect(mappedEntry?.solution).toBe("TESTREADYCLUE");
    expect(mappedEntry?.length).toBe(13);
  });

  test("maps single-word entry split over linked across entries", () => {
    const entryStart: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a"],
      separatorLocations: {},
      solution: "cup",
    };
    const entryEnd: MyCrosswordBasicClue = {
      ...testClue,
      number: 2,
      position: { x: 0, y: 2 },
      group: ["1a", "2a"],
      separatorLocations: {},
      clue: "",
      solution: "board",
    };

    const result = mapMyCrosswordData(
      setUpBasicCrosswordData([entryStart, entryEnd]),
    );

    const mappedEntryStart = result.entries[0];
    expect(mappedEntryStart?.id).toBe("1a");
    expect(mappedEntryStart?.separatorLocations).toEqual({});
    expect(mappedEntryStart?.clue).toBe("Test clue (8)");
    expect(mappedEntryStart?.solution).toBe("CUP");
    expect(mappedEntryStart?.length).toBe(3);
    expect(mappedEntryStart?.group).toEqual(["1a", "2a"]);
    expect(mappedEntryStart?.humanNumber).toBe("1");

    const mappedEntryEnd = result.entries[1];
    expect(mappedEntryEnd?.id).toBe("2a");
    expect(mappedEntryEnd?.separatorLocations).toEqual({});
    expect(mappedEntryEnd?.clue).toBe("See 1");
    expect(mappedEntryEnd?.solution).toBe("BOARD");
    expect(mappedEntryEnd?.length).toBe(5);
    expect(mappedEntryEnd?.group).toEqual(["1a", "2a"]);
    expect(mappedEntryEnd?.humanNumber).toBe("2");
  });

  test("maps single-word entry split over linked across and down entries", () => {
    const entryStart: MyCrosswordBasicClue = {
      ...testClue,
      direction: "down",
      group: ["1d", "2a"],
      separatorLocations: {},
      solution: "cup",
    };
    const entryEnd: MyCrosswordBasicClue = {
      ...testClue,
      number: 2,
      position: { x: 2, y: 0 },
      group: ["1d", "2a"],
      separatorLocations: {},
      clue: "",
      solution: "board",
    };

    const result = mapMyCrosswordData(
      setUpBasicCrosswordData([entryStart, entryEnd]),
    );

    const mappedEntryStart = result.entries[0];
    expect(mappedEntryStart?.id).toBe("1d");
    expect(mappedEntryStart?.clue).toBe("Test clue (8)");
    expect(mappedEntryStart?.solution).toBe("CUP");
    expect(mappedEntryStart?.length).toBe(3);
    expect(mappedEntryStart?.humanNumber).toBe("1");

    const mappedEntryEnd = result.entries[1];
    expect(mappedEntryEnd?.id).toBe("2a");
    expect(mappedEntryEnd?.clue).toBe("See 1 down");
    expect(mappedEntryEnd?.solution).toBe("BOARD");
    expect(mappedEntryEnd?.length).toBe(5);
    expect(mappedEntryEnd?.humanNumber).toBe("2");
  });
});

// TODO other cases to test:
// solution containing apostrophes
// linked clues with space/hyphen between parts
// linked clues with spaces/hyphens within parts
// more than 2 linked entries with various separators

const testClue: MyCrosswordBasicClue = {
  number: 1,
  direction: "across",
  position: { x: 0, y: 0 },
  clue: "Test clue",
  solution: "test",
};

const setUpBasicCrosswordData = (
  entries: Array<MyCrosswordBasicClue>,
): MyCrosswordBasicData => {
  return {
    dimensions: { cols: 15, rows: 15 },
    entries: entries,
  };
};
