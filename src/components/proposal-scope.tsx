"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Scope data                                                         */
/* ------------------------------------------------------------------ */

const scopePillars = [
  {
    icon: "🌐",
    title: "Custom Website",
    summary:
      "Premium Next.js site with your Tauro brand, property listings, neighborhood pages, and lead capture.",
    items: [
      "8+ custom pages (Home, Properties, Agents, Neighborhoods, Contact, etc.)",
      "Property listing grid with filters and detail pages",
      "15 Philadelphia neighborhood landing pages",
      "Agent profile pages with bios and active listings",
      "Mobile-first responsive design",
      "SEO-optimized with structured data",
      "Deployed on Vercel with custom domain",
    ],
  },
  {
    icon: "📊",
    title: "GoHighLevel CRM",
    summary:
      "Full CRM setup so every lead is captured, tracked, and followed up on automatically.",
    items: [
      "Contact management with lead source tracking",
      "Sales pipeline (New Lead, Qualified, Showing, Offer, Closed)",
      "Automated email and SMS sequences",
      "Appointment booking calendar",
      "Review request automation",
      "Custom fields for property preferences",
    ],
  },
  {
    icon: "📣",
    title: "Marketing Engine",
    summary:
      "SEO, Google Business, and content systems to drive organic leads month after month.",
    items: [
      "Local SEO targeting Philadelphia neighborhoods",
      "Google Business Profile optimization",
      "Lead magnet landing pages",
      "Monthly email newsletter template",
      "Social media content calendar framework",
      "Retargeting pixel setup (Meta + Google)",
    ],
  },
  {
    icon: "⚡",
    title: "Automations",
    summary:
      "Workflows that run 24/7 so no lead falls through the cracks.",
    items: [
      "New lead intake workflow (form > CRM > email > SMS > task)",
      "Showing confirmation and reminder sequence",
      "Post-showing follow-up drip",
      "Stale lead re-engagement (30/60/90 day)",
      "Review request after closing",
      "Agent notification on high-value leads",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  ScopeCard                                                          */
/* ------------------------------------------------------------------ */

function ScopeCard({
  pillar,
}: {
  pillar: (typeof scopePillars)[number];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 text-left"
      >
        <span className="text-3xl">{pillar.icon}</span>
        <div className="flex-1">
          <h3 className="font-heading text-xl font-bold text-foreground">
            {pillar.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {pillar.summary}
          </p>
        </div>
        <svg
          className={`mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "mt-4 max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="space-y-2 border-t border-border pt-4">
          {pillar.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="mt-0.5 text-gold">&#10003;</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ProposalScope                                                      */
/* ------------------------------------------------------------------ */

export function ProposalScope() {
  return (
    <section id="scope" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20">
      <p className="text-sm font-medium tracking-[0.2em] text-gold uppercase">
        What&apos;s Included
      </p>
      <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">
        Full-Stack Build Scope
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Everything you need to launch a world-class real estate brand online,
        from a custom website to automated lead nurturing.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {scopePillars.map((pillar) => (
          <ScopeCard key={pillar.title} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}
