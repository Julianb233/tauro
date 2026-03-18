"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  Mail,
  Award,
  Play,
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Instagram,
  Linkedin,
} from "lucide-react";
import { getAgentBySlug } from "@/data/agents";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import type { LeadPayload } from "@/app/api/leads/route";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function AgentProfileClient({ slug }: { slug: string }) {
  const agent = getAgentBySlug(slug);

  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!agent) notFound();

  const activeListings = properties.filter((p) =>
    agent.activeListingIds.includes(p.id)
  );

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
      type: "agent-contact",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      message: form.message,
      agentName: agent!.fullName,
      agentSlug: agent!.slug,
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
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      {/* -- Hero / Header ------------------------------------------------- */}
      <section className="bg-near-black pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/agents"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-4" />
            Back to Team
          </Link>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="overflow-hidden rounded-2xl border border-gold/20">
                <div className="aspect-[3/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.photo}
                    alt={agent.fullName}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <h1 className="font-heading text-4xl font-bold text-white">
                {agent.fullName}
              </h1>
              <p className="mt-2 text-sm font-label uppercase tracking-wider text-gold">
                {agent.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                License #{agent.licenseNumber}
              </p>

              <p className="mt-6 whitespace-pre-line leading-relaxed text-muted-foreground">
                {agent.bio}
              </p>

              {/* Languages */}
              {agent.languages.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.languages.map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-border/40 bg-midnight px-3 py-1 text-xs text-white/80"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}

              {/* Social links */}
              <div className="mt-4 flex gap-3">
                {agent.social.instagram && (
                  <a
                    href={agent.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Instagram className="size-5" />
                  </a>
                )}
                {agent.social.linkedin && (
                  <a
                    href={agent.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    <Linkedin className="size-5" />
                  </a>
                )}
              </div>

              {/* Contact buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10"
                >
                  <Phone className="size-4" />
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                >
                  <Mail className="size-4" />
                  Email {agent.firstName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Stats Bar ----------------------------------------------------- */}
      <section className="border-y border-border/40 bg-midnight py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              {
                icon: Home,
                value: `${agent.stats.propertiesSold}+`,
                label: "Properties Sold",
              },
              {
                icon: TrendingUp,
                value: agent.stats.totalVolume,
                label: "Total Volume",
              },
              {
                icon: Clock,
                value: `${agent.stats.avgDaysOnMarket}`,
                label: "Avg Days on Market",
              },
              {
                icon: Award,
                value: `${agent.stats.yearsExperience}`,
                label: "Years Experience",
              },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 size-5 text-gold/60" />
                <p className="font-heading text-3xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-label uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Specialties & Neighborhoods ----------------------------------- */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Specialties */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Specialties
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-sm text-gold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Neighborhoods */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Neighborhoods
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.neighborhoods.map((n) => (
                  <span
                    key={n}
                    className="rounded-full border border-border/40 px-4 py-1.5 text-sm text-white/80"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- Awards -------------------------------------------------------- */}
      {agent.awards.length > 0 && (
        <section className="bg-midnight py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold text-white">
              Awards & Recognition
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {agent.awards.map((award) => (
                <div
                  key={`${award.title}-${award.year}`}
                  className="rounded-xl border border-border/40 bg-near-black p-6"
                >
                  <Award className="size-6 text-gold" />
                  <h3 className="mt-3 font-semibold text-white">
                    {award.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {award.issuer} &middot; {award.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -- Video Introduction -------------------------------------------- */}
      {agent.videoIntroUrl && (
        <section className="bg-near-black py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <Play className="size-5 text-gold" />
              <h2 className="font-heading text-2xl font-bold text-white">
                Video Introduction
              </h2>
            </div>
            <div className="aspect-video overflow-hidden rounded-xl border border-border/40">
              <iframe
                src={agent.videoIntroUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                title={`${agent.fullName} video introduction`}
              />
            </div>
          </div>
        </section>
      )}

      {/* -- Active Listings ----------------------------------------------- */}
      {activeListings.length > 0 && (
        <section className="bg-midnight py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="font-heading text-2xl font-bold text-white">
                {agent.firstName}&apos;s Active Listings
              </h2>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                {activeListings.length}
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeListings.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* -- Contact Form -------------------------------------------------- */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-white">
            Contact {agent.firstName}
          </h2>

          <div className="rounded-2xl border border-border/40 bg-midnight p-8 shadow-xl">
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-gold/10">
                  <CheckCircle className="size-8 text-gold" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-white">
                  Message Sent to {agent.firstName}!
                </h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Thanks for reaching out. {agent.firstName} will be in touch
                  within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Send a direct message to {agent.firstName}. We typically
                    respond within one business day.
                  </p>
                </div>

                {state === "error" && (
                  <div className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5">
                    <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <p className="text-sm text-destructive">{errorMsg}</p>
                  </div>
                )}

                {/* Name row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-sm font-medium text-white"
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
                      className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-sm font-medium text-white"
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
                      className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-white"
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
                    className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-medium text-white"
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
                    placeholder="(215) 555-0100"
                    className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={`Tell ${agent.firstName} how they can help...`}
                    className="w-full resize-none rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state === "submitting"
                    ? "Sending..."
                    : `Send Message to ${agent.firstName}`}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="text-gold hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
