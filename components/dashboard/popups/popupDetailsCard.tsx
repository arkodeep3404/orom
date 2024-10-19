"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  popupsDetailState,
  showPopupsSaveButton,
} from "@/lib/stateStore/popupsState";
import { PopupDetailsType } from "@/lib/dbSchemas/popupSchema";
import mongoose from "mongoose";
import { toast } from "sonner";
import { useSetRecoilState } from "recoil";

export default function PopupDetailsCard({ data }: { data: PopupDetailsType }) {
  const setPopupCardsContent = useSetRecoilState(popupsDetailState);
  const setSavePopupsButtonStatus = useSetRecoilState(showPopupsSaveButton);

  function updatePopupCards(
    _id: mongoose.Types.ObjectId,
    field: string,
    value: string | number | any
  ) {
    if (
      (field === "popupDuration" && isNaN(value)) ||
      (field === "popupStart" && isNaN(value))
    ) {
      toast("enter a valid number");
    } else {
      setPopupCardsContent((prevContent) =>
        prevContent.map((cardData) => {
          if (cardData._id === _id) {
            return {
              ...cardData,
              [field]:
                field === "popupDuration" || field === "popupStart"
                  ? Number(value)
                  : value,
            };
          }
          return cardData;
        })
      );
      setSavePopupsButtonStatus(true);
    }
  }

  return (
    <Card className="w-1/2">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="popupTitle">Title</Label>
                <Input
                  id="popupTitle"
                  placeholder="Title of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "popupTitle", e.target.value)
                  }
                  value={data.popupTitle}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="popupDescription">Description</Label>
                <Input
                  id="popupDescription"
                  placeholder="Description of pop-up"
                  onChange={(e) =>
                    updatePopupCards(
                      data._id,
                      "popupDescription",
                      e.target.value
                    )
                  }
                  value={data.popupDescription}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="popupDuration">
                  Duration of display (in seconds)
                </Label>
                <Input
                  id="popupDuration"
                  placeholder="Duration of display of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "popupDuration", e.target.value)
                  }
                  value={data.popupDuration}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="popupStart">Start time (in seconds)</Label>
                <Input
                  id="popupStart"
                  placeholder="Start time of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data._id, "popupStart", e.target.value)
                  }
                  value={data.popupStart}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
