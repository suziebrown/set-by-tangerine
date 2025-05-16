import test, { expect } from "@playwright/test";
import {
  MyCrosswordBasicClue,
  MyCrosswordBasicData,
} from "~/app/puzzle/[id]/crossword/crossword.type";
import {
  getId,
  mapMyCrosswordData,
  getNormalisedSolution,
  getNormalisedClue,
  isPartOfLinkedEntries,
  isFirstPartOfLinkedEntries,
  getHumanNumber,
} from "~/helpers/crossword-helpers";

test.describe("getId", () => {
  test("returns correct ID for across entry", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      number: 4,
      direction: "across",
    };

    expect(getId(entry)).toBe("4a");
  });

  test("returns correct ID for down entry", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      number: 14,
      direction: "down",
    };

    expect(getId(entry)).toBe("14d");
  });
});

test.describe("getNormalisedSolution", () => {
  test("removes punctuation and converts to upper case", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      solution: "I'm not test-ready",
    };

    expect(getNormalisedSolution(entry)).toBe("IMNOTTESTREADY");
  });
});

test.describe("isPartOfLinkedEntries", () => {
  test("returns false if group is not specified", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: undefined,
    };

    expect(isPartOfLinkedEntries(entry)).toBe(false);
  });

  test("returns false if group is empty", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: [],
    };

    expect(isPartOfLinkedEntries(entry)).toBe(false);
  });

  test("returns false if group has one element", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a"],
    };

    expect(isPartOfLinkedEntries(entry)).toBe(false);
  });

  test("returns true if group has multiple elements", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a"],
    };

    expect(isPartOfLinkedEntries(entry)).toBe(true);
  });
});

test.describe("isFirstPartOfLinkedEntries", () => {
  test("returns false if group is not specified", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: undefined,
    };

    expect(isFirstPartOfLinkedEntries(entry, "1a")).toBe(false);
  });

  test("returns false if group is empty", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: [],
    };

    expect(isFirstPartOfLinkedEntries(entry, "1a")).toBe(false);
  });

  test("returns false if group has one element", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a"],
    };

    expect(isFirstPartOfLinkedEntries(entry, "1a")).toBe(false);
  });

  test("returns true if entry is first in group", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a"],
    };

    expect(isFirstPartOfLinkedEntries(entry, "1a")).toBe(true);
  });

  test("returns true if entry is not first in group", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      group: ["2a", "1a"],
    };

    expect(isFirstPartOfLinkedEntries(entry, "1a")).toBe(false);
  });
});

test.describe("getHumanNumber", () => {
  test("returns number for standalone clue", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      number: 18,
      direction: "across",
    };

    expect(getHumanNumber(entry, "18a", [entry])).toBe("18");
  });

  test("returns own number for non-leading part of linked entries", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      number: 18,
      direction: "across",
      group: ["1a", "1d", "18a"],
    };

    expect(getHumanNumber(entry, "18a", [entry])).toBe("18");
  });

  test("returns list of numbers for leading part of linked across entries", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      number: 18,
      direction: "across",
      group: ["18a", "1a"],
    };

    const linkedEntry: MyCrosswordBasicClue = {
      ...testClue,
      number: 1,
      direction: "across",
      group: ["18a", "1a"],
    };

    expect(getHumanNumber(entry, "18a", [linkedEntry, entry])).toBe("18, 1");
  });

  test("includes direction for linked entry in other direction", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      number: 18,
      direction: "across",
      group: ["18a", "1d", "1a"],
    };

    const linkedAcrossEntry: MyCrosswordBasicClue = {
      ...testClue,
      number: 1,
      direction: "across",
    };

    const linkedDownEntry: MyCrosswordBasicClue = {
      ...testClue,
      number: 1,
      direction: "down",
    };

    expect(
      getHumanNumber(entry, "18a", [linkedAcrossEntry, linkedDownEntry, entry]),
    ).toBe("18, 1 down, 1");
  });
});

