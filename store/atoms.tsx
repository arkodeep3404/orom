"use client";

import { RecoilRoot, atom } from "recoil";

export type popupType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  start: number;
};

export const popupState = atom<popupType[]>({
  key: "popupState",
  default: [],
});

export const saveButton = atom<boolean>({
  key: "saveButton",
  default: false,
});

export default function RecoilContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
