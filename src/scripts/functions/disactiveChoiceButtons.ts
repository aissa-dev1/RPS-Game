import { Button } from "../types/elements";

function disactiveChoiceButtons(choiceButtons: NodeListOf<Button>): void {
  choiceButtons.forEach((choiceBtn) => {
    choiceBtn.setAttribute("disabled", "true");

    choiceBtn.classList.add("disactive");
  });
}

export default disactiveChoiceButtons;
