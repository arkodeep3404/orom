"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode, useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { mdxStyles } from "../mdxStyles/mdxStyles";
import { Note } from "../mdxStyles/Callouts";
import { EvaluateOptions } from "@mdx-js/mdx";
import { MDXContent } from "mdx/types";

export default function Editor() {
  const [blog, setBlog] = useState<string>("");
  const [finalMdx, setFinalMdx] = useState<MDXContent | any | string>("");
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const mdxFinalStyles = {
    ...mdxStyles,
    Note,
  };

  async function test(): Promise<void> {
    const { default: resultMdx } = await evaluate(blog, {
      ...runtime,
      remarkPlugins: [remarkGfm],
      useMDXComponents: () => mdxFinalStyles,
    } as EvaluateOptions);
    setFinalMdx(resultMdx);
  }

  useEffect(() => {
    test();
  }, [blog]);

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
                value={blog}
                name="content"
                id="content"
                placeholder="Write your content here"
                className="h-[calc(100vh-5rem)] p-10"
                onChange={(e) => setBlog(e.target.value)}
              />
            </ScrollArea>
          </div>

          <div className="prose">
            <Label htmlFor="preview">View live preview here</Label>
            <ScrollArea
              className="rounded-md border col-span-1 p-10 h-[calc(100vh-5rem)]"
              id="preview"
            >
              {finalMdx}
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  }
}
