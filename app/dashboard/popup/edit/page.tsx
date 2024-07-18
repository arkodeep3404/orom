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
import { useRecoilState } from "recoil";
import { popupState, saveButton } from "@/store/atoms";
import axios from "axios";
import { toast } from "sonner";
import { v4 } from "uuid";

export default function PopupEditor() {
  const [popupCardsContent, setPopupCardsContent] = useRecoilState(popupState);
  const [saveButtonStatus, setSaveButtonStatus] = useRecoilState(saveButton);

  function addPopupCards() {
    setPopupCardsContent((prevContent) => [
      ...prevContent,
      {
        id: v4(),
        title: "",
        description: "",
        duration: 0,
        start: 0,
      },
    ]);
  }

  async function savePopupCards() {
    const isEmptyField = popupCardsContent.some((cardData) => {
      return (
        cardData.title === "" ||
        cardData.description === "" ||
        cardData.duration === 0 ||
        cardData.start === 0
      );
    });

    if (isEmptyField) {
      toast("fill in all the fields before saving");
      return;
    }

    axios
      .post("/api/dashboard/popup/createNew", {
        popupDetails: popupCardsContent,
        popupUId: v4(),
      })
      .then((response) => {
        toast(response.data.message);
      })
      .catch((error) => {
        toast(error.response.data.message);
      });

    setSaveButtonStatus(false);
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

          <Button onClick={savePopupCards} disabled={!saveButtonStatus}>
            Save
          </Button>
        </CardFooter>
      </Card>

      {popupCardsContent.map((data, index) => (
        <AddPopup key={index} data={data} />
      ))}
    </div>
  );
}
