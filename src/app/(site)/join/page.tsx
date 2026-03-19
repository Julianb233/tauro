"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle, AlertCircle, ArrowRight,
} from "lucide-react";
import { Turnstile } from "@/components/turnstile";
import type { LeadPayload } from "@/app/api/leads/route";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  yearsExperience: string;
  currentBrokerage: string;
  whyJoin: string;
  message: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  yearsExperience: "",
  currentBrokerage: "",
  whyJoin: "",
  message: "",
};

const experienceLevels = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const requirements = [
  "Active PA real estate license (or willingness to transfer)",
  "Strong work ethic and client-first mentality",
  "Excellent communication skills",
  "Desire to grow within a team environment",
];

export default function JoinPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

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
      type: "agent-application",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      licenseNumber: form.licenseNumber,
      yearsExperience: form.yearsExperience,
      currentBrokerage: form.currentBrokerage,
      whyJoin: form.whyJoin,
      message: form.message,
      captchaToken: turnstileToken || undefined,
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
      setTurnstileToken("");
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      {/* -- Hero -------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Apply Now
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Join the Tauro Team
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            We&apos;re building Philadelphia&apos;s most elite real estate team. If
            you&apos;re driven, client-focused, and ready to elevate your career, we
            want to hear from you.
          </p>
          <Link
            href="/why-join"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
          >
            Learn why agents choose Tauro
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* -- Application Form -------------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left -- requirements info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  Ready to Make a Move?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  At Tauro, we look for agents who are passionate about delivering
                  exceptional client experiences. Whether you&apos;re a seasoned
                  top-producer or a newly licensed agent hungry to grow, we provide the
                  platform, tools, and support to take your career to the next level.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  What We Look For
                </h3>
                <ul className="mt-4 space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                      <span className="text-sm text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
                <p className="text-sm font-semibold text-foreground">
                  Want to learn more before applying?
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Explore our commission structure, technology platform, training programs,
                  and agent-first culture.
                </p>
                <Link
                  href="/why-join"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
                >
                  Why Join Tauro
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Right -- application form */}
            <div className="rounded-2xl border border-border/40 bg-cream p-8 shadow-xl">
              {state === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gold/10">
                    <CheckCircle className="size-8 text-gold" />
                  </div>
                  <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">
                    Application Submitted!
                  </h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">
                    Thank you for your interest in joining Tauro. Our team lead will
                    review your application and reach out within 2-3 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      Apply Now
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fill out the form below and we&apos;ll be in touch.
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
                      <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">
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
                        className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">
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
                        className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
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
                      className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
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
                      className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* License Number */}
                  <div>
                    <label htmlFor="licenseNumber" className="mb-1.5 block text-sm font-medium text-foreground">
                      PA License Number <span className="text-gold">*</span>
                    </label>
                    <input
                      id="licenseNumber"
                      name="licenseNumber"
                      type="text"
                      required
                      value={form.licenseNumber}
                      onChange={handleChange}
                      placeholder="RS-XXXXXX"
                      className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label htmlFor="yearsExperience" className="mb-1.5 block text-sm font-medium text-foreground">
                      Years of Experience <span className="text-gold">*</span>
                    </label>
                    <select
                      id="yearsExperience"
                      name="yearsExperience"
                      required
                      value={form.yearsExperience}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    >
                      <option value="">Select experience level</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level} className="bg-white">
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Current Brokerage */}
                  <div>
                    <label htmlFor="currentBrokerage" className="mb-1.5 block text-sm font-medium text-foreground">
                      Current Brokerage
                    </label>
                    <input
                      id="currentBrokerage"
                      name="currentBrokerage"
                      type="text"
                      value={form.currentBrokerage}
                      onChange={handleChange}
                      placeholder="e.g., Keller Williams"
                      className="w-full rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Why Join */}
                  <div>
                    <label htmlFor="whyJoin" className="mb-1.5 block text-sm font-medium text-foreground">
                      Why do you want to join Tauro?
                    </label>
                    <textarea
                      id="whyJoin"
                      name="whyJoin"
                      rows={4}
                      value={form.whyJoin}
                      onChange={handleChange}
                      placeholder="Tell us about your goals and what excites you about Tauro..."
                      className="w-full resize-none rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                      Additional Notes
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Link to your resume, portfolio, or anything else you'd like to share..."
                      className="w-full resize-none rounded-lg border border-border/40 bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                  </div>

                  <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} className="mt-4" />

                  <button
                    type="submit"
                    disabled={state === "submitting" || !turnstileToken}
                    className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state === "submitting" ? "Submitting..." : "Submit Application"}
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
