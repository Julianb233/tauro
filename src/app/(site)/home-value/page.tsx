"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";
import {
  Gift,
  Clock,
  MapPin,
  Home,
  CheckCircle,
  AlertCircle,
  FormInput,
  BarChart3,
  FileText,
} from "lucide-react";
import type { LeadPayload } from "@/app/api/leads/route";
import { useUtm } from "@/hooks/useUtm";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeAddress: string;
  message: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  homeAddress: "",
  message: "",
};

const valueProps = [
  {
    icon: Gift,
    title: "Free, No Obligation",
    description: "Get an honest assessment of your home's value with zero pressure or commitment.",
  },
  {
    icon: Clock,
    title: "24-Hour Response",
    description: "A Tauro agent will deliver your personalized market analysis within one business day.",
  },
  {
    icon: MapPin,
    title: "Local Market Expert",
    description: "Our agents live and work in Philadelphia. We know your neighborhood inside and out.",
  },
];

const steps = [
  {
    icon: FormInput,
    number: "01",
    title: "Submit Your Address",
    description: "Enter your property address and contact information using the form below.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "We Analyze the Market",
    description: "A Tauro agent researches comparable sales, market trends, and neighborhood data.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Receive Your Report",
    description: "Get a comprehensive market analysis with an accurate valuation of your home.",
  },
];

export default function HomeValuePage() {
  const utm = useUtm();
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      message: form.message,
      ...utm,
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
      <Breadcrumbs items={[{ label: "Home Value", href: "/home-value" }]} />
      {/* -- Hero ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
            alt="Philadelphia home"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_LANDSCAPE}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Free Home Valuation
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            What&apos;s My Home Worth?
            <br />
            <span className="text-gold">Find Out in 24 Hours.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
            Get a no-obligation market analysis from a Tauro agent who knows your
            neighborhood.
          </p>
        </div>
      </section>

      {/* -- Value Proposition Strip --------------------------------- */}
      <section className="bg-cream py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {valueProps.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-border/40 bg-white p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                  <item.icon className="size-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-midnight">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Lead Capture Form -------------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Get Your Free Report
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-midnight sm:text-4xl">
              Request Your Valuation
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell us about your property and a Tauro agent will deliver a
              personalized market analysis within 24 hours.
            </p>
          </div>

          {state === "success" ? (
            <div className="flex flex-col items-center rounded-2xl border border-border/40 bg-cream p-12 text-center shadow-xl">
              <div className="flex size-20 items-center justify-center rounded-full bg-gold/10">
                <CheckCircle className="size-10 text-gold" />
              </div>
              <h3 className="mt-6 font-heading text-2xl font-bold text-midnight">
                Valuation Request Received!
              </h3>
              <p className="mt-3 max-w-sm text-muted-foreground">
                A Tauro agent will analyze your property and deliver a
                comprehensive market report within 24 hours.
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
                  href="/properties"
                  className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light"
                >
                  Browse Listings
                </a>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-2xl border border-border/40 bg-cream p-8 shadow-xl"
            >
              {state === "error" && (
                <div className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{errorMsg}</p>
                </div>
              )}

              {/* Property Address - Primary field */}
              <div>
                <label
                  htmlFor="homeAddress"
                  className="mb-1.5 block text-sm font-medium text-midnight"
                >
                  Property Address <span className="text-gold">*</span>
                </label>
                <div className="relative">
                  <Home className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-gold/60" />
                  <input
                    id="homeAddress"
                    name="homeAddress"
                    type="text"
                    required
                    autoComplete="street-address"
                    value={form.homeAddress}
                    onChange={handleChange}
                    placeholder="123 Walnut St, Philadelphia, PA 19103"
                    className="w-full rounded-lg border border-border/40 bg-white py-3 pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20"
                  />
                </div>
              </div>

              {/* Name row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-medium text-midnight"
                  >
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
                    className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-medium text-midnight"
                  >
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
                    className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-midnight"
                >
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
                    className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-midnight"
                >
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
                  placeholder="(215) 839-4172"
                    className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20"
                />
              </div>

              {/* Optional message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-midnight"
                >
                  Anything else we should know?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Recent renovations, timeline to sell, special circumstances..."
                    className="w-full resize-none rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/20"
                />
              </div>

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {state === "submitting"
                  ? "Submitting..."
                  : "Get My Free Valuation"}
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

      {/* -- How It Works ------------------------------------------- */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Simple Process
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-midnight sm:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-gold/10">
                  <step.icon className="size-6 text-gold" />
                </div>
                <p className="mt-4 font-heading text-2xl font-bold text-gold">
                  {step.number}
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-midnight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
