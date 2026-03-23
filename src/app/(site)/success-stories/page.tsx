import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Quote,
  Clock,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { successStories } from "@/data/success-stories";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Client Success Stories | Tauro Realty Philadelphia",
  description:
    "Real results from real clients. Explore detailed success stories from Tauro Realty — before & after transformations, timelines, and the agents who made it happen.",
};

export default function SuccessStoriesPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Success Stories", href: "/success-stories" }]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 h-px w-16 bg-gold/60" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Success Stories
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Real Results for Real Clients
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Every home has a story. Here are some of our favorites — detailed
            accounts of how Tauro agents delivered exceptional outcomes for
            buyers, sellers, and investors across Philadelphia.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <p className="font-heading text-2xl font-bold text-gold">
                {successStories.length}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                Featured Stories
              </p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-gold">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                Client Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stories List */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {successStories.map((story, idx) => (
              <article
                key={story.id}
                className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`grid lg:grid-cols-2 ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                >
                  {/* Image */}
                  <div
                    className={`relative aspect-[4/3] lg:aspect-auto ${idx % 2 === 1 ? "lg:col-start-2" : ""}`}
                  >
                    <Image
                      src={story.coverImage}
                      alt={`${story.clientName} — ${story.neighborhood}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-near-black backdrop-blur-sm">
                        {story.clientType}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                        <MapPin className="size-3" />
                        {story.neighborhood}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                      {story.clientName}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold text-foreground lg:text-3xl">
                      {story.outcome.headline}
                    </h2>

                    {/* Stats row */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {story.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-border/30 bg-cream p-3 text-center"
                        >
                          <p className="font-heading text-lg font-bold text-gold">
                            {stat.value}
                          </p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Timeline & Agent */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5 text-gold/60" />
                        {story.timeline}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="size-3.5 text-gold/60" />
                        Agent: {story.agentName}
                      </span>
                    </div>

                    {/* Pull quote */}
                    <div className="mt-6 rounded-xl border-l-4 border-gold/40 bg-cream/60 px-5 py-4">
                      <Quote className="mb-2 size-4 text-gold/40" />
                      <p className="text-sm italic leading-relaxed text-foreground/80">
                        &ldquo;{story.pullQuote.length > 200
                          ? story.pullQuote.slice(0, 200) + "..."
                          : story.pullQuote}&rdquo;
                      </p>
                      <p className="mt-2 text-xs font-semibold text-foreground">
                        — {story.clientName}
                      </p>
                    </div>

                    {/* Read more */}
                    <Link
                      href={`/success-stories/${story.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                    >
                      Read Full Story
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/40 bg-white p-12 text-center">
            <TrendingUp className="mx-auto mb-4 size-8 text-gold/60" />
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Ready to Write Your Success Story?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Whether you&apos;re buying your first home, selling an investment
              property, or relocating to Philadelphia, our agents are ready to
              deliver exceptional results.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 rounded-lg border border-border/40 px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                Meet Our Agents
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
