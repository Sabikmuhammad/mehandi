import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { FeaturedPortfolio } from "@/components/home/FeaturedPortfolio";
import { BridalFeature } from "@/components/home/BridalFeature";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { Social } from "@/components/home/Social";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedPortfolio />
      <BridalFeature />
      <Services />
      <Process />
      <Testimonials />
      <Social />
    </>
  );
}
