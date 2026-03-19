"use client";

import { ProposalScope } from "@/components/proposal-scope";
import { OnboardingSteps } from "@/components/onboarding-steps";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PAYMENT_URL =
  "https://www.fanbasis.com/agency-checkout/Aiacrobatics/TAURO";
const CONTACT_EMAIL = "julian@aiacrobatics.com";
const CONTACT_PHONE = "619-848-0945";

/* ------------------------------------------------------------------ */
/*  Timeline data                                                      */
/* ------------------------------------------------------------------ */

const timelinePhases = [
  {
    week: "Week 1",
    title: "Discovery and Design",
    items: [
      "Brand audit and asset collection",
      "Sitemap and wireframe approval",
      "Design system finalization",
      "GHL account setup and configuration",
    ],
  },
  {
    week: "Week 2",
    title: "Website Build",
    items: [
      "Homepage and core page development",
      "Property listing system",
      "Neighborhood pages",
      "Mobile optimization and testing",
    ],
  },
  {
    week: "Week 3",
    title: "CRM and Automations",
    items: [
      "Pipeline and contact setup",
      "Email/SMS sequence builds",
      "Form integrations and webhooks",
      "Booking calendar configuration",
    ],
  },
  {
    week: "Week 4",
    title: "Launch and Handoff",
    items: [
      "QA testing across devices",
      "SEO audit and structured data",
      "Domain connection and go-live",
      "Team training and documentation",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ---- Floating Nav ---- */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="font-heading text-xl font-bold tracking-wide text-gold">
            TAURO
          </span>
          <div className="hidden gap-6 text-sm text-muted-foreground md:flex">
            <a href="#scope" className="transition-colors hover:text-gold">
              Scope
            </a>
            <a href="#timeline" className="transition-colors hover:text-gold">
              Timeline
            </a>
            <a href="#investment" className="transition-colors hover:text-gold">
              Investment
            </a>
            <a href="#onboarding" className="transition-colors hover:text-gold">
              Onboarding
            </a>
          </div>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-md hover:shadow-gold/20"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* ---- Hero ---- */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-gold/3 blur-3xl" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.2em] text-gold uppercase">
            Prepared for LYL Realty Group
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">
            Your Digital Presence,{" "}
            <span className="text-gold">Elevated</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            A premium website, CRM system, and marketing engine built to
            position Tauro as Philadelphia&apos;s most recognizable luxury
            brokerage.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gold px-8 py-3 text-base font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
            >
              Accept Proposal
            </a>
            <a
              href="#scope"
              className="rounded-lg border border-border px-8 py-3 text-base font-semibold text-foreground transition-colors hover:border-gold/40 hover:text-gold"
            >
              View Details
            </a>
          </div>
        </div>
      </section>

      {/* ---- Stats Bar ---- */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            { value: "8+", label: "Custom Pages" },
            { value: "15", label: "Neighborhood Pages" },
            { value: "5", label: "Automated Workflows" },
            { value: "4 Weeks", label: "Build Timeline" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center px-6 py-8"
            >
              <span className="font-heading text-3xl font-bold text-gold">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Scope (extracted component) ---- */}
      <ProposalScope />

      {/* ---- Divider ---- */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* ---- Timeline ---- */}
      <section
        id="timeline"
        className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
      >
        <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">
          Build Timeline
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
          From Kickoff to Launch in 4 Weeks
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A structured, milestone-driven process with weekly check-ins and live
          previews.
        </p>

        <div className="relative mt-12">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {timelinePhases.map((phase, i) => (
              <div
                key={phase.week}
                className={`relative flex flex-col gap-4 pl-12 md:flex-row md:gap-12 md:pl-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Dot */}
                <div className="absolute top-1 left-2 h-5 w-5 rounded-full border-2 border-gold bg-background md:left-1/2 md:-translate-x-1/2" />

                {/* Content */}
                <div
                  className={`flex-1 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}
                >
                  <span className="inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                    {phase.week}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold">
                    {phase.title}
                  </h3>
                  <ul
                    className={`mt-3 space-y-1.5 text-sm text-muted-foreground ${i % 2 === 0 ? "md:ml-auto" : ""}`}
                  >
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-gold">&#8226;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Divider ---- */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* ---- Investment ---- */}
      <section
        id="investment"
        className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
      >
        <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">
          Investment
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
          Your Investment
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          A complete digital transformation for your brokerage, built to
          generate leads and close deals from day one.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Standard pricing */}
          <div className="rounded-xl border border-border bg-card p-8">
            <p className="text-sm font-medium text-muted-foreground">
              Industry Standard
            </p>
            <p className="mt-2 font-heading text-4xl font-bold text-muted-foreground/60 line-through">
              $9,997
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Typical cost for a custom real estate website, CRM setup,
              automation suite, and 15 SEO-optimized landing pages.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span>&#10003;</span> Custom website
              </li>
              <li className="flex items-center gap-2">
                <span>&#10003;</span> CRM setup
              </li>
              <li className="flex items-center gap-2">
                <span>&#10003;</span> Basic automations
              </li>
            </ul>
          </div>

          {/* Action pricing */}
          <div className="relative rounded-xl border-2 border-gold bg-card p-8 shadow-lg shadow-gold/5">
            <div className="absolute -top-3 right-6 rounded-full bg-gold px-4 py-1 text-xs font-bold text-near-black">
              YOUR PRICE
            </div>
            <p className="text-sm font-medium text-gold">
              Tauro Build Package
            </p>
            <p className="mt-2 font-heading text-5xl font-bold text-foreground">
              $5,500
            </p>
            <p className="mt-1 text-sm font-semibold text-gold">
              deposit to start
            </p>
            <div className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-3">
              <p className="text-sm text-foreground">
                Then{" "}
                <span className="font-heading text-xl font-bold text-gold">
                  $977
                </span>
                <span className="text-muted-foreground">/month</span> ongoing
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                CRM hosting, automation management, SEO monitoring, and priority
                support
              </p>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <span className="text-gold">&#10003;</span> Custom premium
                website (8+ pages)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">&#10003;</span> 15 neighborhood
                landing pages
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">&#10003;</span> GoHighLevel CRM
                setup
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">&#10003;</span> 5 automated
                workflows
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">&#10003;</span> SEO foundation and
                structured data
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">&#10003;</span> 30 days post-launch
                support
              </li>
            </ul>
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full rounded-lg bg-gold py-3 text-center text-base font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-md hover:shadow-gold/20"
            >
              Pay $5,500 Deposit
            </a>
          </div>
        </div>

        {/* Payment options */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              label: "Deposit",
              detail: "$5,500",
              note: "One-time. Build starts within 48 hours.",
            },
            {
              label: "Monthly",
              detail: "$977/mo",
              note: "Ongoing after launch. CRM, automations, support.",
            },
            {
              label: "Total Year 1",
              detail: "$17,224",
              note: "$5,500 deposit + 12 months at $977/mo.",
            },
          ].map((opt) => (
            <div
              key={opt.label}
              className="rounded-lg border border-border bg-card/50 p-5 text-center"
            >
              <p className="text-xs font-semibold tracking-wider text-gold uppercase">
                {opt.label}
              </p>
              <p className="mt-1 font-heading text-2xl font-bold">
                {opt.detail}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{opt.note}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Ongoing: $977/month after launch for CRM hosting, automation
          management, and priority support.
        </p>
      </section>

      {/* ---- Divider ---- */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* ---- Onboarding (extracted component) ---- */}
      <OnboardingSteps />

      {/* ---- Divider ---- */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      {/* ---- After Launch ---- */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">
          After Launch
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
          Ongoing Partnership
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We don&apos;t disappear after launch. Your $977/month includes:
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: "🛡️",
              title: "Priority Support",
              desc: "Same-day response for any issues or updates.",
            },
            {
              icon: "📈",
              title: "Monthly Reports",
              desc: "Traffic, leads, and conversion analytics.",
            },
            {
              icon: "🔧",
              title: "CRM Optimization",
              desc: "Workflow tweaks based on real performance data.",
            },
            {
              icon: "🔍",
              title: "SEO Monitoring",
              desc: "Keyword tracking and content recommendations.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card/50 p-5"
            >
              <span className="text-2xl">{item.icon}</span>
              <h4 className="mt-3 font-heading text-sm font-bold">
                {item.title}
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Final CTA ---- */}
      <section className="border-t border-border bg-card/30 px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to Build <span className="text-gold">Tauro</span>?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Secure your build slot and let&apos;s create the digital presence
            Philadelphia&apos;s real estate market has been waiting for.
          </p>
          <a
            href={PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-lg bg-gold px-10 py-4 text-lg font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
          >
            Pay $5,500 Deposit and Get Started
          </a>
          <div className="mt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition-colors hover:text-gold"
            >
              {CONTACT_EMAIL}
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href={`tel:${CONTACT_PHONE}`}
              className="transition-colors hover:text-gold"
            >
              {CONTACT_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        <p>
          Prepared by{" "}
          <span className="font-semibold text-foreground">Julian Bradley</span>{" "}
          at{" "}
          <span className="font-semibold text-foreground">AI Acrobatics</span>
        </p>
        <p className="mt-1">
          This proposal is confidential and intended solely for LYL Realty
          Group.
        </p>
      </footer>
    </div>
  );
}
