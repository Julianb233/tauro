"use client";

import { Award, Star, Trophy, ThumbsUp } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";

/* ------------------------------------------------------------------ */
/*  Media Logos — simple SVG text treatments for "As Featured In"     */
/* ------------------------------------------------------------------ */

const mediaOutlets = [
  { name: "Philadelphia Inquirer", displayName: "Philadelphia Inquirer" },
  { name: "Forbes", displayName: "Forbes" },
  { name: "Architectural Digest", displayName: "Architectural Digest" },
  { name: "Philadelphia Magazine", displayName: "Philadelphia Magazine" },
  { name: "Curbed", displayName: "Curbed" },
  { name: "The Wall Street Journal", displayName: "Wall Street Journal" },
];

function MediaLogo({ displayName }: { displayName: string }) {
  // Determine font style per outlet for visual variety
  const isSerif = [
    "Philadelphia Inquirer",
    "Wall Street Journal",
    "Forbes",
  ].includes(displayName);

  return (
    <span
      className={`select-none whitespace-nowrap text-sm font-bold uppercase tracking-widest sm:text-base md:text-lg ${
        isSerif ? "font-heading" : "font-label"
      }`}
    >
      {displayName}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Awards data                                                       */
/* ------------------------------------------------------------------ */

const awards = [
  {
    icon: Trophy,
    title: "Top 1% Philadelphia Agents",
    subtitle: "National Association of Realtors",
  },
  {
    icon: Award,
    title: "#1 Luxury Brokerage 2025",
    subtitle: "Philadelphia Business Journal",
  },
  {
    icon: Star,
    title: "Best of Philly Real Estate",
    subtitle: "Philadelphia Magazine",
  },
  {
    icon: ThumbsUp,
    title: "5-Star Google Reviews",
    subtitle: "200+ Verified Reviews",
  },
];

/* ------------------------------------------------------------------ */
/*  Full Social Proof (homepage)                                      */
/* ------------------------------------------------------------------ */

export default function SocialProof() {
  return (
    <div>
      {/* As Featured In */}
      <AsSeenInStrip />

      {/* Awards & Recognition */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeInView direction="up">
            <div className="text-center">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
                Excellence Recognized
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
                Awards &amp; Recognition
              </h2>
            </div>
          </FadeInView>

          <StaggerReveal
            className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            stagger={0.1}
          >
            {awards.map((award) => (
              <div
                key={award.title}
                className="group rounded-xl border border-border/50 bg-white p-6 text-center shadow-sm transition-colors hover:border-gold/40"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <award.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {award.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {award.subtitle}
                </p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact "As Seen In" strip — reusable on About page, etc.        */
/* ------------------------------------------------------------------ */

export function AsSeenInStrip() {
  return (
    <section className="border-y border-border/30 bg-cream py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView direction="up">
          <p className="text-center font-label text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            As Featured In
          </p>
        </FadeInView>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12 md:gap-x-16">
          {mediaOutlets.map((outlet) => (
            <div
              key={outlet.name}
              className="text-foreground/40 grayscale transition-all duration-300 hover:text-gold hover:grayscale-0"
            >
              <MediaLogo displayName={outlet.displayName} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
