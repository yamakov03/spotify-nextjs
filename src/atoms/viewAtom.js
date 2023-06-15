import { atom } from "recoil";

export const currentViewState = atom({
  key: "currentViewState",
  default: "home",
});