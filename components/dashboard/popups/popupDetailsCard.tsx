"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetRecoilState } from "recoil";
import { popupState } from "@/lib/stateStore/popupsState";
import { showSaveButton } from "@/lib/stateStore/globalState";
import { PopupDetailsType } from "@/lib/dbSchemas/popupSchema";
import mongoose from "mongoose";
import { toast } from "sonner";

export default function PopupDetailsCard({ data }: { data: PopupDetailsType }) {
  const setPopupCardsContent = useSetRecoilState(popupState);
  const setSaveButtonStatus = useSetRecoilState(showSaveButton);

  function updatePopupCards(
    _id: mongoose.Types.ObjectId,
    field: string,
    value: string | number | any
  ) {
    if (
      (field === "duration" && isNaN(value)) ||
      (field === "start" && isNaN(value))
    ) {
      toast("enter a valid number");
    } else {
      setPopupCardsContent((prevContent) =>
        prevContent.map((cardData) => {
          if (cardData._id === _id) {
            return {
              ...cardData,
              [field]:
                field === "duration" || field === "start"
                  ? Number(value)
                  : value.trim(),
            };
          }
          return cardData;
        })
      );
      setSaveButtonStatus(true);
    }
  }

  return (
    <Card className="w-1/2">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "title", e.target.value)
                  }
                  value={data.title}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "description", e.target.value)
                  }
                  value={data.description}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">
                  Duration of display (in seconds)
                </Label>
                <Input
                  id="duration"
                  placeholder="Duration of display of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "duration", e.target.value)
                  }
                  value={data.duration}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="start">Start time (in seconds)</Label>
                <Input
                  id="start"
                  placeholder="Start time of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "start", e.target.value)
                  }
                  value={data.start}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
