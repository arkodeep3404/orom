"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Balancer from "react-wrap-balancer";

import { Section, Container } from "@/components/craft";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "please enter a valid email address",
  }),
});

export function CTA() {
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

  return (
    <Section>
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="!my-0">
          Join the Waitlist and Be the First to Experience Orom!
        </h2>
        <p className="text-lg opacity-70 md:text-2xl">
          <Balancer>
            Sign up now to get exclusive early access and stay updated on our
            launch
          </Balancer>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 flex h-fit items-center justify-center gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="md:w-64"
                      placeholder="Your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Container>
    </Section>
  );
}

export default CTA;
