import ShareWaitlistPage from "@/components/dashboard/waitlists/shareWaitlistPage";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconBrandYoutube,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function EmailEditor() {
  const words = "Share your waitlist and get customers even before launching.";

  const socials = [
    {
      id: 1,
      platform: "Facebook",
      url: "https://facebook.com",
      icon: <IconBrandFacebook />,
    },
    {
      id: 2,
      platform: "Instagram",
      url: "https://instagram.com",
      icon: <IconBrandInstagram />,
    },
    { id: 3, platform: "X", url: "https://x.com", icon: <IconBrandX /> },
    {
      id: 4,
      platform: "YouTube",
      url: "https://youtube.com",
      icon: <IconBrandYoutube />,
    },
    {
      id: 5,
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: <IconBrandLinkedin />,
    },
  ];

  return (
    <div>
      <ShareWaitlistPage words={words} socials={socials} />
    </div>
  );
}
