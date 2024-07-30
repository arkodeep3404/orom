"use client";

import * as z from "zod";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ArrowDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Custom Components
import { Section, Container } from "@/components/craft";

// Assets
import Placeholder from "@/public/placeholder.jpg";

const formSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
});

export default function Hero() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const url =
      "https://script.google.com/macros/s/AKfycbzeIdlL_G1yKpqOmRw1NsX-DUMUl9RZ7rTciKwvkKj5h7U9osAxXEQn0idAe82a6ntcwg/exec";
    const formData = new FormData();

    formData.append("email", values.email);

    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      toast("Thanks for joining the waitlist for Orom!", {
        description:
          "We’ll keep you updated with the latest news and launch details. Stay tuned!",
      });
    } catch (error: any) {
      toast(error);
    }
  }

  useEffect(() => {
    const time1 = setTimeout(() => {
      toast("Simplify Your Workflow with Orom", {
        description:
          "Tired of juggling multiple tools? Orom consolidates all your outreach, marketing, and lead management needs into one easy-to-use platform. Join our waitlist today!",
        duration: 15000,
      });
    }, 1000);

    const time2 = setTimeout(() => {
      toast("Boost Your Business Efficiency", {
        description:
          "Save time and reduce costs with Orom’s integrated solution. Streamline your operations and focus on growing your business. Sign up for the waitlist now!",
        duration: 15000,
      });
    }, 30000);

    const time3 = setTimeout(() => {
      toast("Stay Ahead of the Competition", {
        description:
          "Gain a competitive edge with Orom’s powerful features. Customize, automate, and manage all your business needs seamlessly. Subscribe to our waitlist for early access!",
        duration: 15000,
      });
    }, 60000);

    const time4 = setTimeout(() => {
      toast("Engage Your Customers Better", {
        description:
          "Enhance customer engagement and boost conversion rates with Orom. Centralize feedback, streamline communication, and drive success. Get on our waitlist today!",
        duration: 15000,
      });
    }, 90000);

    // const time5 = setTimeout(() => {
    //   toast("Hassle-Free Marketing and Lead Management", {
    //     description:
    //       "Orom offers everything you need in one place. From marketing campaigns to lead tracking, simplify your efforts and see results. Join our waitlist for updates!",
    //     duration: 10000,
    //   });
    // }, 80000);

    const time6 = setTimeout(() => {
      toast("Ready to Transform Your Business?", {
        description:
          "Orom offers everything you need in one place. From marketing campaigns to lead tracking, simplify your efforts and see results. Join our waitlist for updates!",
        duration: 15000,
      });
    }, 120000);

    return () => {
      clearTimeout(time1),
        clearTimeout(time2),
        clearTimeout(time3),
        clearTimeout(time4),
        //clearTimeout(time5);
        clearTimeout(time6);
    };
  }, []);

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center text-center">
          <h1 className="!mb-0">
            <Balancer>
              Empower Your Business with Orom: The All-in-One Platform for
              Outreach, Marketing, and Lead Management
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              Unify Your Outreach, Marketing, and Lead Management Efforts in One
              Powerful Platform
            </Balancer>
          </h3>
          <Button
            asChild
            className="not-prose mb-3 flex w-fit"
            size="sm"
            variant="outline"
          >
            <Link href="">
              Join 40+ People. Hurry, Limited Spots Available
              <ArrowDown className="ml-2 w-4" />
            </Link>
          </Button>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 text-left"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          <div className="my-8 h-96 w-full overflow-hidden rounded-lg border md:h-[480px] md:rounded-xl">
            <Image
              className="not-prose h-full w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
