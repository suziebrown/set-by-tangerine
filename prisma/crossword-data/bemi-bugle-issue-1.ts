import { type MyCrosswordBasicData } from "~/app/puzzle/[id]/crossword/crossword.type";

export const bemiBugleIssue1: MyCrosswordBasicData = {
  dimensions: {
    cols: 5,
    rows: 5,
  },
  entries: [
    {
      number: 1,
      direction: "across",
      position: { x: 0, y: 0 },
      clue: "Temp starts lots of commotion under mistletoe",
      solution: "locum",
    },
    {
      number: 4,
      direction: "across",
      position: { x: 0, y: 2 },
      clue: "Comparatively red stranger",
      solution: "rarer",
    },
    {
      number: 5,
      direction: "across",
      position: { x: 0, y: 4 },
      clue: "Ivy's rival, according to 2",
      solution: "holly",
    },
    {
      number: 1,
      direction: "down",
      position: { x: 0, y: 0 },
      clue: "Note resistance to church displaying tree",
      solution: "larch",
    },
    {
      number: 2,
      direction: "down",
      position: { x: 2, y: 0 },
      clue: "Woman in scarf told to take a layer off",
      solution: "carol",
    },
    {
      number: 3,
      direction: "down",
      position: { x: 4, y: 0 },
      clue: "What Christmas may be for hobbit",
      solution: "merry",
    },
  ],
};
