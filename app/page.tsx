import { Main } from "@/components/craft";
import Hero from "@/components/landing/hero";
import CTA from "@/components/landing/cta";
import Feature from "@/components/landing/feature";
import FAQ from "@/components/landing/faq";

export default function Page() {
  return (
    <div>
      <Main>
        <Hero />
        <CTA />
        <Feature />
        <FAQ />
      </Main>
    </div>
  );
}
