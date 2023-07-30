import { Span } from "../types/elements";

function updateComputerWinningTimes(
  computerWinningTimesElm: Span,
  computerWinningTimes: number
): number {
  computerWinningTimesElm.textContent = `${computerWinningTimes}`;

  return computerWinningTimes;
}

export default updateComputerWinningTimes;
