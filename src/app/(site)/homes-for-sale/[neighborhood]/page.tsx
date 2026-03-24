import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Coffee,
  Home,
  MapPin,
  Sparkles,
  TrainFront,
  Trees,
} from "lucide-react";
import {
  loadNeighborhoods,
  loadNeighborhoodBySlug,
  loadProperties,
} from "@/lib/data";
import { siteUrl } from "@/lib/site-config";
import PropertyCard from "@/components/PropertyCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MarketStats } from "@/components/market-stats";
import { MlsDisclaimer } from "@/components/MlsDisclaimer";

export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Static params — one page per neighborhood
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const neighborhoods = await loadNeighborhoods();
  return neighborhoods.map((n) => ({ neighborhood: n.slug }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood: slug } = await params;
  const neighborhood = await loadNeighborhoodBySlug(slug);
  if (!neighborhood) return { title: "Neighborhood Not Found | Tauro Realty" };

  const title = `Luxury Homes for Sale in ${neighborhood.name} | Tauro Realty`;
  const description = `Browse luxury homes for sale in ${neighborhood.name}, Philadelphia. ${neighborhood.tagline}. View listings, neighborhood highlights, market stats, and more with Tauro Realty.`;
  const canonicalUrl = `${siteUrl}/homes-for-sale/${neighborhood.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Tauro Realty",
      images: [
        {
          url: neighborhood.image,
          width: 1200,
          height: 630,
          alt: `Luxury homes for sale in ${neighborhood.name}, Philadelphia`,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [neighborhood.image],
    },
  };
}

// ---------------------------------------------------------------------------
// Lifestyle icons / labels
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function HomesForSaleNeighborhoodPage({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}) {
  const { neighborhood: slug } = await params;
  const neighborhood = await loadNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  const allProperties = await loadProperties();
  const listings = allProperties.filter(
    (p) =>
      p.neighborhood.toLowerCase() ===
      neighborhood.propertyFilter.toLowerCase(),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `Luxury Homes for Sale in ${neighborhood.name}`,
    description: `Browse luxury homes for sale in ${neighborhood.name}, Philadelphia.`,
    url: `${siteUrl}/homes-for-sale/${neighborhood.slug}`,
    image: neighborhood.image,
    areaServed: {
      "@type": "Place",
      name: `${neighborhood.name}, Philadelphia, PA`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: neighborhood.mapCenter.lat,
        longitude: neighborhood.mapCenter.lng,
      },
    },
    provider: {
      "@type": "RealEstateAgent",
      name: "Tauro Realty",
      url: siteUrl,
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Homes for Sale", href: "/homes-for-sale" },
          {
            label: neighborhood.name,
            href: `/homes-for-sale/${neighborhood.slug}`,
          },
        ]}
      />

      {/* Hero section */}
      <section className="relative min-h-[55vh] overflow-hidden pt-16">
        <Image
          src={neighborhood.image}
          alt={`Luxury homes for sale in ${neighborhood.name}, Philadelphia`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/50 to-midnight/20" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-end px-4 pb-14 sm:px-6 lg:px-8">
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
            Luxury Homes for Sale in {neighborhood.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            {neighborhood.tagline}. Discover available listings, neighborhood
            highlights, and market data curated by Tauro Realty.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 text-sm font-semibold text-gold backdrop-blur-sm">
              <Home className="size-4" />
              {listings.length}{" "}
              {listings.length === 1 ? "Listing" : "Listings"} Available
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm">
              <MapPin className="size-4" />
              Median: {neighborhood.stats.medianPrice}
            </span>
          </div>
        </div>
      </section>

      {/* Property listings */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Available Listings
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Homes for Sale in {neighborhood.name}
          </h2>
          {listings.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((property) => (
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
                Contact us to be the first to know when luxury properties become
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

      {/* Neighborhood description */}
      <section className="border-t border-border/40 bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              About the Neighborhood
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
              Living in {neighborhood.name}
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
              {neighborhood.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selling points */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Why {neighborhood.name}
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Neighborhood Highlights
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

      {/* Lifestyle & culture */}
      <section className="border-t border-border/40 bg-cream py-16">
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

      {/* Market stats */}
      <MarketStats
        stats={neighborhood.stats}
        neighborhoodName={neighborhood.name}
      />

      {/* MLS/IDX Disclaimer */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MlsDisclaimer compact />
      </div>

      {/* CTA section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Ready to Find Your Home?
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Explore Luxury Living in {neighborhood.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Connect with a Tauro Realty agent who specializes in{" "}
            {neighborhood.name} to find your perfect luxury home in
            Philadelphia.
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
