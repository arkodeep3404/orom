import { WaitlistSchema } from "@/lib/dbSchemas/waitlistSchema";
import { atom } from "recoil";

export const waitlistsList = atom<Array<WaitlistSchema>>({
  key: "waitlistsList",
  default: [],
});

export const showWaitlistsSaveButton = atom<boolean>({
  key: "waitlistsSaveButton",
  default: false,
});
