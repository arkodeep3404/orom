"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { renderAsync } from "@react-email/render";
import MyTemplate from "@/lib/emailStyles/emailStyles";

export default function Editor() {
  const [email, setEmail] = useState<string>("");
  const [finalEmail, setFinalEmail] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  async function test(): Promise<void> {
    const html = await renderAsync(<MyTemplate />, {
      pretty: true,
    });

    setFinalEmail(html);
  }

  useEffect(() => {
    test();
  }, [email]);

  if (!show) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <div>
        <div className="m-10 grid grid-cols-2 gap-10 h-[calc(100vh-5rem)]">
          <div>
            <Label htmlFor="content">Write your content here</Label>
            <ScrollArea className="col-span-1">
              <Textarea
                value={email}
                name="content"
                id="content"
                placeholder="Write your content here"
                className="h-[calc(100vh-5rem)] p-10"
                onChange={(e) => setEmail(e.target.value)}
              />
            </ScrollArea>
          </div>

          <div className="prose">
            <Label htmlFor="preview">View live preview here</Label>
            <ScrollArea
              className="rounded-md border col-span-1 p-10 h-[calc(100vh-5rem)]"
              id="preview"
            >
              {finalEmail}
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  }
}
