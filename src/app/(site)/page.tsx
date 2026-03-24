import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import StatsBar from "@/components/stats-bar";
import FeaturedProperties from "@/components/featured-properties";
import NeighborhoodShowcase from "@/components/neighborhood-showcase";
import WhyTauro from "@/components/why-tauro";
import Testimonials from "@/components/testimonials";
import HomepageCTAs from "@/components/homepage-ctas";

// Client components — lazy-loaded to reduce initial JS bundle and improve INP
const RecentlyViewed = dynamic(() => import("@/components/RecentlyViewed"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
const GoldDivider = dynamic(
  () => import("@/components/animations/GoldDivider"),
);
const NewsletterCTA = dynamic(
  () =>
    import("@/components/NewsletterCTA").then((mod) => ({
      default: mod.NewsletterCTA,
    })),
);

export const metadata: Metadata = {
  title: "Premium Philadelphia Real Estate",
  description:
    "Discover luxury homes in Philadelphia with Tauro. Browse premium properties, explore neighborhoods, and connect with top agents across Center City, Rittenhouse, Fishtown, and more.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedProperties />
      <RecentlyViewed />
      <GoldDivider />
      <NeighborhoodShowcase />
      <WhyTauro />
      <GoldDivider delay={0.1} />
      <Testimonials />
      <SocialProof />
      <GoldDivider delay={0.2} />
      <HomepageCTAs />
      <NewsletterCTA variant="homepage" />
    </>
  );
}
