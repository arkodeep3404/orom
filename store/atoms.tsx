"use client";

import { RecoilRoot, atom } from "recoil";
import { PopupSchema } from "@/lib/dbSchema";
import { PopupDetailsType } from "@/lib/dbSchema";

export const popupState = atom<PopupDetailsType[]>({
  key: "popupState",
  default: [],
});

export const showSaveButton = atom<boolean>({
  key: "saveButton",
  default: false,
});

export const popupsList = atom<Array<PopupSchema>>({
  key: "popupsList",
  default: [],
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
