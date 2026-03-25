import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  DollarSign,
  Zap,
  GraduationCap,
  Users,
  Award,
  Heart,
  ArrowRight,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Join Tauro | Agent Opportunity",
  description:
    "Discover why top Philadelphia real estate agents choose Tauro. Industry-leading commissions, cutting-edge tools, mentorship, and an agent-first culture built for your success.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "$2.1B+", label: "Total Sales Volume" },
  { value: "150+", label: "Agents Strong" },
  { value: "98%", label: "Agent Retention Rate" },
  { value: "#1", label: "Fastest Growing in Philly" },
];

const benefits = [
  {
    icon: DollarSign,
    title: "Commission Structure",
    description:
      "Industry-leading splits that grow with your production. New agents start competitive, and top producers earn even more. Our transparent structure means no hidden fees, no desk fees, and no franchise fees eating into your hard-earned commissions.",
  },
  {
    icon: Zap,
    title: "Technology & Tools",
    description:
      "Full CRM suite, automated drip campaigns, AI-powered lead scoring, a professional website, and branded marketing materials — all included. You never pay out of pocket for the tools you need to close deals and grow your business.",
  },
  {
    icon: GraduationCap,
    title: "Training & Mentorship",
    description:
      "Weekly sales masterclasses, a new agent bootcamp, one-on-one mentorship with top producers, and annual conference attendance. Whether you are just starting out or a seasoned closer, we invest in continuous development at every level.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description:
      "Inbound leads from Tauro's premium web presence, targeted social media campaigns, and deep community partnerships keep your pipeline full. No cold calling required — though we encourage ambitious agents to prospect as well.",
  },
  {
    icon: Award,
    title: "Brand & Reputation",
    description:
      "Leverage a brand synonymous with luxury Philadelphia real estate. Professional marketing materials, branded signage, and a reputation that opens doors give you instant credibility in every listing presentation and buyer consultation.",
  },
  {
    icon: Heart,
    title: "Culture & Community",
    description:
      "An agent-first culture built on collaboration, not competition. Monthly team events, peer mastermind groups, and a leadership team genuinely invested in your growth create an environment where everyone wins together.",
  },
];

const testimonials = [
  {
    quote:
      "Switching to Tauro was the best career decision I've made. The support system here is unmatched.",
    name: "Sarah M.",
    role: "5-Year Agent",
  },
  {
    quote:
      "I doubled my production in my first year at Tauro. The leads and training made all the difference.",
    name: "James R.",
    role: "Top Producer",
  },
  {
    quote:
      "The culture here is genuinely collaborative. Other agents celebrate your wins with you.",
    name: "Maria L.",
    role: "Team Lead",
  },
];

const careerPaths = [
  {
    step: 1,
    title: "New Agent",
    description:
      "Hit the ground running with our intensive bootcamp, a dedicated mentor, and your first deals supported by the full Tauro team.",
  },
  {
    step: 2,
    title: "Producing Agent",
    description:
      "Grow your book of business with inbound leads, advanced marketing tools, and ongoing coaching to sharpen your skills.",
  },
  {
    step: 3,
    title: "Top Producer",
    description:
      "Unlock premium commission splits, leadership opportunities, and recognition as one of Philadelphia's elite agents.",
  },
  {
    step: 4,
    title: "Team Lead",
    description:
      "Build and lead your own team within Tauro. Recruit, mentor, and earn overrides while we handle operations and compliance.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function WhyJoinPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Why Join", href: "/why-join" }]} />
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Agent Opportunity
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Build Your Career With Philadelphia&apos;s Fastest-Growing Brokerage
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">
            At Tauro, we believe agents deserve more — better splits, better
            tools, and a culture that puts your growth first. Join a team where
            your ambition is matched by real support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Apply Now
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#benefits"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* ── By the Numbers ────────────────────────────────────── */}
      <section className="bg-foreground py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Numbers
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Tauro at a Glance
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/40 bg-white p-6 text-center"
              >
                <p className="font-heading text-3xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Deep Dive ────────────────────────────────── */}
      <section id="benefits" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Tauro Advantage
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What Sets Tauro Apart
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/40 bg-cream p-8 transition-all hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <item.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agent Testimonials ────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Real Stories
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What Our Agents Say
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border/40 bg-white p-6"
              >
                <p className="italic leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 font-semibold text-gold">
                  {t.name},{" "}
                  <span className="font-normal text-muted-foreground">
                    {t.role}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Paths ──────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Your Future
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Your Growth Path at Tauro
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {careerPaths.map((path) => (
              <div
                key={path.step}
                className="relative rounded-xl border border-border/40 bg-cream p-6"
              >
                <span className="font-heading text-4xl font-bold text-gold/20">
                  {String(path.step).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-bold text-foreground">
                  {path.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {path.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Ready to Elevate Your Real Estate Career?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join a brokerage that invests in your success from day one. Your next
            chapter starts here.
          </p>
          <div className="mt-8">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-base font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Apply Now
              <ArrowRight className="size-5" />
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
            <Phone className="size-4" />
            Or call us at (215) 839-4172 to learn more
          </p>
        </div>
      </section>
    </>
  );
}
