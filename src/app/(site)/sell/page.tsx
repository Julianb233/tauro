"use client";

import Image from "next/image";
import { Home, TrendingUp, Shield, Star, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SellerInquiryForm } from "@/components/seller-inquiry-form";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

const whySell = [
  {
    icon: Home,
    title: "Expert Pricing",
    description:
      "Data-driven pricing strategy to maximize your return",
  },
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description:
      "Comprehensive neighborhood and market insights",
  },
  {
    icon: Shield,
    title: "Premium Marketing",
    description:
      "Professional photography, staging, and targeted campaigns",
  },
  {
    icon: Star,
    title: "Dedicated Agent",
    description:
      "Your personal Tauro agent from listing to close",
  },
];

const steps = [
  {
    number: "1",
    title: "Submit Your Details",
    description: "Tell us about your home and timeline",
  },
  {
    number: "2",
    title: "Receive Your Analysis",
    description: "Get a personalized market analysis within 24 hours",
  },
  {
    number: "3",
    title: "Meet Your Agent",
    description: "Connect with a Tauro specialist for your neighborhood",
  },
];

export default function SellPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Sell Your Home", href: "/sell" }]} />
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury home"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_LANDSCAPE}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Sell with Confidence
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">
            List Your Home <em>with Tauro</em>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Get the most from your Philadelphia property with Tauro&apos;s premium
            marketing, expert pricing, and dedicated agent support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#valuation-form"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Get Free Valuation
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Talk to an Agent
            </a>
          </div>
        </div>
      </section>

      {/* ── Value Proposition ───────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whySell.map((item) => (
              <div
                key={item.title}
                className="group glass-panel rounded-xl p-6"
              >
                <div className="flex size-12 items-center justify-center rounded-lg border border-gold/20 bg-gold/5 transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
                  <item.icon className="size-6 text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
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

      {/* ── Valuation Form ────────────────────────────────────── */}
      <section id="valuation-form" className="bg-cream py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-xl p-8">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Request Your Free Home Valuation
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
                Fill out the form below and a Tauro agent will provide a
                personalized market analysis within 24 hours — no obligation.
              </p>
            </div>
            <SellerInquiryForm />
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Simple Process
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Connector line (hidden on mobile, visible on lg between items) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-7 hidden h-px w-full bg-gradient-to-r from-gold/40 to-gold/10 lg:block" />
                )}
                <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-gold text-lg font-bold text-near-black shadow-lg shadow-gold/25">
                  {step.number}
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Take the first step toward selling your home with Philadelphia&apos;s
            most trusted real estate team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#valuation-form"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Get Your Free Valuation
              <ArrowRight className="size-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
