import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Home, DollarSign, Clock } from "lucide-react";
import { agents } from "@/data/agents";

// Pick the agent with the most properties sold as the spotlight
const featured = agents.reduce((top, agent) =>
  agent.stats.propertiesSold > top.stats.propertiesSold ? agent : top
);

export default function FeaturedAgentSpotlight() {
  return (
    <section className="py-16 sm:py-24" aria-label="Featured agent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Agent photo */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gold/20 shadow-2xl">
              <Image
                src={featured.photo}
                alt={featured.fullName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {featured.awards.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex flex-wrap gap-1.5">
                    {featured.awards.slice(0, 2).map((award) => (
                      <span
                        key={award.title}
                        className="inline-flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-near-black backdrop-blur-sm"
                      >
                        <Award className="size-3" />
                        {award.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Agent info */}
          <div>
            <p className="mb-2 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Meet Our Top Agent
            </p>
            <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {featured.fullName}
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {featured.title}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {featured.shortBio}
            </p>

            {/* Stats grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                <Home className="mx-auto size-5 text-gold" />
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">
                  {featured.stats.propertiesSold}
                </p>
                <p className="text-xs text-muted-foreground">Properties Sold</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                <DollarSign className="mx-auto size-5 text-gold" />
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">
                  {featured.stats.totalVolume}
                </p>
                <p className="text-xs text-muted-foreground">Total Volume</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                <Clock className="mx-auto size-5 text-gold" />
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">
                  {featured.stats.avgDaysOnMarket}
                </p>
                <p className="text-xs text-muted-foreground">Avg Days Listed</p>
              </div>
              <div className="rounded-xl border border-border/50 bg-card p-4 text-center">
                <Award className="mx-auto size-5 text-gold" />
                <p className="mt-2 font-heading text-2xl font-bold text-foreground">
                  {featured.stats.yearsExperience}+
                </p>
                <p className="text-xs text-muted-foreground">Years Experience</p>
              </div>
            </div>

            {/* Specialties */}
            <div className="mt-6 flex flex-wrap gap-2">
              {featured.specialties.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-xs font-medium text-gold"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/agents/${featured.slug}`}
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-all hover:bg-gold-light"
              >
                View Full Profile
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-label text-sm font-medium uppercase tracking-wider text-muted-foreground transition-all hover:border-gold hover:text-gold"
              >
                Meet All Agents
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
