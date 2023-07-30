import { Button } from "../types/elements";

function activeChoiceButtons(choiceButtons: NodeListOf<Button>): void {
  choiceButtons.forEach((choiceBtn) => {
    choiceBtn.classList.remove("disactive");

    choiceBtn.removeAttribute("disabled");
  });
}

export default activeChoiceButtons;
