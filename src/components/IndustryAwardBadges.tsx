import {
  Trophy,
  Award,
  Star,
  Shield,
  Medal,
  Gem,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";

interface AwardBadge {
  icon: LucideIcon;
  title: string;
  issuer: string;
  year: string;
}

const awardBadges: AwardBadge[] = [
  {
    icon: Trophy,
    title: "Top 1% Agents",
    issuer: "National Association of Realtors",
    year: "2025",
  },
  {
    icon: Award,
    title: "#1 Luxury Brokerage",
    issuer: "Philadelphia Business Journal",
    year: "2025",
  },
  {
    icon: Star,
    title: "Best of Philly",
    issuer: "Philadelphia Magazine",
    year: "2024",
  },
  {
    icon: Shield,
    title: "Five Star Professional",
    issuer: "Five Star Real Estate",
    year: "2025",
  },
  {
    icon: Medal,
    title: "Excellence in Marketing",
    issuer: "Luxury Portfolio International",
    year: "2024",
  },
  {
    icon: Gem,
    title: "Diamond Club",
    issuer: "Bright MLS",
    year: "2025",
  },
];

export default function IndustryAwardBadges() {
  return (
    <section className="bg-gradient-to-b from-card/50 to-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView direction="up">
          <div className="text-center">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
              Industry Recognition
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Awards &amp; Certifications
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Our commitment to excellence is recognized by the industry&apos;s
              most respected organizations.
            </p>
          </div>
        </FadeInView>

        <StaggerReveal
          className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3 lg:grid-cols-6"
          stagger={0.08}
        >
          {awardBadges.map((badge) => (
            <div
              key={badge.title}
              className="group flex flex-col items-center text-center"
            >
              {/* Badge medallion */}
              <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-gold/30 transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]" />
                {/* Inner ring */}
                <div className="absolute inset-2 rounded-full border border-gold/20 transition-colors duration-500 group-hover:border-gold/40" />
                {/* Background */}
                <div className="absolute inset-3 rounded-full bg-gold/5 transition-colors duration-500 group-hover:bg-gold/10" />
                {/* Icon */}
                <badge.icon
                  className="relative z-10 h-8 w-8 text-gold transition-transform duration-500 group-hover:scale-110 sm:h-9 sm:w-9"
                  strokeWidth={1.5}
                />
              </div>
              {/* Text */}
              <h3 className="mt-3 font-heading text-sm font-semibold text-foreground sm:text-base">
                {badge.title}
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-xs">
                {badge.issuer}
              </p>
              <span className="mt-1 font-label text-[10px] font-semibold uppercase tracking-wider text-gold/70">
                {badge.year}
              </span>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
