"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddPopup from "@/components/dashboard/popup/addPopup";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  popupState,
  popupTitle,
  popupDescription,
  popupDuration,
  popupStart,
} from "@/store/atoms";
import { v4 as uuid } from "uuid";

export default function PopupEditor() {
  const [popupCards, setPopupCards] = useRecoilState(popupState);
  const title = useRecoilValue(popupTitle);
  const description = useRecoilValue(popupDescription);
  const duration = useRecoilValue(popupDuration);
  const start = useRecoilValue(popupStart);

  function addPopupCard() {
    console.log(popupCards);

    setPopupCards([
      ...popupCards,
      {
        id: uuid(),
        title: title,
        description: description,
        duration: duration,
        start: start,
      },
    ]);
  }

  return (
    <div className="flex flex-col w-screen items-center gap-5 mt-10 ">
      <Card className="w-1/2 text-center">
        <CardHeader>
          <CardTitle>Create pop-ups</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-evenly">
          <Button onClick={addPopupCard}>Add new</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
      {popupCards.map((_, index) => (
        <AddPopup key={index} />
      ))}
    </div>
  );
}
