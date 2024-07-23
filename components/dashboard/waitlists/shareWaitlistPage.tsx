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

interface socialsType {
  id: number;
  platform: string;
  url: string;
  icon: ReactElement;
}

export default function ShareWaitlistPage({
  words,
  socials,
}: {
  words: Array<string>;
  socials: Array<socialsType>;
}) {
  const [email, setEmail] = useState("");

  function submit() {
    TriggerSideCannons();
  }

  return (
    <AuroraBackground className="justify-evenly relative">
      <div className="flex flex-col items-center text-center">
        <SparklesText
          text="Create and share your waitlist today"
          className="font-normal"
        />
        <TypewriterEffectSmooth words={words} />
      </div>

      <PlaceholdersAndVanishInput
        placeholders={["Enter your email to get juicy updates regularly"]}
        onChange={(e) => setEmail(e.target.value)}
        onSubmit={submit}
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
