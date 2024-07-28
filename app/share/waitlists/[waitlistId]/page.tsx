"use client";

import ShareWaitlistPage from "@/components/dashboard/waitlists/shareWaitlistPage";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandDiscord,
} from "@tabler/icons-react";
import { WaitlistSchema } from "@/lib/dbSchemas/waitlistSchema";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import mongoose from "mongoose";

export default function EmailEditor() {
  const initialWaitlistState = {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    waitlistName: "",
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
  };

  const params = useParams();
  const [waitlistDetails, setWaitlistDetails] = useState<WaitlistSchema | any>(
    initialWaitlistState
  );

  async function fetchWaitlistDetails() {
    const response = await axios.get("/api/shareScripts/waitlistScript", {
      headers: { waitlistId: params.waitlistId },
    });

    setWaitlistDetails(response.data.displayWaitlist);
  }

  useEffect(() => {
    fetchWaitlistDetails();
  }, []);

  const socials = [
    {
      id: 1,
      platform: "Facebook",
      url: waitlistDetails.socialUrls.FacebookUrl,
      icon: <IconBrandFacebook />,
    },
    {
      id: 2,
      platform: "Instagram",
      url: waitlistDetails.socialUrls.InstagramUrl,
      icon: <IconBrandInstagram />,
    },
    {
      id: 3,
      platform: "X",
      url: waitlistDetails.socialUrls.XUrl,
      icon: <IconBrandX />,
    },
    {
      id: 4,
      platform: "YouTube",
      url: waitlistDetails.socialUrls.YouTubeUrl,
      icon: <IconBrandYoutube />,
    },
    {
      id: 5,
      platform: "LinkedIn",
      url: waitlistDetails.socialUrls.LinkedInUrl,
      icon: <IconBrandLinkedin />,
    },
    {
      id: 6,
      platform: "GitHub",
      url: waitlistDetails.socialUrls.GitHubUrl,
      icon: <IconBrandGithub />,
    },
    {
      id: 7,
      platform: "Discord",
      url: waitlistDetails.socialUrls.DiscordUrl,
      icon: <IconBrandDiscord />,
    },
  ];

  return (
    <ShareWaitlistPage
      waitlistId={params.waitlistId}
      title={waitlistDetails.waitlistTitle}
      description={waitlistDetails.waitlistDescription}
      socials={socials.filter((social) => social.url !== "")}
    />
  );
}
