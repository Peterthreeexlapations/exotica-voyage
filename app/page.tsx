import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HomePillars from "@/components/HomePillars";
import FeaturedFleet from "@/components/FeaturedFleet";
import FeaturedYachts from "@/components/FeaturedYachts";
import FeaturedAircraft from "@/components/FeaturedAircraft";
import ConciergeTeaser from "@/components/ConciergeTeaser";
import PhilosophyBlock from "@/components/PhilosophyBlock";
import ClosingCTA from "@/components/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <HomePillars />
      <FeaturedFleet />
      <FeaturedYachts />
      <FeaturedAircraft />
      <ConciergeTeaser />
      <PhilosophyBlock />
      <ClosingCTA />
    </>
  );
}
