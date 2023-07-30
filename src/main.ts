// Constants
import PlayerChoice from "./scripts/constants/PlayerChoice";

// Types
import {
  ChoiceTuple,
  ComputerLevel,
  Condition,
  Empty,
  GameInfo,
  GameLook,
  GameResult,
  GameTheme,
  PlayerChoiceType,
  Winner,
} from "./scripts/types";
import {
  Button,
  Div,
  Image,
  Input,
  Select,
  Span,
} from "./scripts/types/elements";

// Methods
import updateComputerScore from "./scripts/functions/updateComputerScore";
import updateYourScore from "./scripts/functions/updateYourScore";
import updateComputerWinningTimes from "./scripts/functions/updateComputerWinningTimes";
import updateYourWinningTimes from "./scripts/functions/updateYourWinningTimes";
import disactiveChoiceButtons from "./scripts/functions/disactiveChoiceButtons";
import activeChoiceButtons from "./scripts/functions/activeChoiceButtons";
import changeSettingsContainerState from "./scripts/functions/changeSettingsContainerState";
import storageSet from "./scripts/helpers/storageSet";
import storageGet from "./scripts/helpers/storageGet";

// Elements
const computerChoiceImgContainer = document.querySelector<Div>(
  "#computer_choice_img_container"
)!;
const yourChoiceImgContainer = document.querySelector<Image>(
  "#your_choice_img_container"
)!;
const computerChoiceImg = document.querySelector<Image>(
  "#computer_choice_img"
)!;
const yourChoiceImg = document.querySelector<Image>("#your_choice_img")!;
const computerChoiceText = document.querySelector("#computer_choice_text")!;
const yourChoiceText = document.querySelector("#your_choice_text")!;
const gameResultElm = document.querySelector<Span>("#game_result")!;
const computerScoreElm = document.querySelector<Span>("#computer_score")!;
const yourScoreElm = document.querySelector<Span>("#your_score")!;
const computerWinningTimesElm = document.querySelector<Span>(
  "#computer_winning_times"
)!;
const yourWinningTimesElm = document.querySelector<Span>(
  "#your_winning_times"
)!;
const choiceButtons = document.querySelectorAll<Button>(".choice-btn");
const settingsImg = document.querySelector<Image>("#settings_img")!;
const settingsCloseButton = document.querySelector<Button>("#close_btn")!;
const settingsContainer = document.querySelector<Div>(".settings-container")!;
const gameThemeSelect = document.querySelector<Select>("#game_theme_select")!;
const maxScoreInput = document.querySelector<Input>("#max_score_input")!;
const computerLevelSelect = document.querySelector<Select>(
  "#computer_level_select"
)!;
const gameLookSelect = document.querySelector<Select>("#game_look_select")!;
const decreaseScoreSelect = document.querySelector<Select>(
  "#decrease_score_select"
)!;
const resetGameButton = document.querySelector<Button>("#reset_game_btn")!;
const developerElm = document.querySelector<Span>("#developer")!;
const currentYearElm = document.querySelector<Span>("#current_year")!;
const contactMeElm = document.querySelector<Span>("#contact_me_email")!;

// Variables
const choices: ChoiceTuple = ["rock", "paper", "scissors"];
const game_info: Readonly<GameInfo> = {
  developer: "Aissa Bedr",
  email: "aissabedr74@gmail.com",
  currentYear: new Date().getFullYear(),
};

let computer_choice: PlayerChoiceType | Empty = "";
let your_choice: PlayerChoiceType | Empty = "";
let game_result: GameResult | Empty = "";
let winner: Winner | Empty = "";
let computer_score = 0;
let your_score = 0;
let game_theme: GameTheme = storageGet("game_theme", false) || "light";
let max_score: number = storageGet("max_score", true) || 3;
let computer_winning_times: number =
  storageGet("computer_winning_times", true) || 0;
let your_winning_times: number = storageGet("your_winning_times", true) || 0;
let is_game_over = false;
let computer_level: ComputerLevel =
  storageGet("computer_level", false) || "easy";
let game_look: GameLook = storageGet("game_look", false) || "images";
let decrease_score_when_enemy_get_it: Condition =
  storageGet("decrease_score_when_enemy_get_it", false) || "yes";
let is_game_reset = true;

// Event Listeners
window.addEventListener("load", () => {
  setupGame();
  handleStorageChanges();
  showGameInfo();
});

settingsImg.addEventListener("click", () => {
  changeSettingsContainerState(settingsImg, settingsContainer, "show");
});

settingsCloseButton.addEventListener("click", () => {
  changeSettingsContainerState(settingsImg, settingsContainer, "hide");
});

gameThemeSelect.addEventListener("change", () => {
  editGameTheme();
});

maxScoreInput.addEventListener("input", () => {
  editMaxScore();
});

computerLevelSelect.addEventListener("change", () => {
  editComputerLevel();
});

