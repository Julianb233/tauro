import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import StatsBar from "@/components/stats-bar";
import FeaturedProperties from "@/components/featured-properties";
import NeighborhoodShowcase from "@/components/neighborhood-showcase";
import AreasWeServe from "@/components/areas-we-serve";
import WhyTauro from "@/components/why-tauro";
import VideoShowcase from "@/components/VideoShowcase";
import Testimonials from "@/components/testimonials";
import HomepageCTAs from "@/components/homepage-ctas";

// Client components — lazy-loaded to reduce initial JS bundle and improve INP
const RecentlyViewed = dynamic(() => import("@/components/RecentlyViewed"));
const SocialProof = dynamic(() => import("@/components/SocialProof"));
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
      <div className="gold-divider mx-auto max-w-7xl" />
      <NeighborhoodShowcase />
      <AreasWeServe />
      <WhyTauro />
      <VideoShowcase />
      <div className="gold-divider mx-auto max-w-7xl" />
      <Testimonials />
      <SocialProof />
      <div className="gold-divider mx-auto max-w-7xl" />
      <HomepageCTAs />
      <NewsletterCTA variant="homepage" />
    </>
  );
}
