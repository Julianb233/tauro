import type { Metadata } from "next";
import { loadNeighborhoods } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import NeighborhoodGrid from "./NeighborhoodGrid";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Philadelphia Neighborhoods",
  description: "Explore 15 of Philadelphia's most desirable neighborhoods. Find homes, local insights, and market data with Tauro Real Estate.",
};

export default async function NeighborhoodsPage() {
  const neighborhoods = await loadNeighborhoods();
  return (
    <>
      <Breadcrumbs items={[{ label: "Neighborhoods", href: "/neighborhoods" }]} />
      <section className="relative bg-foreground pt-32 pb-16"><div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" /><div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">Explore Philadelphia</p><h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">Philadelphia Neighborhoods</h1><p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">From the tree-lined streets of Rittenhouse to the creative energy of Fishtown — discover what makes each neighborhood unique with Tauro&apos;s local expertise.</p></div></section>
      <NeighborhoodGrid neighborhoods={neighborhoods} />
      <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Find Your Fit</p><h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Find Your Philadelphia Neighborhood</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Not sure which neighborhood is right for you? Connect with a Tauro agent who can match your lifestyle to the perfect part of Philadelphia.</p><div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><a href="/contact" className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg">Contact an Agent</a><a href="/properties" className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black">Browse All Properties</a></div></div></section>
    </>
  );
}
