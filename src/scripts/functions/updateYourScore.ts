import { Span } from "../types/elements";

function updateYourScore(yourScoreElm: Span, yourScore: number): number {
  yourScoreElm.textContent = `${yourScore}`;

  return yourScore;
}

export default updateYourScore;
