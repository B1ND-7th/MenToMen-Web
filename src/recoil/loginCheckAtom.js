import { atom } from "recoil";

export const checkState = atom({
  key: "check",
  default: {
    isLoggedIn: false,
  },
});
