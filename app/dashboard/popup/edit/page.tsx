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
  popupNumber,
  popupTitle,
  popupDescription,
  popupDuration,
  popupStart,
} from "@/store/atoms";
import axios from "axios";
import { toast } from "sonner";

export default function PopupEditor() {
  const [popupCardsContent, setPopupCardsContent] = useRecoilState(popupState);
  const [popupCardsNumber, setPopupCardsNumber] = useRecoilState(popupNumber);

  const title = useRecoilValue(popupTitle);
  const description = useRecoilValue(popupDescription);
  const duration = useRecoilValue(popupDuration);
  const start = useRecoilValue(popupStart);

  function addPopupCards() {
    if (popupCardsNumber.length === 0) {
      setPopupCardsNumber([...popupCardsNumber, popupCardsNumber.length]);
    } else {
      setPopupCardsContent((prevContent) => [
        ...prevContent,
        {
          title: title,
          description: description,
          duration: Number(duration),
          start: Number(start),
        },
      ]);

      setPopupCardsNumber([...popupCardsNumber, popupCardsNumber.length]);
    }
  }

  async function savePopupCards() {
    if (popupCardsNumber.length === 0) {
      toast("no data to save");
    } else {
      setPopupCardsContent((prevContent) => {
        const newContent = [
          ...prevContent,
          {
            title: title,
            description: description,
            duration: Number(duration),
            start: Number(start),
          },
        ];

        axios
          .post("/api/dashboard/popup", {
            popupCardsContent: newContent,
          })
          .then((response) => {
            toast(response.data.message);
          })
          .catch((error) => {
            toast(error.response.data.message);
          });

        return newContent;
      });
    }
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
          <Button onClick={addPopupCards}>Add new</Button>
          <Button onClick={savePopupCards}>Save</Button>
        </CardFooter>
      </Card>
      {popupCardsNumber.map((_, index) => (
        <AddPopup key={index} />
      ))}
    </div>
  );
}
