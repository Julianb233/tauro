import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CheckCircle,
  Coffee,
  TrainFront,
  Trees,
  Sparkles,
  DollarSign,
  TrendingUp,
  Clock,
  BarChart3,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  neighborhoods,
  getNeighborhoodBySlug,
} from "@/data/neighborhoods";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

/* ── SSG ─────────────────────────────────────────────────── */

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) return { title: "Neighborhood Not Found | Tauro" };
  return {
    title: `${neighborhood.name} Homes for Sale | Tauro`,
    description: `Explore homes for sale in ${neighborhood.name}, Philadelphia. ${neighborhood.tagline} Browse listings, local insights, and market data with Tauro Real Estate.`,
  };
}

/* ── Page ────────────────────────────────────────────────── */

const lifestyleIcons = {
  vibe: Sparkles,
  dining: Coffee,
  transit: TrainFront,
  parks: Trees,
} as const;

const lifestyleLabels: Record<string, string> = {
  vibe: "Vibe",
  dining: "Dining",
  transit: "Transit",
  parks: "Parks & Outdoors",
};

const statConfig = [
  { key: "medianPrice" as const, label: "Median Price", icon: DollarSign },
  { key: "avgPricePerSqft" as const, label: "Avg $/Sqft", icon: TrendingUp },
  {
    key: "avgDaysOnMarket" as const,
    label: "Avg Days on Market",
    icon: Clock,
  },
  {
    key: "inventoryLevel" as const,
    label: "Inventory Level",
    icon: BarChart3,
  },
];

export default async function NeighborhoodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const neighborhoodProperties = properties.filter(
    (p) => p.neighborhood === neighborhood.propertyFilter
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] overflow-hidden pt-16">
        <Image
          src={neighborhood.image}
          alt={neighborhood.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/60 to-near-black/30" />

        <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <ChevronRight className="size-3" />
            <Link
              href="/neighborhoods"
              className="transition-colors hover:text-gold"
            >
              Neighborhoods
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-gold">{neighborhood.name}</span>
          </nav>

          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {neighborhood.name}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/70">
            {neighborhood.tagline}
          </p>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────── */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              About the Neighborhood
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Living in {neighborhood.name}
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {neighborhood.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Selling Points ───────────────────────────────── */}
      <section className="border-t border-border/40 bg-midnight py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Why {neighborhood.name}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Selling Points
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {neighborhood.sellingPoints.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                <p className="text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lifestyle ────────────────────────────────────── */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Local Life
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Lifestyle &amp; Culture
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {(
              Object.entries(neighborhood.lifestyle) as [
                keyof typeof lifestyleIcons,
                string,
              ][]
            ).map(([key, value]) => {
              const Icon = lifestyleIcons[key];
              return (
                <div
                  key={key}
                  className="rounded-xl border border-border/40 bg-card p-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                      <Icon className="size-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {lifestyleLabels[key]}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Market Stats ─────────────────────────────────── */}
      <section className="border-t border-border/40 bg-midnight py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Market Data
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {neighborhood.name} by the Numbers
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statConfig.map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                className="rounded-xl border border-border bg-card p-6 text-center"
              >
                <Icon className="mx-auto size-6 text-muted-foreground" />
                <p className="mt-3 font-heading text-2xl font-bold text-gold">
                  {neighborhood.stats[key]}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Properties ───────────────────────────────────── */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Available Listings
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Properties in {neighborhood.name}
          </h2>

          {neighborhoodProperties.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {neighborhoodProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-border/40 bg-card p-10 text-center">
              <MapPin className="mx-auto size-10 text-gold/40" />
              <p className="mt-4 font-heading text-lg font-bold text-foreground">
                New listings in {neighborhood.name} coming soon.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Contact us to be the first to know when properties become
                available in this neighborhood.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
              >
                Get Notified
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Map Placeholder ──────────────────────────────── */}
      <section className="border-t border-border/40 bg-midnight py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-card">
            <div className="text-center">
              <MapPin className="mx-auto size-12 text-gold/30" />
              <p className="mt-4 font-heading text-lg font-bold text-foreground">
                Map of {neighborhood.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Interactive map coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Ready to Explore?
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Interested in {neighborhood.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Connect with a Tauro agent who specializes in{" "}
            {neighborhood.name} to find your perfect Philadelphia home.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Contact an Agent
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Browse All Properties
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
