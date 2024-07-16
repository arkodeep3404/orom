"use client";

import { RecoilRoot, atom } from "recoil";

type popupType = {
  id: string;
  title: string;
  description: string;
  duration: string;
  start: string;
};

export const popupState = atom<popupType[]>({
  key: "popupState",
  default: [],
});

export const popupTitle = atom({
  key: "popupTitle",
  default: "",
});

export const popupDescription = atom({
  key: "popupDescription",
  default: "",
});

export const popupDuration = atom({
  key: "popupDuration",
  default: "",
});

export const popupStart = atom({
  key: "popupStart",
  default: "",
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
