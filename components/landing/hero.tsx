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
      toast("a", {
        description: "a",
      });
    }, 1000);

    const time2 = setTimeout(() => {
      toast("b", {
        description: "b",
      });
    }, 30000);

    const time3 = setTimeout(() => {
      toast("c", {
        description: "c",
      });
    }, 60000);

    const time4 = setTimeout(() => {
      toast("d", {
        description: "d",
      });
    }, 90000);

    const time5 = setTimeout(() => {
      toast("e", {
        description: "e",
      });
    }, 120000);

    return () => {
      clearTimeout(time1),
        clearTimeout(time2),
        clearTimeout(time3),
        clearTimeout(time4),
        clearTimeout(time5);
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
