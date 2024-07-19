"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddPopupDetailsCard from "@/components/dashboard/popup/addPopupDetailsCard";
import { useRecoilState } from "recoil";
import { popupState, showSaveButton } from "@/store/atoms";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import mongoose from "mongoose";

export default function PopupEditor() {
  const params = useParams();
  const [popupCardsContent, setPopupCardsContent] = useRecoilState(popupState);
  const [saveButtonStatus, setSaveButtonStatus] =
    useRecoilState(showSaveButton);

  async function fetchPopupCards() {
    const response = await axios.get("/api/dashboard/popup/getExisting", {
      headers: { popupId: params.popupId },
    });

    setPopupCardsContent(response.data.currentPopup.popupDetails);
    console.log(response.data.currentPopup.popupDetails);
  }

  useEffect(() => {
    fetchPopupCards();
  }, []);

  function addPopupCards() {
    setPopupCardsContent((prevContent) => [
      ...prevContent,
      {
        _id: new mongoose.Types.ObjectId(),
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
        cardData.title.trim() === "" ||
        cardData.description.trim() === "" ||
        cardData.duration === 0 ||
        cardData.start === 0
      );
    });

    if (isEmptyField) {
      toast("fill in all the fields before saving");
      return;
    }

    axios
      .post("/api/dashboard/popup/editExisting", {
        popupId: params.popupId,
        popupDetails: popupCardsContent,
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
        <AddPopupDetailsCard key={index} data={data} />
      ))}
    </div>
  );
}
