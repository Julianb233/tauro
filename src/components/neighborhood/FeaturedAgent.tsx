"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Phone, ArrowRight, Award, Home, Clock } from "lucide-react";
import { agents, type Agent } from "@/data/agents";

function getTopAgentForNeighborhood(neighborhoodName: string): Agent | null {
  const matched = agents.filter((agent) =>
    agent.neighborhoods.some(
      (n) => n.toLowerCase() === neighborhoodName.toLowerCase()
    )
  );
  if (matched.length === 0) return null;

  // Rank by: properties sold (primary), years experience (secondary)
  return matched.sort((a, b) => {
    if (b.stats.propertiesSold !== a.stats.propertiesSold) {
      return b.stats.propertiesSold - a.stats.propertiesSold;
    }
    return b.stats.yearsExperience - a.stats.yearsExperience;
  })[0];
}

export function FeaturedAgent({
  neighborhoodName,
}: {
  neighborhoodName: string;
}) {
  const agent = getTopAgentForNeighborhood(neighborhoodName);
  if (!agent) return null;

  // Get the first testimonial if available
  const testimonial = agent.testimonials?.[0];

  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Your Local Expert
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          {neighborhoodName}&rsquo;s Top Agent
        </h2>
        <p className="mt-2 text-muted-foreground">
          The highest-performing agent specializing in {neighborhoodName}.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm">
          <div className="grid md:grid-cols-5">
            {/* Agent Photo — left column */}
            <div className="relative md:col-span-2">
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full">
                <Image
                  src={agent.photo}
                  alt={agent.fullName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />

                {/* Featured badge */}
                <div className="absolute left-4 top-4 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-near-black shadow-md">
                    <Award className="size-3.5" />
                    Featured Agent
                  </span>
                </div>
              </div>
            </div>

            {/* Agent Info — right column */}
            <div className="flex flex-col justify-center p-6 md:col-span-3 md:p-10">
              <div>
                <h3 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {agent.fullName}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold">{agent.title}</p>
              </div>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                {agent.shortBio}
              </p>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-xl bg-cream p-3 text-center">
                  <Home className="mx-auto size-4 text-gold" />
                  <p className="mt-1 font-heading text-xl font-bold text-foreground">
                    {agent.stats.propertiesSold}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Homes Sold</p>
                </div>
                <div className="rounded-xl bg-cream p-3 text-center">
                  <Clock className="mx-auto size-4 text-gold" />
                  <p className="mt-1 font-heading text-xl font-bold text-foreground">
                    {agent.stats.yearsExperience}+
                  </p>
                  <p className="text-[11px] text-muted-foreground">Years Exp.</p>
                </div>
                <div className="rounded-xl bg-cream p-3 text-center">
                  <Star className="mx-auto size-4 text-gold" />
                  <p className="mt-1 font-heading text-xl font-bold text-foreground">
                    {agent.stats.totalVolume}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Total Volume</p>
                </div>
                <div className="rounded-xl bg-cream p-3 text-center">
                  <Award className="mx-auto size-4 text-gold" />
                  <p className="mt-1 font-heading text-xl font-bold text-foreground">
                    {agent.stats.avgDaysOnMarket}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Avg Days on Market</p>
                </div>
              </div>

              {/* Specialties */}
              <div className="mt-5 flex flex-wrap gap-2">
                {agent.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Testimonial */}
              {testimonial && (
                <blockquote className="mt-6 border-l-2 border-gold/40 pl-4">
                  <p className="text-sm italic leading-relaxed text-muted-foreground line-clamp-3">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="mt-2 flex items-center gap-1">
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-3 fill-gold text-gold"
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-muted-foreground">
                      — {testimonial.clientName}
                    </span>
                  </footer>
                </blockquote>
              )}

              {/* CTAs */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={`/agents/${agent.slug}`}
                  className="shimmer-gold inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
                >
                  View Full Profile
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
                >
                  <Phone className="size-4" />
                  {agent.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
