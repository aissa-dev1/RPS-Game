import { Span } from "../types/elements";

function updateYourWinningTimes(
  yourWinningTimesElm: Span,
  yourWinningTimes: number
): number {
  yourWinningTimesElm.textContent = `${yourWinningTimes}`;

  return yourWinningTimes;
}

export default updateYourWinningTimes;
