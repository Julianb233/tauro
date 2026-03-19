import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Home, TrendingUp, Users, Shield, Star } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import Hero from "@/components/hero";
import StatsBar from "@/components/stats-bar";
import FeaturedProperties from "@/components/featured-properties";
import NeighborhoodShowcase from "@/components/neighborhood-showcase";

export const metadata: Metadata = {
  title: "Tauro | Premium Philadelphia Real Estate",
  description:
    "Discover luxury homes in Philadelphia with Tauro. Browse premium properties, explore neighborhoods, and connect with top agents across Center City, Rittenhouse, Fishtown, and more.",
};

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

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeaturedProperties />
      <NeighborhoodShowcase />

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
              <TiltCard key={item.title} maxTilt={6}>
                <div className="group rounded-xl border border-border/40 bg-midnight p-6 transition-all hover:border-gold/30 hover:shadow-lg">
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
              </TiltCard>
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
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Luxury home interior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
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
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Modern home exterior"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
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
                  href="/sell"
                  className="shimmer-gold mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
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