gameLookSelect.addEventListener("change", () => {
  editGameLook();
});

decreaseScoreSelect.addEventListener("change", () => {
  editDecreaseScore();
});

resetGameButton.addEventListener("click", () => {
  resetGame();
});

// Logic
function setupGame(): void {
  setYourChoice();
  updateComputerScore(computerScoreElm, computer_score);
  updateYourScore(yourScoreElm, your_score);
  updateComputerWinningTimes(computerWinningTimesElm, computer_winning_times);
  updateYourWinningTimes(yourWinningTimesElm, your_winning_times);
  detectGameReset();
}

function setYourChoice(): void {
  choiceButtons.forEach((choiceBtn) => {
    choiceBtn.addEventListener("click", () => {
      your_choice = choiceBtn.dataset.choice as PlayerChoiceType;

      yourChoiceImg.src = `/${your_choice}.svg`;
      yourChoiceImg.alt = `${your_choice}`;

      yourChoiceText.textContent = `${your_choice}`;

      if (is_game_reset) {
        is_game_reset = false;

        detectGameReset();
      }

      setComputerChoice();
      detectGameLook();
      checkGameResult();
    });
  });
}

function setComputerChoice(): void {
  const random_choice = choices[Math.floor(Math.random() * choices.length)];

  checkComputerLevel(random_choice);

  computerChoiceImg.src = `/${computer_choice}.svg`;
  computerChoiceImg.alt = `${computer_choice}`;

  computerChoiceText.textContent = `${computer_choice}`;
}

function checkComputerLevel(randomChoice: PlayerChoiceType): void {
  if (computer_level === "easy") {
    computer_choice = randomChoice;
  } else {
    let booleansList: boolean[] = [];

    if (computer_level === "medium")
      booleansList = [true, true, false, false, false];
    else booleansList = [true, true, true, false, false];

    const is_computer_see_you =
      booleansList[Math.floor(Math.random() * booleansList.length)];

    if (is_computer_see_you) {
      switch (your_choice) {
        case "rock":
          computer_choice = "paper";
          break;

        case "paper":
          computer_choice = "scissors";
          break;

        case "scissors":
          computer_choice = "rock";
          break;
      }
    } else {
      computer_choice = randomChoice;
    }
  }
}

function checkGameResult(): void {
  computerResult();
  yourResult();
  drawResult();

  switch (winner) {
    case "you":
      increaseYourScore();
      break;

    case "computer":
      increaseComputerScore();
      break;

    default:
      checkIsGameOver();
  }

  if (!is_game_over) gameResultElm.textContent = `${game_result}`;
}

function computerResult(): void {
  const { ROCK, PAPER, SCISSORS } = PlayerChoice;

  if (computer_choice === ROCK && your_choice === SCISSORS) {
    game_result = "Computer won!";
    winner = "computer";
  }

  if (computer_choice === PAPER && your_choice === ROCK) {
    game_result = "Computer won!";
    winner = "computer";
  }

  if (computer_choice === SCISSORS && your_choice === PAPER) {
    game_result = "Computer won!";
    winner = "computer";
  }
}

function yourResult(): void {
  const { ROCK, PAPER, SCISSORS } = PlayerChoice;

  if (your_choice === ROCK && computer_choice === SCISSORS) {
    game_result = "You won!";
    winner = "you";
  }

  if (your_choice === PAPER && computer_choice === ROCK) {
    game_result = "You won!";
    winner = "you";
  }

  if (your_choice === SCISSORS && computer_choice === PAPER) {
    game_result = "You won!";
    winner = "you";
  }
}

function drawResult(): void {
  const { ROCK, PAPER, SCISSORS } = PlayerChoice;

  if (your_choice === ROCK && computer_choice === ROCK) {
    game_result = "Draw!";
    winner = "";
  }

  if (your_choice === PAPER && computer_choice === PAPER) {
    game_result = "Draw!";
    winner = "";
  }

  if (your_choice === SCISSORS && computer_choice === SCISSORS) {
    game_result = "Draw!";
    winner = "";
  }
}

function increaseYourScore(): void {
  your_score += 1;

  if (computer_score > 0 && decrease_score_when_enemy_get_it === "yes")
    computer_score -= 1;

  updateYourScore(yourScoreElm, your_score);
  updateComputerScore(computerScoreElm, computer_score);
  checkIsGameOver();
}

function increaseComputerScore(): void {
  computer_score += 1;

  if (your_score > 0 && decrease_score_when_enemy_get_it === "yes")
    your_score -= 1;

  updateYourScore(yourScoreElm, your_score);
  updateComputerScore(computerScoreElm, computer_score);
  checkIsGameOver();
}

