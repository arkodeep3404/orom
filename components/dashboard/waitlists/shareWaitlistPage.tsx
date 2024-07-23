import { AuroraBackground } from "@/components/ui/aurora-background";
import SparklesText from "@/components/magicui/sparkles-text";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";

interface wordsType {
  text: string;
  className?: string;
}

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
  words: Array<wordsType>;
  socials: Array<socialsType>;
}) {
  return (
    <AuroraBackground className="justify-evenly">
      <div className="flex flex-col items-center text-center">
        <SparklesText
          text="Create and share your waitlist today"
          className="font-normal"
        />
        <TypewriterEffectSmooth words={words} />
      </div>

      <div className="flex flex-row items-center justify-center mb-10 w-full">
        <AnimatedTooltip items={socials} />
      </div>

      <Button className="relative" variant="outline">
        Get yours now
        <BorderBeam />
      </Button>
    </AuroraBackground>
  );
}

// aceternity ui

// Placeholders And Vanish Input

// magic ui

// Cool Mode
// Confetti
