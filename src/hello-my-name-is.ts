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
      number: 1,
      direction: "across",
      position: { x: 0, y: 0 },
      clue: '"Come in, thank you" by fashionable host',
      solution: "entertain",
    },
    {
      number: 6,
      direction: "across",
      position: { x: 10, y: 0 },
      clue: "Stone a swinger",
      solution: "agate",
    },
    {
      number: 10,
      direction: "across",
      position: { x: 0, y: 2 },
      clue: "Achieve the top awards in notable firsts?",
      solution: "attain",
    },
    {
      number: 2,
      direction: "down",
      position: { x: 1, y: 0 },
      clue: "Ingredient in explosive prevalence of lice?",
      solution: "nitrate",
    },
    {
      number: 3,
      direction: "down",
      position: { x: 3, y: 0 },
      clue: "Some periods are back",
      solution: "era",
    },
  ],
};
