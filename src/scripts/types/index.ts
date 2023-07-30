import PlayerChoice from "../constants/PlayerChoice";

export type PlayerChoiceType = (typeof PlayerChoice)[keyof typeof PlayerChoice];

export type GameResult = `${"You" | "Computer"} won!` | "Draw!";

export type Winner = "you" | "computer";

export type Empty = "";

export type GameTheme = "light" | "dark";

export type ComputerLevel = "easy" | "medium" | "hard";

export type GameLook = "images" | "texts";

export type Condition = "yes" | "no";

export type ChoiceTuple = [
  PlayerChoiceType,
  PlayerChoiceType,
  PlayerChoiceType
];

export type GameInfo = {
  developer: string;
  email: string;
  currentYear: number;
};
