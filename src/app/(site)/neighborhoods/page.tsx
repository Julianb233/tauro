import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { loadNeighborhoods } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

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
      <section className="bg-cream py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{neighborhoods.map((hood) => (<Link key={hood.slug} href={`/neighborhoods/${hood.slug}`} className="group relative overflow-hidden rounded-xl border border-border/40 bg-card transition-all hover:border-gold/40 hover:shadow-xl hover:border-b-gold hover:border-b-2"><div className="relative aspect-[4/3] overflow-hidden"><Image src={hood.cardImage} alt={hood.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" placeholder="blur" blurDataURL={BLUR_LANDSCAPE} /><div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent" /></div><div className="absolute inset-x-0 bottom-0 p-5"><div className="flex items-center gap-2"><MapPin className="size-4 text-gold" /><h2 className="font-heading text-xl font-bold text-white">{hood.name}</h2></div><p className="mt-1 text-sm text-white/80">{hood.tagline}</p><span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">Median: {hood.stats.medianPrice}</span></div></Link>))}</div></div></section>
      <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"><p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Find Your Fit</p><h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Find Your Philadelphia Neighborhood</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Not sure which neighborhood is right for you? Connect with a Tauro agent who can match your lifestyle to the perfect part of Philadelphia.</p><div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"><Link href="/contact" className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg">Contact an Agent<ArrowRight className="size-4" /></Link><Link href="/properties" className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black">Browse All Properties<ArrowRight className="size-4" /></Link></div></div></section>
    </>
  );
}
