"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSetRecoilState } from "recoil";
import {
  popupTitle,
  popupDescription,
  popupDuration,
  popupStart,
} from "@/store/atoms";

export default function AddPopup() {
  const setTitle = useSetRecoilState(popupTitle);
  const setDescription = useSetRecoilState(popupDescription);
  const setDuration = useSetRecoilState(popupDuration);
  const setStart = useSetRecoilState(popupStart);

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
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description of pop-up"
                  onChange={(e) => setDescription(e.target.value)}
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
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="start">Start time (in seconds)</Label>
                <Input
                  id="start"
                  placeholder="Start time of pop-up"
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
