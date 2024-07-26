"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WaitlistDetailsCard from "@/components/dashboard/waitlists/waitlistDetailsCard";
import {
  waitlistsDetailState,
  showWaitlistsSaveButton,
} from "@/lib/stateStore/waitlistsState";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function WaitlistEditor() {
  const params = useParams();
  const [waitlistCardContent, setWaitlistCardContent] =
    useRecoilState(waitlistsDetailState);
  const [saveWaitlistButtonStatus, setSaveWaitlistButtonStatus] =
    useRecoilState(showWaitlistsSaveButton);

  async function fetchWaitlistCard() {
    const response = await axios.get("/api/dashboard/waitlists/getExisting", {
      headers: { waitlistId: params.waitlistId },
    });

    setWaitlistCardContent(response.data.currentWaitlist);
  }

  useEffect(() => {
    fetchWaitlistCard();
  }, []);

  async function saveWaitlistCard() {
    const isEmptyField =
      waitlistCardContent.waitlistTitle.trim() === "" ||
      waitlistCardContent.waitlistDescription.trim() === "";

    if (isEmptyField) {
      toast("provide a title and description before saving");
      return;
    }

    axios
      .post("/api/dashboard/waitlists/editExisting", {
        waitlistId: params.waitlistId,
        waitlistContent: waitlistCardContent,
      })
      .then((response) => {
        toast(response.data.message);
      })
      .catch((error) => {
        toast(error.response.data.message);
      });

    setSaveWaitlistButtonStatus(false);
  }

  function copyLink() {
    const link = `${location.origin}/share/waitlists/${params.waitlistId}`;

    navigator.clipboard.writeText(link);
    toast("link copied");
  }

  return (
    <div className="flex flex-col w-screen items-center gap-5 mt-10 ">
      <Card className="w-1/2 text-center">
        <CardHeader>
          <CardTitle>Create Waitlists</CardTitle>
          <CardDescription>
            Copy & Share the link for your waitlist.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-evenly">
          <Button
            onClick={saveWaitlistCard}
            disabled={!saveWaitlistButtonStatus}
          >
            Save
          </Button>

          <Button onClick={copyLink}>Copy Link</Button>
        </CardFooter>
      </Card>

      <WaitlistDetailsCard data={waitlistCardContent} />
    </div>
  );
}
