import {
  type MyCrosswordBasicData,
  MyCrosswordData,
} from "./app/puzzle/[id]/crossword/crossword.type";

export const helloMyNameIs: MyCrosswordBasicData = {
  dimensions: {
    cols: 15,
    rows: 15,
  },
  entries: [
    {
      id: "1a",
      number: 1,
      humanNumber: "1",
      clue: '"Come in, thank you" by fashionable host',
      direction: "across",
      group: ["1a"],
      position: { x: 0, y: 0 },
      solution: "entertain",
    },
    {
      id: "6a",
      number: 6,
      humanNumber: "6",
      clue: "Stone a swinger",
      direction: "across",
      group: ["6a"],
      position: { x: 10, y: 0 },
      solution: "agate",
    },
    {
      id: "2d",
      number: 2,
      humanNumber: "2",
      clue: "Ingredient in explosive prevalence of lice?",
      direction: "down",
      group: ["2d"],
      position: { x: 1, y: 0 },
      solution: "nitrate",
    },
    {
      id: "3d",
      number: 3,
      humanNumber: "3",
      clue: "Some periods are back",
      direction: "down",
      group: ["3d"],
      position: { x: 3, y: 0 },
      solution: "era",
    },
  ],
};
