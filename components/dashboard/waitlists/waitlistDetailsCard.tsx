"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  waitlistsDetailState,
  showWaitlistsSaveButton,
  InitialWaitlistSchema,
} from "@/lib/stateStore/waitlistsState";
import { useSetRecoilState } from "recoil";

export default function WaitlistDetailsCard({
  data,
}: {
  data: InitialWaitlistSchema;
}) {
  const setWaitlistCardContent = useSetRecoilState(waitlistsDetailState);
  const setSaveButtonStatus = useSetRecoilState(showWaitlistsSaveButton);

  function updateWaitlistCard(field: string, value: string) {
    setWaitlistCardContent((prevContent) => {
      if (field === "waitlistTitle" || field === "waitlistDescription") {
        return {
          ...prevContent,
          [field]: value.trim(),
        };
      } else if (field in prevContent.socialUrls) {
        return {
          ...prevContent,
          socialUrls: {
            ...prevContent.socialUrls,
            [field]: value.trim(),
          },
        };
      }
      return prevContent;
    });

    setSaveButtonStatus(true);
  }

  return (
    <Card className="w-1/2">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="waitlistTitle"
                placeholder="Title of waitlist"
                onChange={(e) =>
                  updateWaitlistCard("waitlistTitle", e.target.value)
                }
                value={data.waitlistTitle}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="waitlistDescription">Description</Label>
              <Input
                id="waitlistDescription"
                placeholder="Description of waitlist"
                onChange={(e) =>
                  updateWaitlistCard("waitlistDescription", e.target.value)
                }
                value={data.waitlistDescription}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="FacebookUrl">Facebook Link</Label>
              <Input
                id="FacebookUrl"
                placeholder="Your Facebook Url"
                onChange={(e) =>
                  updateWaitlistCard("FacebookUrl", e.target.value)
                }
                value={data.socialUrls.FacebookUrl}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="InstagramUrl">Instagram Link</Label>
              <Input
                id="InstagramUrl"
                placeholder="Your Instagram Account Url"
                onChange={(e) =>
                  updateWaitlistCard("InstagramUrl", e.target.value)
                }
                value={data.socialUrls.InstagramUrl}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="XUrl">X Link</Label>
              <Input
                id="XUrl"
                placeholder="Your X Account Url"
                onChange={(e) => updateWaitlistCard("XUrl", e.target.value)}
                value={data.socialUrls.XUrl}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="YouTubeUrl">YouTube Link</Label>
              <Input
                id="YouTubeUrl"
                placeholder="Your YouTube Account Url"
                onChange={(e) =>
                  updateWaitlistCard("YouTubeUrl", e.target.value)
                }
                value={data.socialUrls.YouTubeUrl}
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="LinkedInUrl">LinkedIn Link</Label>
              <Input
                id="LinkedInUrl"
                placeholder="Your LinkedIn Account Url"
                onChange={(e) =>
                  updateWaitlistCard("LinkedInUrl", e.target.value)
                }
                value={data.socialUrls.LinkedInUrl}
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
