"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone, Mail, Award, Play, Home, TrendingUp, Clock, CheckCircle,
  AlertCircle, ArrowLeft, Instagram, Linkedin, Facebook, Star, Quote, DollarSign,
  MapPin, Calendar, Send,
} from "lucide-react";
import type { Agent } from "@/data/agents";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import type { LeadPayload } from "@/app/api/leads/route";
import { useUtm } from "@/hooks/useUtm";

type FormState = "idle" | "submitting" | "success" | "error";
interface FormData { firstName: string; lastName: string; email: string; phone: string; message: string; }
const initialForm: FormData = { firstName: "", lastName: "", email: "", phone: "", message: "" };

/* ------------------------------------------------------------------ */
/*  Inline Agent Contact Form                                         */
/* ------------------------------------------------------------------ */
function AgentContactForm({ agent, variant }: { agent: Agent; variant: "sidebar" | "full" }) {
  const utm = useUtm();
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    const honeypot = formData.get("website") as string;
    const payload: LeadPayload = {
      type: "agent-contact",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      message: form.message,
      agentName: agent.fullName,
      agentSlug: agent.slug,
      ...utm,
    };
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: honeypot }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submission failed");
      }
      setState("success");
      setForm(initialForm);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const isSidebar = variant === "sidebar";
  const cardCls = isSidebar
    ? "rounded-2xl border border-gold/20 bg-foreground p-6 shadow-lg"
    : "rounded-2xl border border-border/50 bg-white p-8 shadow-sm";
  const labelCls = isSidebar
    ? "mb-1 block text-xs font-medium text-white/70"
    : "mb-1.5 block text-sm font-medium text-foreground";
  const inputCls = isSidebar
    ? "w-full rounded-lg border border-border/30 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
    : "w-full rounded-lg border border-border/40 bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20";

  if (state === "success") {
    return (
      <div className={cardCls}>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-gold/10">
            <CheckCircle className="size-7 text-gold" />
          </div>
          <h3 className={`mt-4 font-heading text-lg font-bold ${isSidebar ? "text-white" : "text-foreground"}`}>
            Message Sent!
          </h3>
          <p className={`mt-2 text-sm ${isSidebar ? "text-white/60" : "text-muted-foreground"}`}>
            {agent.firstName} will be in touch within one business day.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="mt-6 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cardCls}>
      <div className="mb-4 flex items-center gap-2">
        <Send className={`size-4 ${isSidebar ? "text-gold" : "text-gold"}`} />
        <h3 className={`font-heading text-lg font-bold ${isSidebar ? "text-white" : "text-foreground"}`}>
          Contact {agent.firstName}
        </h3>
      </div>
      <p className={`mb-4 text-xs ${isSidebar ? "text-white/50" : "text-muted-foreground"}`}>
        Send a direct message to {agent.firstName}. We typically respond within one business day.
      </p>

      {state === "error" && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-xs text-destructive">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Pre-filled agent indicator */}
        <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs ${isSidebar ? "bg-gold/10 text-gold" : "bg-gold/5 text-gold"}`}>
          <Mail className="size-3.5" />
          <span>Message for <strong>{agent.fullName}</strong></span>
        </div>

        <div className={isSidebar ? "grid gap-3 grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
          <div>
            <label htmlFor="cf-firstName" className={labelCls}>First Name <span className="text-gold">*</span></label>
            <input id="cf-firstName" name="firstName" type="text" required autoComplete="given-name" value={form.firstName} onChange={handleChange} placeholder="Jane" className={inputCls} />
          </div>
          <div>
            <label htmlFor="cf-lastName" className={labelCls}>Last Name <span className="text-gold">*</span></label>
            <input id="cf-lastName" name="lastName" type="text" required autoComplete="family-name" value={form.lastName} onChange={handleChange} placeholder="Smith" className={inputCls} />
          </div>
        </div>

        <div>
          <label htmlFor="cf-email" className={labelCls}>Email <span className="text-gold">*</span></label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputCls} />
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone <span className="text-gold">*</span></label>
          <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" value={form.phone} onChange={handleChange} placeholder="(215) 839-4172" className={inputCls} />
        </div>

        <div>
          <label htmlFor="cf-message" className={labelCls}>Message</label>
          <textarea
            id="cf-message"
            name="message"
            rows={isSidebar ? 3 : 5}
            value={form.message}
            onChange={handleChange}
            placeholder={`Tell ${agent.firstName} how they can help...`}
            className={`resize-none ${inputCls}`}
          />
        </div>

        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending..." : `Send Message`}
        </button>

        <p className={`text-center text-[10px] ${isSidebar ? "text-white/30" : "text-muted-foreground"}`}>
          By submitting, you agree to our{" "}
          <a href="/privacy" className="text-gold hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Profile Component                                            */
/* ------------------------------------------------------------------ */
export default function AgentProfileClient({ agent, activeListings }: { agent: Agent; activeListings: Property[] }) {
  return (
    <>
      {/* Hero + Sidebar layout */}
      <section className="bg-foreground pb-16 pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/agents" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
            <ArrowLeft className="size-4" />Back to Team
          </Link>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Photo */}
            <div className="lg:col-span-1">
              <div className="overflow-hidden rounded-2xl border border-gold/20">
                <div className="relative aspect-[3/4]">
                  <Image src={agent.photo} alt={agent.fullName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>
            </div>

            {/* Bio + Contact info */}
            <div className="lg:col-span-2">
              <h1 className="font-heading text-4xl font-bold text-white">{agent.fullName}</h1>
              <p className="mt-2 text-sm font-label uppercase tracking-wider text-gold">{agent.title}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                  {agent.stats.yearsExperience}+ Years Experience
                </span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">License #{agent.licenseNumber}</p>
              <p className="mt-6 whitespace-pre-line leading-relaxed text-muted-foreground">{agent.bio}</p>
              {agent.languages.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.languages.map((lang) => (
                    <span key={lang} className="rounded-full border border-border/40 bg-white/10 px-3 py-1 text-xs text-white/80">{lang}</span>
                  ))}
                </div>
              )}
              <div className="mt-4 flex gap-3">
                {agent.social.instagram && (
                  <a href={agent.social.instagram} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold">
                    <Instagram className="size-5" />
                  </a>
                )}
                {agent.social.linkedin && (
                  <a href={agent.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold">
                    <Linkedin className="size-5" />
                  </a>
                )}
                {agent.social.facebook && (
                  <a href={agent.social.facebook} target="_blank" rel="noopener noreferrer" className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold">
                    <Facebook className="size-5" />
                  </a>
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10">
                  <Phone className="size-4" />{agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light">
                  <Mail className="size-4" />Email {agent.firstName}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border/40 bg-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { icon: Home, value: `${agent.stats.propertiesSold}+`, label: "Properties Sold" },
              { icon: TrendingUp, value: agent.stats.totalVolume, label: "Total Volume" },
              { icon: Clock, value: `${agent.stats.avgDaysOnMarket}`, label: "Avg Days on Market" },
              { icon: Award, value: `${agent.stats.yearsExperience}`, label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 size-5 text-gold/60" />
                <p className="font-heading text-3xl font-bold text-gold">{stat.value}</p>
                <p className="mt-1 text-xs font-label uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content + inline sidebar contact form */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid gap-10 py-16 lg:grid-cols-3">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-16">
            {/* Specialties & Neighborhoods */}
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Specialties</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.specialties.map((s) => (
                    <span key={s} className="rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-sm text-gold">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Neighborhoods</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.neighborhoods.map((n) => (
                    <span key={n} className="rounded-full border border-border/40 px-4 py-1.5 text-sm text-foreground/80">{n}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Areas Served */}
            {agent.areasServed && agent.areasServed.length > 0 && (
              <div>
                <div className="flex items-center gap-3">
                  <MapPin className="size-5 text-gold" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Areas Served</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {agent.firstName} serves clients across the following Philadelphia areas.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {agent.areasServed.map((area) => (
                    <span
                      key={area}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-foreground/80 transition-colors hover:border-gold/40 hover:bg-gold/10"
                    >
                      <MapPin className="size-3 text-gold/60" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {agent.awards.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">Awards & Recognition</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {agent.awards.map((award) => (
                    <div key={`${award.title}-${award.year}`} className="rounded-xl border border-border/40 bg-cream p-6">
                      <Award className="size-6 text-gold" />
                      <h3 className="mt-3 font-semibold text-foreground">{award.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{award.issuer} &middot; {award.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials */}
            {agent.testimonials && agent.testimonials.length > 0 && (
              <div>
                <div className="mb-10 flex items-center gap-3">
                  <Quote className="size-5 text-gold" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">What Clients Say</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {agent.testimonials.map((t) => (
                    <div key={t.clientName} className="relative rounded-2xl border border-border/40 bg-cream p-8 shadow-sm">
                      <Quote className="absolute right-6 top-6 size-8 text-gold/15" />
                      <div className="mb-4 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`size-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
                        ))}
                      </div>
                      <blockquote className="text-sm leading-relaxed text-foreground/80">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="mt-5 flex items-center justify-between">
                        <p className="text-sm font-semibold text-foreground">{t.clientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(t.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {agent.videoIntroUrl && (
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <Play className="size-5 text-gold" />
                  <h2 className="font-heading text-2xl font-bold text-foreground">Video Introduction</h2>
                </div>
                <div className="aspect-video overflow-hidden rounded-xl border border-border/40">
                  <iframe src={agent.videoIntroUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="h-full w-full" title={`${agent.fullName} video introduction`} />
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar contact form — desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AgentContactForm agent={agent} variant="sidebar" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Listings */}
      {activeListings.length > 0 && (
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <h2 className="font-heading text-2xl font-bold text-foreground">{agent.firstName}&apos;s Active Listings</h2>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{activeListings.length}</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeListings.map((p) => (<PropertyCard key={p.id} property={p} />))}
            </div>
          </div>
        </section>
      )}

      {/* Sold Listings */}
      {agent.soldListings.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="font-heading text-2xl font-bold text-foreground">{agent.firstName}&apos;s Recent Sales</h2>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{agent.soldListings.length} Sold</span>
            </div>
            <p className="mb-8 text-sm text-muted-foreground">
              Total volume: <span className="font-semibold text-gold">{agent.stats.totalVolume}</span>
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {agent.soldListings.map((listing) => (
                <div key={`${listing.address}-${listing.soldDate}`} className="group relative overflow-hidden rounded-xl border border-border/40 bg-cream p-5 transition-all hover:border-gold/30 hover:shadow-md">
                  <div className="absolute right-3 top-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600">Sold</span>
                  </div>
                  <div className="mb-3 flex items-center gap-2">
                    <DollarSign className="size-5 text-gold" />
                    <p className="font-heading text-xl font-bold text-foreground">{formatPrice(listing.price)}</p>
                  </div>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><MapPin className="size-3.5 shrink-0" />{listing.address}</p>
                    <p className="flex items-center gap-2"><Home className="size-3.5 shrink-0" />{listing.neighborhood}</p>
                    <p className="flex items-center gap-2"><Calendar className="size-3.5 shrink-0" />{new Date(listing.soldDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile contact form — shown below content on small screens */}
      <section className="bg-cream py-16 lg:hidden">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <AgentContactForm agent={agent} variant="full" />
        </div>
      </section>
    </>
  );
}
