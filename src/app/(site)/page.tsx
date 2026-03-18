import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, TrendingUp, Users, Shield, Star, MapPin } from "lucide-react";
import { properties, formatPrice } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import HeroSearchBar from "@/components/HeroSearchBar";

const neighborhoods = [
  {
    name: "Center City",
    slug: "center-city",
    description: "The beating heart of Philadelphia — walkable, vibrant, and full of culture.",
    image: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80",
    listings: 42,
  },
  {
    name: "Rittenhouse",
    slug: "rittenhouse",
    description: "Philadelphia's most prestigious address with tree-lined streets and luxury living.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    listings: 28,
  },
  {
    name: "Fishtown",
    slug: "fishtown",
    description: "Creative energy meets industrial charm in Philly's hottest neighborhood.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    listings: 35,
  },
  {
    name: "Northern Liberties",
    slug: "northern-liberties",
    description: "Urban sophistication with boutique restaurants and converted lofts.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    listings: 19,
  },
  {
    name: "Old City",
    slug: "old-city",
    description: "Where history meets modern living — cobblestone streets and gallery nights.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    listings: 15,
  },
  {
    name: "Chestnut Hill",
    slug: "chestnut-hill",
    description: "Suburban charm within city limits — gardens, boutiques, and top schools.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    listings: 22,
  },
];

const testimonials = [
  {
    quote: "Tauro made our first home purchase in Rittenhouse completely seamless. Their knowledge of the Philadelphia market is unmatched.",
    name: "Sarah & Michael Chen",
    role: "Homebuyers — Rittenhouse Square",
    rating: 5,
  },
  {
    quote: "We listed with three other brokerages before finding Tauro. They sold our Fishtown townhouse in 6 days, $40K over asking.",
    name: "David Okafor",
    role: "Seller — Fishtown",
    rating: 5,
  },
  {
    quote: "The level of service and market insight Tauro provides is on par with the best brokerages in New York. Philadelphia is lucky to have them.",
    name: "Maria & James Patterson",
    role: "Investors — Center City",
    rating: 5,
  },
];

const whyTauro = [
  {
    icon: Home,
    title: "Curated Portfolio",
    description: "We don't list everything — we list the right things. Every property is vetted for quality, value, and investment potential.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description: "Hyperlocal data across 15 Philadelphia neighborhoods. We know pricing trends before they hit the market.",
  },
  {
    icon: Users,
    title: "Concierge Service",
    description: "Dedicated agents who know your name, your goals, and your timeline. Not a call center — a partnership.",
  },
  {
    icon: Shield,
    title: "Proven Results",
    description: "98% client satisfaction, $2.1B in total volume, and a reputation built on delivering what we promise.",
  },
];

const featuredProperties = properties.slice(0, 3);

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
          alt="Philadelphia skyline"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 via-near-black/50 to-near-black" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Premium Philadelphia Real Estate
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Place
            <br />
            <span className="text-gold">in Philadelphia</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Discover luxury homes and condos across Philadelphia&apos;s most
            coveted neighborhoods with Tauro&apos;s expert agents.
          </p>

          {/* Search overlay */}
          <HeroSearchBar />

          {/* Scroll hint */}
          <div className="mt-16 animate-bounce">
            <div className="mx-auto h-8 w-5 rounded-full border-2 border-white/30">
              <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-gold" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="border-y border-border/40 bg-midnight">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "500+", label: "Properties Sold" },
            { value: "15", label: "Neighborhoods" },
            { value: "$2.1B", label: "Total Volume" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-gold sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Listings (HOME-02) ──────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Featured Listings
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
                Exceptional Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="group flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
            >
              View All Properties
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Neighborhoods (HOME-03) ──────────────────────────── */}
      <section className="border-t border-border/40 bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Explore Philadelphia
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Premier Neighborhoods
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              From the brownstones of Rittenhouse to the lofts of Fishtown — discover
              what makes each Philadelphia neighborhood unique.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {neighborhoods.map((hood) => (
              <Link
                key={hood.slug}
                href={`/neighborhoods/${hood.slug}`}
                className="group relative overflow-hidden rounded-xl border border-border/40 transition-all hover:border-gold/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={hood.image}
                    alt={hood.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold" />
                    <h3 className="font-heading text-lg font-bold text-white">
                      {hood.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-white/70">
                    {hood.description}
                  </p>
                  <p className="mt-2 text-xs font-semibold text-gold">
                    {hood.listings} Active Listings
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Tauro (HOME-04) ──────────────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Tauro Difference
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Why Philadelphia Trusts Tauro
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We&apos;re not the biggest brokerage in Philadelphia. We&apos;re the most intentional.
              Every client, every listing, every deal — handled with precision.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyTauro.map((item) => (
              <div
                key={item.title}
                className="card-tilt group rounded-xl border border-border/40 bg-midnight p-6 transition-all hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <item.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (HOME-05) ───────────────────────────── */}
      <section className="border-t border-border/40 bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Client Stories
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border border-border/40 bg-near-black p-6"
              >
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-gold text-gold"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-white/80">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-4 border-t border-border/40 pt-4">
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAs (HOME-06) ───────────────────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Buyer CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-border/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Luxury home interior"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-near-black/90 via-near-black/70 to-near-black/40" />
              <div className="relative z-10 p-8 sm:p-10">
                <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  For Buyers
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                  Find Your Dream Home
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                  Browse curated listings, explore neighborhoods, and let our agents
                  guide you to the perfect Philadelphia property.
                </p>
                <Link
                  href="/properties"
                  className="shimmer-gold mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
                >
                  Browse Properties
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Seller CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-border/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Modern home exterior"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-near-black/90 via-near-black/70 to-near-black/40" />
              <div className="relative z-10 p-8 sm:p-10">
                <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                  For Sellers
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                  List With Tauro
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                  Get a free home valuation, premium marketing, and an agent who
                  knows your neighborhood inside and out.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
                >
                  Get a Free Valuation
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
