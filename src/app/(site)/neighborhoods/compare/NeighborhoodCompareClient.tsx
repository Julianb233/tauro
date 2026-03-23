"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Footprints,
  Train,
  Bike,
  GraduationCap,
  TrendingUp,
  Clock,
  Home,
  Utensils,
  TreePine,
  Music,
  Palette,
} from "lucide-react";
import { useNeighborhoodCompare } from "@/hooks/useNeighborhoodCompare";
import { neighborhoods as allNeighborhoods, type Neighborhood } from "@/data/neighborhoods";
import { cn } from "@/lib/utils";

type BestFn = (vals: (number | null)[]) => number | null;

const highest: BestFn = (vals) => {
  const nums = vals.filter((v): v is number => v !== null);
  return nums.length ? Math.max(...nums) : null;
};
const lowest: BestFn = (vals) => {
  const nums = vals.filter((v): v is number => v !== null);
  return nums.length ? Math.min(...nums) : null;
};

function parsePrice(s: string): number {
  return parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
}

function parsePercent(s: string): number {
  return parseFloat(s.replace(/[^0-9.\-+]/g, "")) || 0;
}

interface RowDef {
  label: string;
  icon: React.ReactNode;
  value: (n: Neighborhood) => string;
  raw: (n: Neighborhood) => number | null;
  best: BestFn;
}

const rows: RowDef[] = [
  {
    label: "Median Price",
    icon: <DollarSign className="size-4" />,
    value: (n) => n.stats.medianPrice,
    raw: (n) => parsePrice(n.stats.medianPrice),
    best: lowest,
  },
  {
    label: "Avg Price/sqft",
    icon: <Home className="size-4" />,
    value: (n) => n.stats.avgPricePerSqft,
    raw: (n) => parsePrice(n.stats.avgPricePerSqft),
    best: lowest,
  },
  {
    label: "Avg Days on Market",
    icon: <Clock className="size-4" />,
    value: (n) => `${n.stats.avgDaysOnMarket} days`,
    raw: (n) => n.stats.avgDaysOnMarket,
    best: lowest,
  },
  {
    label: "Active Listings",
    icon: <Home className="size-4" />,
    value: (n) => `${n.marketData.activeListings}`,
    raw: (n) => n.marketData.activeListings,
    best: highest,
  },
  {
    label: "12-Month Price Change",
    icon: <TrendingUp className="size-4" />,
    value: (n) => n.marketData.priceChange12m,
    raw: (n) => parsePercent(n.marketData.priceChange12m),
    best: highest,
  },
  {
    label: "Walk Score",
    icon: <Footprints className="size-4" />,
    value: (n) => `${n.walkScore}`,
    raw: (n) => n.walkScore,
    best: highest,
  },
  {
    label: "Transit Score",
    icon: <Train className="size-4" />,
    value: (n) => `${n.transitScore}`,
    raw: (n) => n.transitScore,
    best: highest,
  },
  {
    label: "Bike Score",
    icon: <Bike className="size-4" />,
    value: (n) => `${n.bikeScore}`,
    raw: (n) => n.bikeScore,
    best: highest,
  },
  {
    label: "Top School Rating",
    icon: <GraduationCap className="size-4" />,
    value: (n) => {
      const best = n.schools.reduce((max, s) => (s.rating > max ? s.rating : max), 0);
      return best > 0 ? `${best}/10` : "--";
    },
    raw: (n) => {
      const best = n.schools.reduce((max, s) => (s.rating > max ? s.rating : max), 0);
      return best > 0 ? best : null;
    },
    best: highest,
  },
  {
    label: "Number of Schools",
    icon: <GraduationCap className="size-4" />,
    value: (n) => `${n.schools.length}`,
    raw: (n) => n.schools.length,
    best: highest,
  },
  {
    label: "Inventory Level",
    icon: <Home className="size-4" />,
    value: (n) => n.stats.inventoryLevel,
    raw: () => null,
    best: () => null,
  },
];

