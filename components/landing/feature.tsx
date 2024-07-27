// React and Next.js imports
import Link from "next/link";

// Third-party library imports
import Balancer from "react-wrap-balancer";

// UI component imports
import { Section, Container } from "@/components/craft";

// Icon imports
import {
  LoaderCircle,
  PictureInPicture2,
  UserRoundCheck,
  Mails,
  Newspaper,
  Lightbulb,
  PanelTop,
  UsersRound,
  BotMessageSquare,
  AtSign,
  HandCoins,
  GalleryHorizontalEnd,
} from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

const featureText: FeatureText[] = [
  {
    icon: <LoaderCircle className="h-6 w-6" />,
    title: "Custom Waitlists",
    href: "/",
    description:
      "Create and manage waitlists easily. Integrate with your website or use as a standalone page.",
    cta: "Learn More",
  },
  {
    icon: <PictureInPicture2 className="h-6 w-6" />,
    title: "Custom Popup",
    href: "/",
    description:
      "Create website popups with customizable content, timing, and display rules.",
    cta: "Learn More",
  },
  {
    icon: <UserRoundCheck className="h-6 w-6" />,
    title: "Testimonial Collection",
    href: "/",
    description:
      "Gather and display customer testimonials. Customizable forms and display options available.",
    cta: "Learn More",
  },

  {
    icon: <Mails className="h-6 w-6" />,
    title: "Newsletter Creator",
    href: "/",
    description:
      "Design newsletters, manage subscribers, and send campaigns. Integrates with AWS SES.",
    cta: "Learn More",
  },
  {
    icon: <Newspaper className="h-6 w-6" />,
    title: "Blog Platform",
    href: "/",
    description:
      "Write and publish blogs using MDX or import from Google Docs. Easy to integrate with your site.",
    cta: "Learn More",
  },
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Feedback and Ideas",
    href: "/",
    description:
      "Collect user feedback and feature ideas. Users can upvote and discuss suggestions.",
    cta: "Learn More",
  },
  {
    icon: <PanelTop className="h-6 w-6" />,
    title: "No-Code Website Builder",
    href: "/",
    description: "Build websites easily without coding knowledge.",
    cta: "Learn More",
  },
  {
    icon: <UsersRound className="h-6 w-6" />,
    title: "Team Workspace",
    href: "/",
    description: "Invite team members to collaborate on tasks and projects.",
    cta: "Learn More",
  },
  {
    icon: <BotMessageSquare className="h-6 w-6" />,
    title: "AI Chatbot Creator",
    href: "/",
    description: "Build and deploy AI-powered chatbots for your website.",
    cta: "Learn More",
  },
  {
    icon: <AtSign className="h-6 w-6" />,
    title: "Social Media Content Creator",
    href: "/",
    description:
      "Design posts and create content for social media platforms easily.",
    cta: "Learn More",
  },
  {
    icon: <HandCoins className="h-6 w-6" />,
    title: "Idea Sharing",
    href: "/",
    description:
      "Platform for users to share, upvote, and discuss ideas for new projects or products.",
    cta: "Learn More",
  },
  {
    icon: <GalleryHorizontalEnd className="h-6 w-6" />,
    title: "Coming Soon",
    href: "/",
    description: "More amazing tools on the horizon. Stay tuned for updates!",
    cta: "Learn More",
  },
];

const Feature = () => {
  return (
    <Section>
      <Container className="not-prose">
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl">
            <Balancer>
              Explore Orom&apos;s Comprehensive Features to Transform Your
              Business
            </Balancer>
          </h3>
          <h4 className="text-2xl font-light opacity-70">
            <Balancer>
              Unleash Your Business Potential: One Platform, Endless
              Possibilities
            </Balancer>
          </h4>

          <div className="mt-6 grid gap-6 md:mt-12 md:grid-cols-4">
            {featureText.map(
              ({ icon, title, description, href, cta }, index) => (
                <Link
                  href={`${href}`}
                  className="flex flex-col justify-between gap-6 rounded-lg border p-6 transition-all hover:-mt-2 hover:mb-2"
                  key={index}
                >
                  <div className="grid gap-4">
                    {icon}
                    <h4 className="text-xl text-primary">{title}</h4>
                    <p className="text-base opacity-75">{description}</p>
                  </div>
                  {/* {cta && (
                    <div className="flex h-fit items-center text-sm font-semibold">
                      <p>{cta}</p> <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )} */}
                </Link>
              )
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Feature;