function checkGameWinner(): void {
  if (your_score === max_score) {
    your_winning_times += 1;

    storageSet("your_winning_times", your_winning_times);

    updateYourWinningTimes(yourWinningTimesElm, your_winning_times);
  }

  if (computer_score === max_score) {
    computer_winning_times += 1;

    storageSet("computer_winning_times", computer_winning_times);

    updateComputerWinningTimes(computerWinningTimesElm, computer_winning_times);
  }
}

function gameOver(): void {
  is_game_over = true;

  computer_score = 0;
  updateComputerScore(computerScoreElm, computer_score);

  your_score = 0;
  updateYourScore(yourScoreElm, your_score);

  computerChoiceImg.src = "/question-mark.svg";
  computerChoiceImg.alt = "question-mark";

  yourChoiceImg.src = "/question-mark.svg";
  yourChoiceImg.alt = "question-mark";

  computerChoiceText.textContent = "Play to show!";
  yourChoiceText.textContent = "Play to show!";

  gameResultElm.textContent = `Game over and the winner is ${
    winner === "computer" ? "the" : ""
  } ${winner}`;
}

function checkIsGameOver(): void {
  if (your_score === max_score || computer_score === max_score) {
    disactiveChoiceButtons(choiceButtons);

    setTimeout(() => {
      checkGameWinner();
      gameOver();
      activeChoiceButtons(choiceButtons);
    }, 1500);
  } else is_game_over = false;
}

function handleStorageChanges(): void {
  handleGameThemeChange();
  handleMaxScoreInputChange();
  handleComputerLevelChange();
  handleGameLookChange();
  handleDecreaseScoreChange();
}

function editMaxScore(): void {
  const value = parseInt(maxScoreInput.value);

  value > 0 && value <= 10 ? (max_score = value) : (max_score = 0);

  storageSet("max_score", max_score);

  handleMaxScoreInputChange();
}

function handleMaxScoreInputChange(): void {
  maxScoreInput.value = `${max_score}`;
}

function editComputerLevel(): void {
  computer_level = computerLevelSelect.value as ComputerLevel;

  storageSet("computer_level", computer_level);
}

function handleComputerLevelChange(): void {
  computerLevelSelect.value = computer_level;
}

function editGameLook(): void {
  game_look = gameLookSelect.value as GameLook;

  detectGameLook();

  storageSet("game_look", game_look);
}

function handleGameLookChange(): void {
  gameLookSelect.value = game_look;

  detectGameLook();
}

function detectGameLook(): void {
  if (game_look === "images") {
    yourChoiceImgContainer.classList.remove("hide");
    yourChoiceText.classList.add("hide");

    computerChoiceImgContainer.classList.remove("hide");
    computerChoiceText.classList.add("hide");
  } else {
    yourChoiceText.classList.remove("hide");
    yourChoiceImgContainer.classList.add("hide");

    computerChoiceText.classList.remove("hide");
    computerChoiceImgContainer.classList.add("hide");
  }
}

function editGameTheme(): void {
  game_theme = gameThemeSelect.value as GameTheme;

  detectGameTheme();

  storageSet("game_theme", game_theme);
}

function handleGameThemeChange(): void {
  gameThemeSelect.value = `${game_theme}`;

  detectGameTheme();
}

function detectGameTheme(): void {
  if (game_theme === "light") {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  }
}

function editDecreaseScore(): void {
  decrease_score_when_enemy_get_it = decreaseScoreSelect.value as Condition;

  storageSet(
    "decrease_score_when_enemy_get_it",
    decrease_score_when_enemy_get_it
  );
}

function handleDecreaseScoreChange(): void {
  decreaseScoreSelect.value = decrease_score_when_enemy_get_it;
}

function resetGame(): void {
  if (!is_game_reset) {
    computer_score = 0;
    updateComputerScore(computerScoreElm, computer_score);

    computer_winning_times = 0;
    updateComputerWinningTimes(computerWinningTimesElm, computer_winning_times);
    storageSet("computer_winning_times", 0);

    computerChoiceImg.src = "/question-mark.svg";
    computerChoiceImg.alt = "question-mark";

    your_score = 0;
    updateYourScore(yourScoreElm, your_score);

    your_winning_times = 0;
    updateYourWinningTimes(yourWinningTimesElm, your_winning_times);
    storageSet("your_winning_times", 0);

    yourChoiceImg.src = "/question-mark.svg";
    yourChoiceImg.alt = "question-mark";

    computerChoiceText.textContent = "Play to show!";
    yourChoiceText.textContent = "Play to show!";
    gameResultElm.textContent = "Play to show!";

    is_game_reset = true;

    detectGameReset();
  }
}

function detectGameReset(): void {
  if (is_game_reset) resetGameButton.classList.add("disactive");
  else resetGameButton.classList.remove("disactive");
}

function showGameInfo(): void {
  const { developer, email, currentYear } = game_info;

  developerElm.textContent = developer;

  contactMeElm.textContent = email;

  currentYearElm.textContent = `${currentYear}`;
}