function ScoreBar({ score, label }: { score: number; label: string }) {
  const color =
    score >= 70
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-amber-500"
        : "bg-red-400";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground">{score}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function NeighborhoodCompareClient() {
  const { ids, remove, clear } = useNeighborhoodCompare();

  const selected = ids
    .map((id) => allNeighborhoods.find((n) => n.id === id))
    .filter((n): n is Neighborhood => !!n);

  if (selected.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Compare Neighborhoods
        </h1>
        <p className="mt-4 text-muted-foreground">
          You haven&apos;t selected any neighborhoods to compare yet. Browse
          neighborhoods and tap the compare icon to get started.
        </p>
        <Link
          href="/neighborhoods"
          className="mt-6 inline-block rounded-lg bg-gold px-6 py-3 font-semibold text-near-black transition hover:bg-gold-light"
        >
          Browse Neighborhoods
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Compare Neighborhoods
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-sm text-muted-foreground underline underline-offset-2 transition hover:text-foreground"
          >
            Clear All
          </button>
          <Link
            href="/neighborhoods"
            className="rounded-lg border border-gold/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-gold/10"
          >
            + Add Neighborhood
          </Link>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-xl border border-border/60 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          {/* Header row with images */}
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-40 bg-white p-0" />
              {selected.map((n) => (
                <th key={n.id} className="p-4 align-top font-normal">
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[260px] overflow-hidden rounded-lg">
                    <Image
                      src={n.cardImage}
                      alt={n.name}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-gold" />
                        <span className="font-heading text-sm font-bold text-white">
                          {n.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {n.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Link
                      href={`/neighborhoods/${n.slug}`}
                      className="rounded-md bg-gold/90 px-3 py-1.5 text-xs font-semibold text-near-black transition hover:bg-gold"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(n.id)}
                      className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {rows.map((row, ri) => {
              const rawVals = selected.map((n) => row.raw(n));
              const bestVal = row.best(rawVals);

              return (
                <tr
                  key={row.label}
                  className={cn(ri % 2 === 0 ? "bg-muted/30" : "bg-white")}
                >
                  <td className="sticky left-0 z-10 whitespace-nowrap border-r border-border/40 bg-inherit px-4 py-3 font-medium text-foreground">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-gold">{row.icon}</span>
                      {row.label}
                    </span>
                  </td>
                  {selected.map((n, ci) => {
                    const raw = rawVals[ci];
                    const isBest =
                      bestVal !== null && raw !== null && raw === bestVal;
                    return (
                      <td
                        key={n.id}
                        className={cn(
                          "px-4 py-3 text-center",
                          isBest
                            ? "font-semibold text-gold-dark"
                            : "text-muted-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            isBest &&
                              "inline-block rounded-md bg-gold/15 px-2 py-0.5"
                          )}
                        >
                          {row.value(n)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Vibe comparison */}
      <div className="mt-10">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Neighborhood Vibe
        </h2>
        <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border border-border/40 bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {n.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {n.lifestyle.vibe}
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Utensils className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Dining:</span>{" "}
                    {n.lifestyle.dining}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <TreePine className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Parks:</span>{" "}
                    {n.lifestyle.parks}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Train className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Transit:</span>{" "}
                    {n.lifestyle.transit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score gauges comparison */}
      <div className="mt-10">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Walkability & Transit Scores
        </h2>
        <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border border-border/40 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                {n.name}
              </h3>
              <div className="space-y-3">
                <ScoreBar score={n.walkScore} label="Walk Score" />
                <ScoreBar score={n.transitScore} label="Transit Score" />
                <ScoreBar score={n.bikeScore} label="Bike Score" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schools comparison */}
      <div className="mt-10">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Schools
        </h2>
        <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border border-border/40 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                {n.name}
              </h3>
              <div className="space-y-3">
                {n.schools.map((school) => (
                  <div
                    key={school.name}
                    className="flex items-start justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {school.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {school.type} &middot; {school.grades} &middot;{" "}
                        {school.distance}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
                        school.rating >= 8
                          ? "bg-emerald-100 text-emerald-700"
                          : school.rating >= 6
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      )}
                    >
                      {school.rating}/10
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lifestyle info */}
      <div className="mt-10">
        <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
          Lifestyle & Culture
        </h2>
        <div className="mt-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
          {selected.map((n) => (
            <div
              key={n.id}
              className="rounded-xl border border-border/40 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                {n.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Utensils className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      Dining
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {n.lifestyleInfo.dining}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Music className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      Nightlife
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {n.lifestyleInfo.nightlife}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TreePine className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      Parks
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {n.lifestyleInfo.parks}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Palette className="mt-0.5 size-4 flex-shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                      Culture
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {n.lifestyleInfo.culture}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-xl bg-cream p-8 text-center">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Ready to Choose?
        </p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Find Your Perfect Philadelphia Neighborhood
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Connect with a Tauro agent who can help you find the right home in the
          neighborhood that fits your lifestyle.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
          >
            Contact an Agent
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
