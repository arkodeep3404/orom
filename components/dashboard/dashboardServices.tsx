import { cn } from "@/lib/utils";
import {
  IconUsers,
  IconArticle,
  IconNews,
  IconCaretLeftRight,
  IconBrandDisqus,
  IconWorldWww,
  IconChartBarPopular,
  IconClockPause,
  IconBrandTeams,
  IconBrandMeta,
  IconBulb,
  IconNotes,
} from "@tabler/icons-react";
import Link from "next/link";

export default function DashboardServices() {
  const features = [
    {
      title: "Create & manage waitlists easily",
      description: "Get users even before you launch.",
      icon: <IconClockPause />,
      link: "/dashboard/waitlists",
    },
    {
      title: "Show pop-ups to grab attention",
      description: "Turn visitors into paying customers.",
      icon: <IconChartBarPopular />,
      link: "/dashboard/popups",
    },
    {
      title: "Collect & display testimonials",
      description: "Share what real users think.",
      icon: <IconCaretLeftRight />,
      link: "/dashboard/testimonials",
    },
    {
      title: "Update your users daily",
      description: "Send engaging newsletters for maximum conversion.",
      icon: <IconNews />,
      link: "",
    },
    {
      title: "Educate & engage people",
      description: "Use the power of blogs to drive customers.",
      icon: <IconArticle />,
      link: "",
    },
    {
      title: "Ship what customers want",
      description: "Gather feedback and feature ideas from real users.",
      icon: <IconUsers />,
      link: "",
    },
    {
      title: "Go live with a landing page",
      description: "Build with no-code and start your journey today.",
      icon: <IconWorldWww />,
      link: "",
    },

    {
      title: "Collaborate with your team",
      description: "Invite team members to help distribute workload.",
      icon: <IconBrandTeams />,
      link: "",
    },
    {
      title: "24x7 customer service chatbots",
      description:
        "Increase customer satisfaction with AI chatbots on your website.",
      icon: <IconBrandDisqus />,
      link: "",
    },
    {
      title: "Create content and design posts",
      description: "Grow your social media channels.",
      icon: <IconBrandMeta />,
      link: "",
    },
    {
      title: "Ideas for the next big thing",
      description:
        "Solve real problems for real people. Build products people would use.",
      icon: <IconBulb />,
      link: "",
    },
    {
      title: "Stay tuned",
      description: "Many more such amazing tools coming very soon.",
      icon: <IconNotes />,
      link: "",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  link,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div
        className={cn(
          "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
          (index === 0 || index === 4 || index === 8) &&
            "lg:border-l dark:border-neutral-800",
          index < 8 && "lg:border-b dark:border-neutral-800"
        )}
      >
        {index < 8 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        {index >= 8 && (
          <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
        )}
        <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
          {icon}
        </div>
        <div className="text-lg font-bold mb-2 relative z-10 px-10">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
          {description}
        </p>
      </div>
    </Link>
  );
};
