import type { Metadata } from "next";
import Hero from "@/components/hero";
import StatsBar from "@/components/stats-bar";
import FeaturedProperties from "@/components/featured-properties";
import NeighborhoodShowcase from "@/components/neighborhood-showcase";
import WhyTauro from "@/components/why-tauro";
import Testimonials from "@/components/testimonials";
import SocialProof from "@/components/SocialProof";
import HomepageCTAs from "@/components/homepage-ctas";
import RecentlyViewed from "@/components/RecentlyViewed";
import { NewsletterCTA } from "@/components/NewsletterCTA";

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
      <div className="gold-divider mx-auto max-w-7xl" />
      <NeighborhoodShowcase />
      <WhyTauro />
      <div className="gold-divider mx-auto max-w-7xl" />
      <Testimonials />
      <SocialProof />
      <div className="gold-divider mx-auto max-w-7xl" />
      <HomepageCTAs />
      <NewsletterCTA variant="homepage" />
    </>
  );
}
