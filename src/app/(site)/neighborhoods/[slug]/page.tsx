import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Coffee, TrainFront, Trees, Sparkles, ArrowRight } from "lucide-react";
import { loadNeighborhoodBySlug, loadNeighborhoods } from "@/lib/data";
import { AreaHero } from "@/components/area-hero";
import { AreaListings } from "@/components/area-listings";
import NeighborhoodMap from "@/components/NeighborhoodMap";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/site-config";
import { MarketDataSection } from "@/components/neighborhood/MarketDataSection";
import { MarketTrendChart } from "@/components/neighborhood/MarketTrendChart";
import { ScoreGauges } from "@/components/neighborhood/ScoreGauges";
import { SchoolsSection } from "@/components/neighborhood/SchoolsSection";
import { LocalFavorites } from "@/components/neighborhood/LocalFavorites";
import { LifestyleSection } from "@/components/neighborhood/LifestyleSection";
import { NeighborhoodAgents } from "@/components/neighborhood/NeighborhoodAgents";
import { PhotoGallery } from "@/components/neighborhood/PhotoGallery";
import { VideoTour } from "@/components/neighborhood/VideoTour";

export const revalidate = 86400;

export async function generateStaticParams() {
  const neighborhoods = await loadNeighborhoods();
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const neighborhood = await loadNeighborhoodBySlug(slug);
  if (!neighborhood) return { title: "Neighborhood Not Found | Tauro" };
  const title = `${neighborhood.name} Homes for Sale`;
  const description = `Explore homes for sale in ${neighborhood.name}, Philadelphia. ${neighborhood.tagline} Browse listings, local insights, and market data with Tauro Real Estate.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/neighborhoods/${neighborhood.slug}`,
      images: [{ url: neighborhood.image, width: 1200, height: 630, alt: `${neighborhood.name}, Philadelphia` }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [neighborhood.image],
    },
  };
}

const lifestyleIcons = { vibe: Sparkles, dining: Coffee, transit: TrainFront, parks: Trees } as const;
const lifestyleLabels: Record<string, string> = { vibe: "Vibe", dining: "Dining", transit: "Transit", parks: "Parks & Outdoors" };

export default async function NeighborhoodDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const neighborhood = await loadNeighborhoodBySlug(slug);
  if (!neighborhood) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Neighborhoods", href: "/neighborhoods" },
          { label: neighborhood.name, href: `/neighborhoods/${neighborhood.slug}` },
        ]}
      />
      <AreaHero neighborhood={neighborhood} />

      {/* About */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">About the Neighborhood</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Living in {neighborhood.name}</h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              {neighborhood.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selling Points */}
      <section className="border-t border-border/40 bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Why {neighborhood.name}</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Selling Points</h2>
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

      {/* Original Lifestyle & Culture (vibe, dining, transit, parks) */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Local Life</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Lifestyle &amp; Culture</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {(Object.entries(neighborhood.lifestyle) as [keyof typeof lifestyleIcons, string][]).map(([key, value]) => {
              const Icon = lifestyleIcons[key];
              return (
                <div key={key} className="rounded-xl border border-border/40 bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                      <Icon className="size-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{lifestyleLabels[key]}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Data with CountUp */}
      <MarketDataSection
        marketData={neighborhood.marketData}
        neighborhoodName={neighborhood.name}
      />

      {/* Market Trend Chart */}
      <MarketTrendChart
        data={neighborhood.monthlyTrend}
        neighborhoodName={neighborhood.name}
      />

      {/* Walk / Transit / Bike Scores */}
      <ScoreGauges
        walkScore={neighborhood.walkScore}
        transitScore={neighborhood.transitScore}
        bikeScore={neighborhood.bikeScore}
      />

      {/* Schools */}
      <SchoolsSection
        schools={neighborhood.schools}
        neighborhoodName={neighborhood.name}
      />

      {/* Lifestyle Info (dining, nightlife, parks, culture) */}
      <LifestyleSection
        lifestyleInfo={neighborhood.lifestyleInfo}
        neighborhoodName={neighborhood.name}
      />

      {/* Local Favorites */}
      <LocalFavorites
        localSpots={neighborhood.localSpots}
        neighborhoodName={neighborhood.name}
      />

      {/* Agent Specialists */}
      <NeighborhoodAgents neighborhoodName={neighborhood.name} />

      {/* Photo Gallery */}
      <PhotoGallery
        images={neighborhood.gallery}
        neighborhoodName={neighborhood.name}
      />

      {/* Video Tour */}
      {neighborhood.videoTourUrl && (
        <VideoTour
          videoUrl={neighborhood.videoTourUrl}
          neighborhoodName={neighborhood.name}
        />
      )}

      {/* Listings */}
      <AreaListings neighborhoodName={neighborhood.name} propertyFilter={neighborhood.propertyFilter} />

      {/* Map */}
      <section className="border-t border-border/40 bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Location</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Explore {neighborhood.name}</h2>
          <div className="mt-8">
            <NeighborhoodMap name={neighborhood.name} center={neighborhood.mapCenter} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Ready to Explore?</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Interested in {neighborhood.name}?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Connect with a Tauro agent who specializes in {neighborhood.name} to find your perfect Philadelphia home.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact" className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg">
              Contact an Agent<ArrowRight className="size-4" />
            </Link>
            <Link href="/properties" className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black">
              Browse All Properties<ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
