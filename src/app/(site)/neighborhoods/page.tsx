import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { neighborhoods } from "@/data/neighborhoods";

export const metadata: Metadata = {
  title: "Philadelphia Neighborhoods | Tauro",
  description:
    "Explore 15 of Philadelphia's most desirable neighborhoods. Find homes, local insights, and market data with Tauro Real Estate.",
};

export default function NeighborhoodsPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-near-black pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-near-black via-midnight to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Explore Philadelphia
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Philadelphia Neighborhoods
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From the tree-lined streets of Rittenhouse to the creative energy of
            Fishtown — discover what makes each neighborhood unique with
            Tauro&apos;s local expertise.
          </p>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-gold/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hood.cardImage}
                    alt={hood.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/30 to-transparent" />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold" />
                    <h2 className="font-heading text-lg font-bold text-white">
                      {hood.name}
                    </h2>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{hood.tagline}</p>
                  <p className="mt-2 inline-block rounded-md bg-gold/10 px-2 py-0.5 text-xs font-semibold text-gold">
                    Median: {hood.stats.medianPrice}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
