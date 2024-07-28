import { SocialUrlsType, WaitlistSchema } from "@/lib/dbSchemas/waitlistSchema";
import { atom } from "recoil";

export interface InitialWaitlistSchema {
  waitlistTitle: string;
  waitlistDescription: string;
  socialUrls: SocialUrlsType;
  waitlistEmails: string[];
}

export const waitlistsList = atom<Array<WaitlistSchema>>({
  key: "waitlistsList",
  default: [],
});

export const waitlistsDetailState = atom<InitialWaitlistSchema>({
  key: "waitlistsDetailState",
  default: {
    waitlistTitle: "",
    waitlistDescription: "",
    socialUrls: {
      FacebookUrl: "",
      InstagramUrl: "",
      XUrl: "",
      YouTubeUrl: "",
      LinkedInUrl: "",
      GitHubUrl: "",
      DiscordUrl: "",
    },
    waitlistEmails: [""],
  },
});

export const showWaitlistsSaveButton = atom<boolean>({
  key: "showWaitlistsSaveButton",
  default: false,
});
