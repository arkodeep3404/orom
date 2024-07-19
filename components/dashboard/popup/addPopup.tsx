"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetRecoilState } from "recoil";
import { popupType, popupState, showSaveButton } from "@/store/atoms";

export default function AddPopup({ data }: { data: popupType }) {
  const setPopupCardsContent = useSetRecoilState(popupState);
  const setSaveButtonStatus = useSetRecoilState(showSaveButton);

  function updatePopupCards(
    id: string,
    field: string,
    value: string | number | any
  ) {
    setPopupCardsContent((prevContent) =>
      prevContent.map((cardData) => {
        if (cardData.id === id) {
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
                    updatePopupCards(data.id, "title", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data.id, "description", e.target.value)
                  }
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
                    updatePopupCards(data.id, "duration", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="start">Start time (in seconds)</Label>
                <Input
                  id="start"
                  placeholder="Start time of pop-up"
                  onChange={(e) =>
                    updatePopupCards(data.id, "start", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
