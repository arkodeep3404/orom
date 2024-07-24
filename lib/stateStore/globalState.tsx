"use client";

import { RecoilRoot, atom } from "recoil";

export const showSaveButton = atom<boolean>({
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
