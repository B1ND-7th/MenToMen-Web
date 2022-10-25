import { atom } from "recoil";

export const deleteState = atom({
  key: "feedImg",
  default: {
    isMenu: false,
  },
});

export const buttonState = atom({
  key: "buttonStates",
  default: {
    isMenuClick: false,
    isPostClick: false,
    isUserClick: false,
    isServiceCenterClick: false,
  },
});
