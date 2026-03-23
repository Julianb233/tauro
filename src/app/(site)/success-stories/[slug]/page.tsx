import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Clock,
  MapPin,
  Users,
  CheckCircle,
} from "lucide-react";
import {
  successStories,
  getSuccessStoryBySlug,
} from "@/data/success-stories";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return successStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = getSuccessStoryBySlug(slug);
  if (!story) return {};
  return {
    title: `${story.clientName}: ${story.outcome.headline} | Tauro Realty`,
    description: story.scenario.slice(0, 160),
  };
}

export default async function SuccessStoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getSuccessStoryBySlug(slug);
  if (!story) notFound();

  const storyIdx = successStories.findIndex((s) => s.slug === slug);
  const nextStory = successStories[(storyIdx + 1) % successStories.length];

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Success Stories", href: "/success-stories" },
          { label: story.clientName, href: `/success-stories/${story.slug}` },
        ]}
      />

      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-foreground">
        <Image
          src={story.coverImage}
          alt={`${story.clientName} — ${story.neighborhood}`}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 pb-12 pt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/success-stories"
              className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
            >
              <ArrowLeft className="size-4" />
              All Success Stories
            </Link>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-near-black">
                {story.clientType}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                <MapPin className="size-3" />
                {story.neighborhood}
              </span>
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {story.outcome.headline}
            </h1>
            <p className="mt-2 text-sm text-white/50">
              {story.clientName}
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border/40 bg-foreground py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {story.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main story */}
            <div className="lg:col-span-2 space-y-10">
              {/* Scenario */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  The Situation
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/80">
                  {story.scenario}
                </p>
              </div>

              {/* What we delivered */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  What We Delivered
                </h2>
                <ul className="mt-4 space-y-3">
                  {story.outcome.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-foreground/80"
                    >
                      <CheckCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full story */}
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  The Full Story
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-foreground/80">
                  {story.fullStory.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pull quote card */}
              <div className="rounded-2xl border border-gold/20 bg-foreground p-6 shadow-lg">
                <Quote className="mb-3 size-6 text-gold/40" />
                <blockquote className="text-sm italic leading-relaxed text-white/80">
                  &ldquo;{story.pullQuote}&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-semibold text-gold">
                  — {story.clientName}
                </p>
              </div>

              {/* Details card */}
              <div className="rounded-2xl border border-border/40 bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Details
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-gold/60" />
                    <dt className="text-muted-foreground">Agent:</dt>
                    <dd className="font-semibold text-foreground">
                      {story.agentName}
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold/60" />
                    <dt className="text-muted-foreground">Neighborhood:</dt>
                    <dd className="font-semibold text-foreground">
                      {story.neighborhood}
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-gold/60" />
                    <dt className="text-muted-foreground">Timeline:</dt>
                    <dd className="font-semibold text-foreground">
                      {story.timeline}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-border/40 bg-white p-6 text-center">
                <p className="text-sm font-semibold text-foreground">
                  Want results like these?
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                >
                  Contact Us
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next story */}
      {nextStory && nextStory.slug !== story.slug && (
        <section className="border-t border-border/40 bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Next Story
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">
              {nextStory.outcome.headline}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {nextStory.clientName} &middot; {nextStory.neighborhood}
            </p>
            <Link
              href={`/success-stories/${nextStory.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
            >
              Read Story
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
