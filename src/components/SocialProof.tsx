"use client";

import { Award, Star, Trophy, ThumbsUp } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";

/* ------------------------------------------------------------------ */
/*  Press Mention Logos — inline SVGs styled after real mastheads      */
/* ------------------------------------------------------------------ */

interface MediaOutlet {
  name: string;
  displayName: string;
  logo: React.ReactNode;
}

const mediaOutlets: MediaOutlet[] = [
  {
    name: "Philadelphia Inquirer",
    displayName: "Philadelphia Inquirer",
    logo: (
      <svg viewBox="0 0 220 32" className="h-6 w-auto sm:h-7 md:h-8" aria-hidden="true">
        <text
          x="110"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="18"
          fontWeight="700"
          fontStyle="italic"
          letterSpacing="0.5"
          fill="currentColor"
        >
          The Philadelphia Inquirer
        </text>
      </svg>
    ),
  },
  {
    name: "Forbes",
    displayName: "Forbes",
    logo: (
      <svg viewBox="0 0 100 32" className="h-6 w-auto sm:h-7 md:h-8" aria-hidden="true">
        <text
          x="50"
          y="24"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="26"
          fontWeight="700"
          letterSpacing="2"
          fill="currentColor"
        >
          Forbes
        </text>
      </svg>
    ),
  },
  {
    name: "Architectural Digest",
    displayName: "Architectural Digest",
    logo: (
      <svg viewBox="0 0 50 36" className="h-6 w-auto sm:h-7 md:h-8" aria-hidden="true">
        <text
          x="25"
          y="16"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="10"
          fontWeight="300"
          letterSpacing="4"
          fill="currentColor"
        >
          AD
        </text>
        <line x1="6" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <text
          x="25"
          y="30"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="4.5"
          fontWeight="300"
          letterSpacing="2.5"
          fill="currentColor"
        >
          ARCHITECTURAL DIGEST
        </text>
      </svg>
    ),
  },
  {
    name: "Philadelphia Magazine",
    displayName: "Philadelphia Magazine",
    logo: (
      <svg viewBox="0 0 180 32" className="h-6 w-auto sm:h-7 md:h-8" aria-hidden="true">
        <text
          x="90"
          y="23"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="3"
          fill="currentColor"
        >
          PHILADELPHIA
        </text>
        <text
          x="90"
          y="31"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="6"
          fontWeight="400"
          letterSpacing="4"
          fill="currentColor"
        >
          MAGAZINE
        </text>
      </svg>
    ),
  },
  {
    name: "Curbed",
    displayName: "Curbed",
    logo: (
      <svg viewBox="0 0 100 32" className="h-6 w-auto sm:h-7 md:h-8" aria-hidden="true">
        <text
          x="50"
          y="24"
          textAnchor="middle"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="22"
          fontWeight="900"
          letterSpacing="1"
          fill="currentColor"
        >
          CURBED
        </text>
      </svg>
    ),
  },
  {
    name: "The Wall Street Journal",
    displayName: "Wall Street Journal",
    logo: (
      <svg viewBox="0 0 220 36" className="h-6 w-auto sm:h-7 md:h-8" aria-hidden="true">
        <text
          x="110"
          y="15"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="7"
          fontWeight="400"
          letterSpacing="5"
          fill="currentColor"
        >
          THE
        </text>
        <text
          x="110"
          y="28"
          textAnchor="middle"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="1"
          fill="currentColor"
        >
          WALL STREET JOURNAL
        </text>
        <line x1="20" y1="32" x2="200" y2="32" stroke="currentColor" strokeWidth="0.75" />
      </svg>
    ),
  },
];

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
    <section className="border-y border-border/30 bg-cream py-10 sm:py-14" aria-label="Press mentions">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView direction="up">
          <p className="text-center font-label text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            As Featured In
          </p>
        </FadeInView>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 md:gap-x-16">
          {mediaOutlets.map((outlet) => (
            <div
              key={outlet.name}
              className="text-foreground/30 transition-all duration-300 hover:text-gold"
              title={outlet.displayName}
            >
              <span className="sr-only">{outlet.displayName}</span>
              {outlet.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
