"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, GitCompareArrows } from "lucide-react";
import { useNeighborhoodCompare } from "@/hooks/useNeighborhoodCompare";
import type { Neighborhood } from "@/data/neighborhoods";
import { cn } from "@/lib/utils";

export default function NeighborhoodGrid({
  neighborhoods,
}: {
  neighborhoods: Neighborhood[];
}) {
  const { toggle, isComparing, count } = useNeighborhoodCompare();

  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {count > 0 ? (
              <>
                <span className="font-semibold text-gold">{count}</span>{" "}
                neighborhood{count !== 1 ? "s" : ""} selected for comparison
              </>
            ) : (
              "Select 2-3 neighborhoods to compare them side by side"
            )}
          </p>
          {count >= 2 && (
            <Link
              href="/neighborhoods/compare"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black transition hover:bg-gold-light"
            >
              <GitCompareArrows className="size-4" />
              Compare ({count})
            </Link>
          )}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((hood) => {
            const comparing = isComparing(hood.id);
            return (
              <div
                key={hood.slug}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-xl",
                  comparing
                    ? "border-gold border-2 shadow-lg"
                    : "border-border/40 hover:border-gold/40 hover:border-b-gold hover:border-b-2"
                )}
              >
                <Link href={`/neighborhoods/${hood.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={hood.cardImage}
                      alt={hood.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-gold" />
                      <h2 className="font-heading text-xl font-bold text-white">
                        {hood.name}
                      </h2>
                    </div>
                    <p className="mt-1 text-sm text-white/80">{hood.tagline}</p>
                    <span className="mt-2 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                      Median: {hood.stats.medianPrice}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(hood.id);
                  }}
                  aria-label={
                    comparing
                      ? `Remove ${hood.name} from comparison`
                      : `Add ${hood.name} to comparison`
                  }
                  className={cn(
                    "absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm transition-all",
                    comparing
                      ? "bg-gold text-near-black"
                      : "bg-near-black/60 text-white hover:bg-gold hover:text-near-black",
                    !comparing && count >= 3 && "pointer-events-none opacity-40"
                  )}
                >
                  <GitCompareArrows className="size-3.5" />
                  {comparing ? "Selected" : "Compare"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
