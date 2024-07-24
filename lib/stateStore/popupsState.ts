import { PopupDetailsType, PopupSchema } from "@/lib/dbSchemas/popupSchema";
import { atom } from "recoil";

export const popupState = atom<PopupDetailsType[]>({
  key: "popupState",
  default: [],
});

export const popupsList = atom<Array<PopupSchema>>({
  key: "popupsList",
  default: [],
});
