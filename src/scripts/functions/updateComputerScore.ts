import { Span } from "../types/elements";

function updateComputerScore(
  computerScoreElm: Span,
  computerScore: number
): number {
  computerScoreElm.textContent = `${computerScore}`;

  return computerScore;
}

export default updateComputerScore;
