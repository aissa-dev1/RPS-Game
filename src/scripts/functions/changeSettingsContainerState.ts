import { Div, Image } from "../types/elements";

function changeSettingsContainerState(
  settingsImg: Image,
  settingsContainer: Div,
  state: "show" | "hide"
): void {
  if (state === "show") {
    settingsImg.classList.add("active");

    setTimeout(() => {
      settingsContainer.classList.add("active");
    }, 1000);
  } else {
    settingsContainer.classList.remove("active");

    setTimeout(() => {
      settingsImg.classList.remove("active");
    }, 1000);
  }
}

export default changeSettingsContainerState;