test.describe("getNormalisedClue", () => {
  test("returns clue and length for single entry", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      clue: "Test clue",
      solution: "test",
    };

    const result = getNormalisedClue(entry, "1a", [entry]);
    expect(result).toBe("Test clue (4)");
  });

  test("returns clue and length for single entry with separators", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      clue: "Test clue",
      solution: "I'm not test-ready",
    };

    const result = getNormalisedClue(entry, "1a", [entry]);
    expect(result).toBe("Test clue (2,3,4-5)");
  });

  // TODO Add tests for linked entries
});

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

  test("ignores apostrophes", () => {
    const entry: MyCrosswordBasicClue = {
      ...testClue,
      solution: "test's",
    };

    const result = mapMyCrosswordData(setUpBasicCrosswordData([entry]));
    const mappedEntry = result.entries[0];

    expect(mappedEntry?.separatorLocations).toEqual({});
    expect(mappedEntry?.clue).toBe("Test clue (5)");
    expect(mappedEntry?.solution).toBe("TESTS");
    expect(mappedEntry?.length).toBe(5);
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
    expect(mappedEntryStart?.humanNumber).toBe("1, 2");

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
    expect(mappedEntryStart?.humanNumber).toBe("1, 2 across");

    const mappedEntryEnd = result.entries[1];
    expect(mappedEntryEnd?.id).toBe("2a");
    expect(mappedEntryEnd?.clue).toBe("See 1 down");
    expect(mappedEntryEnd?.solution).toBe("BOARD");
    expect(mappedEntryEnd?.length).toBe(5);
    expect(mappedEntryEnd?.humanNumber).toBe("2");
  });

  test("maps linked entries with space between parts", () => {
    const entryStart: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a"],
      separatorLocations: { ",": [4] },
      solution: "test",
    };
    const entryEnd: MyCrosswordBasicClue = {
      ...testClue,
      number: 2,
      position: { x: 0, y: 2 },
      group: ["1a", "2a"],
      separatorLocations: {},
      solution: "answer",
    };

    const result = mapMyCrosswordData(
      setUpBasicCrosswordData([entryStart, entryEnd]),
    );

    const mappedEntryStart = result.entries[0];
    expect(mappedEntryStart?.id).toBe("1a");
    expect(mappedEntryStart?.separatorLocations).toEqual({ ",": [4] });
    expect(mappedEntryStart?.clue).toBe("Test clue (4,6)");
    expect(mappedEntryStart?.solution).toBe("TEST");
    expect(mappedEntryStart?.length).toBe(4);

    const mappedEntryEnd = result.entries[1];
    expect(mappedEntryEnd?.id).toBe("2a");
    expect(mappedEntryEnd?.separatorLocations).toEqual({});
    expect(mappedEntryEnd?.clue).toBe("See 1");
    expect(mappedEntryEnd?.solution).toBe("ANSWER");
    expect(mappedEntryEnd?.length).toBe(6);
  });

  test("maps linked entries with hyphen between parts", () => {
    const entryStart: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a"],
      separatorLocations: { "-": [4] },
      solution: "test",
    };
    const entryEnd: MyCrosswordBasicClue = {
      ...testClue,
      number: 2,
      position: { x: 0, y: 2 },
      group: ["1a", "2a"],
      separatorLocations: {},
      solution: "ready",
    };

    const result = mapMyCrosswordData(
      setUpBasicCrosswordData([entryStart, entryEnd]),
    );

    const mappedEntryStart = result.entries[0];
    expect(mappedEntryStart?.id).toBe("1a");
    expect(mappedEntryStart?.separatorLocations).toEqual({ "-": [4] });
    expect(mappedEntryStart?.clue).toBe("Test clue (4-5)");
    expect(mappedEntryStart?.solution).toBe("TEST");
    expect(mappedEntryStart?.length).toBe(4);

    const mappedEntryEnd = result.entries[1];
    expect(mappedEntryEnd?.id).toBe("2a");
    expect(mappedEntryEnd?.separatorLocations).toEqual({});
    expect(mappedEntryEnd?.clue).toBe("See 1");
    expect(mappedEntryEnd?.solution).toBe("READY");
    expect(mappedEntryEnd?.length).toBe(5);
  });

  test("maps linked entries with separators within parts", () => {
    const entryStart: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a"],
      separatorLocations: { ",": [2, 5] },
      solution: "I'm not",
    };
    const entryEnd: MyCrosswordBasicClue = {
      ...testClue,
      number: 2,
      position: { x: 0, y: 2 },
      group: ["1a", "2a"],
      separatorLocations: { "-": [9] },
      solution: "test-ready",
    };

    const result = mapMyCrosswordData(
      setUpBasicCrosswordData([entryStart, entryEnd]),
    );

    const mappedEntryStart = result.entries[0];
    expect(mappedEntryStart?.id).toBe("1a");
    expect(mappedEntryStart?.separatorLocations).toEqual({ ",": [2, 5] });
    expect(mappedEntryStart?.clue).toBe("Test clue (2,3,4-5)");
    expect(mappedEntryStart?.solution).toBe("IMNOT");
    expect(mappedEntryStart?.length).toBe(5);

    const mappedEntryEnd = result.entries[1];
    expect(mappedEntryEnd?.id).toBe("2a");
    expect(mappedEntryEnd?.separatorLocations).toEqual({ "-": [9] });
    expect(mappedEntryEnd?.clue).toBe("See 1");
    expect(mappedEntryEnd?.solution).toBe("TESTREADY");
    expect(mappedEntryEnd?.length).toBe(9);
  });

  // TODO: It would make ore sense to specify all separators on the first entry
  test("maps multiple linked entries", () => {
    const entry1: MyCrosswordBasicClue = {
      ...testClue,
      group: ["1a", "2a", "3a", "4a"],
      separatorLocations: { ",": [2] },
      solution: "I'm",
    };
    const entry2: MyCrosswordBasicClue = {
      ...testClue,
      number: 2,
      position: { x: 0, y: 2 },
      group: ["1a", "2a", "3a", "4a"],
      separatorLocations: { ",": [5] },
      solution: "not",
    };
    const entry3: MyCrosswordBasicClue = {
      ...testClue,
      number: 3,
      position: { x: 0, y: 4 },
      group: ["1a", "2a", "3a", "4a"],
      separatorLocations: { "-": [9] },
      solution: "test",
    };
    const entry4: MyCrosswordBasicClue = {
      ...testClue,
      number: 4,
      position: { x: 0, y: 6 },
      group: ["1a", "2a", "3a", "4a"],
      separatorLocations: {},
      solution: "ready",
    };

    const result = mapMyCrosswordData(
      setUpBasicCrosswordData([entry1, entry2, entry3, entry4]),
    );

    const mappedEntry1 = result.entries[0];
    expect(mappedEntry1?.clue).toBe("Test clue (2,3,4-5)");
    expect(mappedEntry1?.solution).toBe("IM");
    expect(mappedEntry1?.length).toBe(2);

    const mappedEntry2 = result.entries[1];
    expect(mappedEntry2?.clue).toBe("See 1");
    expect(mappedEntry2?.solution).toBe("NOT");
    expect(mappedEntry2?.length).toBe(3);

    const mappedEntry3 = result.entries[2];
    expect(mappedEntry3?.clue).toBe("See 1");
    expect(mappedEntry3?.solution).toBe("TEST");
    expect(mappedEntry3?.length).toBe(4);

    const mappedEntry4 = result.entries[3];
    expect(mappedEntry4?.clue).toBe("See 1");
    expect(mappedEntry4?.solution).toBe("READY");
    expect(mappedEntry4?.length).toBe(5);
  });
});

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
