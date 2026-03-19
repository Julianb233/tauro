import type { Metadata } from "next";
import Hero from "@/components/hero";
import StatsBar from "@/components/stats-bar";
import FeaturedProperties from "@/components/featured-properties";
import NeighborhoodShowcase from "@/components/neighborhood-showcase";
import WhyTauro from "@/components/why-tauro";
import Testimonials from "@/components/testimonials";
import HomepageCTAs from "@/components/homepage-ctas";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Premium Philadelphia Real Estate",
  description: "Discover luxury homes in Philadelphia with Tauro. Browse premium properties, explore neighborhoods, and connect with top agents across Center City, Rittenhouse, Fishtown, and more.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedProperties />
      <NeighborhoodShowcase />
      <WhyTauro />
      <Testimonials />
      <HomepageCTAs />
    </>
  );
}
