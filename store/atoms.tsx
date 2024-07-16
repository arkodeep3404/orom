"use client";

import { RecoilRoot, atom } from "recoil";

type popupType = {
  title: string;
  description: string;
  duration: number;
  start: number;
};

export const popupState = atom<popupType[]>({
  key: "popupState",
  default: [],
});

export const popupNumber = atom<number[]>({
  key: "popupNumber",
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
  default: 0,
});

export const popupStart = atom({
  key: "popupStart",
  default: 0,
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
