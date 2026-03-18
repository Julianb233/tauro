"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, TrendingUp, Shield, Star, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import type { LeadPayload } from "@/app/api/leads/route";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  beds: string;
  baths: string;
  sqft: string;
  timeline: string;
  reason: string;
  message: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  homeAddress: "",
  beds: "",
  baths: "",
  sqft: "",
  timeline: "",
  reason: "",
  message: "",
};

const timelines = [
  "Within 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
];

const reasons = [
  "Downsizing",
  "Upsizing / Growing family",
  "Relocating",
  "Investment / portfolio",
  "Estate / inherited property",
  "Other",
];

const whySell = [
  {
    icon: TrendingUp,
    title: "Top Dollar Results",
    description: "We consistently sell above asking price. Our hyperlocal market intel means strategic pricing from day one.",
  },
  {
    icon: Home,
    title: "Premium Marketing",
    description: "Professional photography, 3D tours, targeted digital advertising, and placement in Philadelphia's top listing portals.",
  },
  {
    icon: Shield,
    title: "Expert Negotiation",
    description: "Our agents have closed $2.1B in volume. We protect your interests from offer to closing.",
  },
  {
    icon: Star,
    title: "Concierge Service",
    description: "We coordinate staging, inspections, and repairs so you don't have to. White-glove from start to finish.",
  },
];

export default function SellPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const payload: LeadPayload = {
      type: "seller",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      homeAddress: form.homeAddress,
      beds: form.beds,
      baths: form.baths,
      sqft: form.sqft,
      timeline: form.timeline,
      reason: form.reason,
      message: form.message,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submission failed");
      }

      setState("success");
      setForm(initialForm);
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-near-black pb-20 pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury home"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-near-black/80 via-near-black/70 to-near-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Sell With Tauro
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            List Your Home.
            <br />
            <span className="text-gold">Get Top Dollar.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/60">
            Philadelphia&apos;s most trusted listing agents. Get a free home valuation
            and discover what your property is worth in today&apos;s market.
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

      {/* ── Why Sell With Tauro ───────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Tauro Advantage
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Why Philadelphia Sellers Choose Us
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whySell.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/40 bg-near-black p-6 transition-all hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <item.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-8 rounded-2xl border border-border/40 bg-near-black p-8">
            {[
              { value: "$2.1B+", label: "Total Sales Volume" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "6 Days", label: "Avg. Days to Offer" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valuation Form ────────────────────────────────────── */}
      <section id="valuation-form" className="bg-near-black py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Free Home Valuation
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              What&apos;s Your Home Worth?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Fill out the form below. A Tauro agent will research your property and
              provide a personalized market analysis within 24 hours — no obligation.
            </p>
          </div>

          {state === "success" ? (
            <div className="flex flex-col items-center rounded-2xl border border-border/40 bg-midnight p-12 text-center shadow-xl">
              <div className="flex size-20 items-center justify-center rounded-full bg-gold/10">
                <CheckCircle className="size-10 text-gold" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-white">
                Valuation Request Received!
              </h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                A Tauro agent will analyze your property and deliver a comprehensive
                market report within 24 hours.
              </p>
              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="rounded-lg border border-gold px-5 py-2.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
                >
                  Submit Another
                </button>
                <a
                  href="/contact"
                  className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light"
                >
                  Talk to an Agent
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-2xl border border-border/40 bg-midnight p-8 shadow-xl"
            >
              {state === "error" && (
                <div className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{errorMsg}</p>
                </div>
              )}

              {/* Property details */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
                  About Your Property
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="homeAddress" className="mb-1.5 block text-sm font-medium text-white">
                      Property Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="homeAddress"
                      name="homeAddress"
                      type="text"
                      required
                      autoComplete="street-address"
                      value={form.homeAddress}
                      onChange={handleChange}
                      placeholder="123 Walnut St, Philadelphia, PA 19103"
                      className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label htmlFor="beds" className="mb-1.5 block text-sm font-medium text-white">
                        Bedrooms
                      </label>
                      <select
                        id="beds"
                        name="beds"
                        value={form.beds}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      >
                        <option value="">Select</option>
                        {["Studio", "1", "2", "3", "4", "5", "6+"].map((v) => (
                          <option key={v} value={v} className="bg-near-black">
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="baths" className="mb-1.5 block text-sm font-medium text-white">
                        Bathrooms
                      </label>
                      <select
                        id="baths"
                        name="baths"
                        value={form.baths}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      >
                        <option value="">Select</option>
                        {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((v) => (
                          <option key={v} value={v} className="bg-near-black">
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="sqft" className="mb-1.5 block text-sm font-medium text-white">
                        Approx. Sq. Ft.
                      </label>
                      <input
                        id="sqft"
                        name="sqft"
                        type="number"
                        min="0"
                        value={form.sqft}
                        onChange={handleChange}
                        placeholder="e.g. 1800"
                        className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Selling details */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
                  Your Selling Plans
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-white">
                      Selling Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    >
                      <option value="">Select a timeline</option>
                      {timelines.map((t) => (
                        <option key={t} value={t} className="bg-near-black">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reason" className="mb-1.5 block text-sm font-medium text-white">
                      Reason for Selling
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    >
                      <option value="">Select a reason</option>
                      {reasons.map((r) => (
                        <option key={r} value={r} className="bg-near-black">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
                  Your Contact Info
                </h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-white">
                        First Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-white">
                        Last Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Smith"
                        className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-white">
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(215) 555-0100"
                      className="w-full rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
                      Anything Else We Should Know?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Recent renovations, special circumstances, current tenants, etc."
                      className="w-full resize-none rounded-lg border border-border/40 bg-near-black px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "submitting" ? "Submitting..." : "Get My Free Valuation"}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Free. No obligation. By submitting, you agree to our{" "}
                <a href="/privacy" className="text-gold hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
