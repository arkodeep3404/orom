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

  function copyScript() {
    const script = `<script defer popupId="${params.popupId}" origin="${location.origin}" src="${location.origin}/scripts/popupScript/script.js"></script>`;

    navigator.clipboard.writeText(script);
    toast("script copied");
  }

  return (
    <div className="flex flex-col w-screen items-center gap-5 mt-10 ">
      <Card className="w-1/2 text-center">
        <CardHeader>
          <CardTitle>Create pop-ups</CardTitle>
          <CardDescription>
            {"Copy & paste the script in the <head> of your website."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-evenly">
          <Button
            onClick={saveWaitlistCard}
            disabled={!saveWaitlistButtonStatus}
          >
            Save
          </Button>

          <Button onClick={copyScript}>Copy Script</Button>
        </CardFooter>
      </Card>

      <WaitlistDetailsCard data={waitlistCardContent} />
    </div>
  );
}
