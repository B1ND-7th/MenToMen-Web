import { atom } from "recoil";

export const buttonState = atom({
  key: "buttonStates",
  default: {
    isMenuClick: false,
  },
});
