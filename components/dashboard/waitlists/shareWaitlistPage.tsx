"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import SparklesText from "@/components/magicui/sparkles-text";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BorderBeam } from "@/components/magicui/border-beam";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { CoolMode } from "@/components/magicui/cool-mode";
import { TriggerSideCannons } from "@/components/magicui/confetti-sideCannons";
import { Button } from "@/components/ui/button";
import { ReactElement, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface socialsType {
  id: number;
  platform: string;
  url: string;
  icon: ReactElement;
}

export default function ShareWaitlistPage({
  waitlistId,
  title,
  description,
  socials,
}: {
  waitlistId: string | string[];
  title: string;
  description: string;
  socials: Array<socialsType>;
}) {
  const [waitlistEmail, setWaitlistEmail] = useState("");

  async function submitWaitlistEmail() {
    if (waitlistEmail.trim() === "") {
      toast("please enter your email");
    } else {
      try {
        const response = await axios.post("/api/shareScripts/waitlistScript", {
          waitlistId: waitlistId,
          waitlistEmail: waitlistEmail,
        });

        TriggerSideCannons();
        toast(response.data.message);
      } catch (error: any) {
        toast(error.response.data.message);
      }
    }
  }

  return (
    <AuroraBackground className="justify-evenly relative">
      <div className="flex flex-col items-center text-center">
        <SparklesText text={title} className="font-normal" />
        {description !== "" && <TypewriterEffectSmooth words={description} />}
      </div>

      <PlaceholdersAndVanishInput
        placeholders={["Enter your email to get juicy updates regularly"]}
        onChange={(e) => setWaitlistEmail(e.target.value)}
        onSubmit={submitWaitlistEmail}
      />

      <div className="flex flex-row items-center justify-center w-full">
        <AnimatedTooltip items={socials} />
      </div>

      <CoolMode>
        <Button
          className="relative rounded-[1.75rem]"
          variant="secondary"
          size="lg"
        >
          Get yours now
          <BorderBeam />
        </Button>
      </CoolMode>
    </AuroraBackground>
  );
}
