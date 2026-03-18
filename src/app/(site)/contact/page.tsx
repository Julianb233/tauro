"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import type { LeadPayload } from "@/app/api/leads/route";

// Note: metadata must be in a server component; moving to layout or use generateMetadata if needed
// export const metadata: Metadata = { title: "Contact Us", description: "..." };

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

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(215) 555-0100",
    href: "tel:+12155550100",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@taurorealty.com",
    href: "mailto:info@taurorealty.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Philadelphia, PA",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Sat 9am–7pm",
    href: null,
  },
];

export default function ContactPage() {
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
      type: "contact",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
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
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Get In Touch
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Contact Tauro
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Whether you&apos;re buying, selling, or just exploring — our agents are ready
            to help you navigate Philadelphia real estate.
          </p>
        </div>
      </section>

      {/* ── Contact Info + Form ───────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left — contact info */}
            <div className="space-y-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-white">
                  We&apos;d Love to Hear From You
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Fill out the form and an agent will reach out within one business day.
                  For urgent inquiries, call or text us directly.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-border/40 bg-near-black p-5"
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                      <item.icon className="size-5 text-gold" />
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 text-sm font-medium text-white transition-colors hover:text-gold"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div className="rounded-xl border border-border/40 bg-near-black p-6">
                <h3 className="font-heading text-lg font-bold text-white">
                  Other Ways We Can Help
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Schedule a Property Showing", href: "/book-tour" },
                    { label: "Get a Free Home Valuation", href: "/sell" },
                    { label: "Browse Our Listings", href: "/properties" },
                    { label: "Meet Our Agents", href: "/agents" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg border border-border/40 px-4 py-3 transition-all hover:border-gold/40 hover:bg-midnight"
                      >
                        <span className="text-sm font-medium text-white/80 group-hover:text-white">
                          {link.label}
                        </span>
                        <ArrowRight className="size-4 text-gold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — form */}
            <div className="rounded-2xl border border-border/40 bg-near-black p-8 shadow-xl">
              {state === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gold/10">
                    <CheckCircle className="size-8 text-gold" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-white">
                    Message Received!
                  </h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Thanks for reaching out. One of our agents will be in touch within one
                    business day.
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
                    <h2 className="font-heading text-2xl font-bold text-white">
                      Send a Message
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We typically respond within one business day.
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
                        className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
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

                  {/* Email */}
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
                      className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Phone */}
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
                      className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "submitting" ? "Sending..." : "Send Message"}
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
        </div>
      </section>
    </>
  );
}
