// React and Next.js imports
import React from "react";

// Third-party library imports
import { ArrowUpRight } from "lucide-react";

// UI component imports
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Custom components
import { Section, Container } from "@/components/craft";

import Link from "next/link";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "What is Orom?",
    answer:
      "Orom is an all-in-one platform designed to simplify outreach, marketing, and lead management for first-time entrepreneurs and small business owners.",
    // link: "https://google.com",
  },
  {
    question: "How does Orom help reduce costs?",
    answer:
      "Orom consolidates essential business tools into one subscription, eliminating the need to pay for multiple services and reducing overall costs.",
  },
  {
    question: "Can I integrate Orom with my existing website?",
    answer:
      "Yes, Orom offers seamless integration with your existing website through custom APIs, ensuring smooth operation without the need for third-party services.",
  },
  {
    question: "What features does Orom offer?",
    answer:
      "Orom provides a wide range of features, including custom waitlists, testimonial collection, newsletter creation, feedback and feature management, dynamic blogs, custom popups, and more.",
  },
  {
    question: "Is Orom customizable?",
    answer:
      "Absolutely! Orom offers highly customizable components to fit the unique needs of your business, from waitlists and testimonials to newsletters and popups.",
  },
  {
    question: "How can I join the waitlist?",
    answer:
      "You can join the waitlist by signing up on our website. You'll receive exclusive early access and updates on our launch.",
  },
  {
    question: "How does Orom improve customer engagement?",
    answer:
      "Orom centralizes feedback and feature management, enabling businesses to prioritize improvements based on user input, leading to higher engagement and conversion rates.",
  },
  {
    question: "Do I need coding skills to use Orom?",
    answer:
      "No, Orom is designed to be user-friendly and requires no coding skills. Our intuitive interface and no-code tools make it accessible for everyone.",
  },
  {
    question: "What makes Orom different from other platforms?",
    answer:
      "Orom stands out by offering a comprehensive, all-in-one solution with seamless integration, customization, and automation, all under a single subscription model.",
  },
  {
    question: "Can I import my existing content into Orom?",
    answer:
      "Yes, you can import content from Google Docs into Orom for blog creation, making it easy to migrate your existing content.",
  },
];

const FAQ = () => {
  return (
    <Section>
      <Container>
        <h3 className="!mt-0">Frequently Asked Questions</h3>
        <h4 className="text-muted-foreground">
          Can&apos;t find the answer you&apos;re looking for? Reach out to us at{" "}
          <Link href="mailto:contact@orom.club" className="text-black">
            contact@orom.club
          </Link>
        </h4>
        <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8">
          {content.map((item, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem
                value={item.question}
                className="rounded-md border bg-muted/20 px-4 transition-all hover:bg-muted/50"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:w-3/4">
                  {item.answer}
                  {item.link && (
                    <Link
                      href={item.link}
                      className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                    >
                      Learn more <ArrowUpRight className="ml-1" size="16" />
                    </Link>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
