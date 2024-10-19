import { PopupDetailsType, PopupSchema } from "@/lib/dbSchemas/popupSchema";
import { atom } from "recoil";

export const popupsDetailState = atom<PopupDetailsType[]>({
  key: "popupsDetailState",
  default: [],
});

export const popupsList = atom<Array<PopupSchema>>({
  key: "popupsList",
  default: [],
});

export const showPopupsSaveButton = atom<boolean>({
  key: "showPopupsSaveButton",
  default: false,
});
