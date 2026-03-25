import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  Home,
  MapPin,
  TrendingUp,
  Users,
  Star,
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

export const revalidate = 86400;

// ---------------------------------------------------------------------------
// Static params — one page per neighborhood
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const neighborhoods = await loadNeighborhoods();
  return neighborhoods.map((n) => ({ neighborhood: n.slug }));
}

// ---------------------------------------------------------------------------
// SEO metadata — optimized for "[neighborhood] luxury real estate" queries
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ neighborhood: string }>;
}): Promise<Metadata> {
  const { neighborhood: slug } = await params;
  const neighborhood = await loadNeighborhoodBySlug(slug);
  if (!neighborhood) return { title: "Neighborhood Not Found | Tauro Realty" };

  const title = `${neighborhood.name} Luxury Real Estate | Homes for Sale | Tauro Realty Philadelphia`;
  const description = `Explore luxury real estate in ${neighborhood.name}, Philadelphia. Browse premium homes for sale, view market data, neighborhood insights, and connect with Tauro Realty's ${neighborhood.name} specialists.`;
  const canonicalUrl = `${siteUrl}/homes-for-sale-in-${neighborhood.slug}`;

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
          alt: `${neighborhood.name} luxury real estate — Philadelphia homes for sale`,
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
// Page component — SEO-focused location landing page
// ---------------------------------------------------------------------------

export default async function LocationLandingPage({
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

  const avgPrice =
    listings.length > 0
      ? listings.reduce((sum, p) => sum + p.price, 0) / listings.length
      : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${neighborhood.name} Luxury Real Estate — Homes for Sale`,
    description: `Browse luxury homes for sale in ${neighborhood.name}, Philadelphia. Premium listings, market data, and local expertise from Tauro Realty.`,
    url: `${siteUrl}/homes-for-sale-in-${neighborhood.slug}`,
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
      telephone: "+12158394172",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Philadelphia",
        addressRegion: "PA",
        addressCountry: "US",
      },
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
          { label: "Homes for Sale", href: "/properties" },
          {
            label: `${neighborhood.name} Real Estate`,
            href: `/homes-for-sale-in-${neighborhood.slug}`,
          },
        ]}
      />

      {/* Hero section */}
      <section className="relative min-h-[60vh] overflow-hidden pt-16">
        <Image
          src={neighborhood.image}
          alt={`${neighborhood.name} luxury real estate — Philadelphia homes for sale`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-midnight/60 to-midnight/30" />

        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            {neighborhood.name} Luxury Real Estate
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Homes for Sale in {neighborhood.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            {neighborhood.tagline}. Discover premium listings and market insights
            from Philadelphia&apos;s trusted luxury real estate brokerage.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-5 py-2.5 text-sm font-semibold text-gold backdrop-blur-sm">
              <Home className="size-4" />
              {listings.length}{" "}
              {listings.length === 1 ? "Active Listing" : "Active Listings"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm">
              <TrendingUp className="size-4" />
              Median: {neighborhood.stats.medianPrice}
            </span>
            {avgPrice > 0 && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm">
                <Star className="size-4" />
                Avg: ${Math.round(avgPrice / 1000)}K
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Schedule a Showing
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={`/neighborhoods/${neighborhood.slug}`}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:border-gold hover:text-gold"
            >
              Explore {neighborhood.name}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Property listings */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Available Properties
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {neighborhood.name} Luxury Homes for Sale
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse currently available luxury properties in {neighborhood.name}.
            Each listing is curated by our team of Philadelphia real estate
            specialists.
          </p>
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
                New luxury listings in {neighborhood.name} coming soon
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Be the first to know when premium properties become available in
                this sought-after neighborhood.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
              >
                Get Early Access
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why buy in this neighborhood */}
      <section className="border-t border-border/40 bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Why {neighborhood.name}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
                Why Buy Luxury Real Estate in {neighborhood.name}
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                {neighborhood.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Neighborhood Highlights
              </h3>
              <div className="mt-6 space-y-3">
                {neighborhood.sellingPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                    <p className="text-muted-foreground">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market stats */}
      <MarketStats
        stats={neighborhood.stats}
        neighborhoodName={neighborhood.name}
      />

      {/* Why Tauro */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Local Expertise
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            Your {neighborhood.name} Real Estate Specialists
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                <MapPin className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                Local Market Knowledge
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our agents live and breathe {neighborhood.name} real estate, with
                intimate knowledge of pricing trends, building histories, and
                off-market opportunities.
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                <Users className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                White-Glove Service
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                From private showings to negotiation strategy, our team provides
                premium concierge-level service at every step of your home
                purchase.
              </p>
            </div>
            <div className="rounded-xl border border-border/40 bg-card p-6">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                <TrendingUp className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                Proven Results
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Our track record in {neighborhood.name} speaks for itself —
                strategic pricing, expert negotiation, and closings that exceed
                our clients&apos; expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="border-t border-border/40 bg-foreground py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Start Your Search
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Find Your Dream Home in {neighborhood.name}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Whether you&apos;re seeking a historic townhome, a modern condo, or a
            luxury single-family residence, Tauro Realty has the {neighborhood.name}{" "}
            expertise to make it happen.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Contact a {neighborhood.name} Specialist
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Browse All Philadelphia Properties
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
