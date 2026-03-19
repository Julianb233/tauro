"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Turnstile } from "@/components/turnstile";
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
  "As soon as possible",
  "1-3 months",
  "3-6 months",
  "6-12 months",
  "Just exploring",
];

const reasons = [
  "Relocating",
  "Upgrading",
  "Downsizing",
  "Investment property",
  "Estate sale",
  "Other",
];

export function SellerInquiryForm() {
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

    // Client-side validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.homeAddress) {
      setState("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setState("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

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

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-gold/10">
          <CheckCircle className="size-10 text-gold" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
          Inquiry Received!
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          A Tauro agent will review your property details and contact you within
          24 hours with a personalized market analysis.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {state === "error" && (
        <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{errorMsg}</p>
        </div>
      )}

      {/* ── Section 1: Your Information ─────────────────────── */}
      <div>
        <h3 className="font-heading text-lg font-bold text-foreground border-b border-border/40 pb-2 mb-4">
          Your Information
        </h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="seller-firstName" className="mb-1.5 block text-sm font-medium text-foreground">
                First Name <span className="text-gold">*</span>
              </label>
              <input
                id="seller-firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Jane"
                className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div>
              <label htmlFor="seller-lastName" className="mb-1.5 block text-sm font-medium text-foreground">
                Last Name <span className="text-gold">*</span>
              </label>
              <input
                id="seller-lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Smith"
                className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          <div>
            <label htmlFor="seller-email" className="mb-1.5 block text-sm font-medium text-foreground">
              Email Address <span className="text-gold">*</span>
            </label>
            <input
              id="seller-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          <div>
            <label htmlFor="seller-phone" className="mb-1.5 block text-sm font-medium text-foreground">
              Phone Number <span className="text-gold">*</span>
            </label>
            <input
              id="seller-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="(215) 839-4172"
              className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>
      </div>

      {/* ── Section 2: Property Details ─────────────────────── */}
      <div>
        <h3 className="font-heading text-lg font-bold text-foreground border-b border-border/40 pb-2 mb-4">
          Property Details
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="seller-homeAddress" className="mb-1.5 block text-sm font-medium text-foreground">
              Home Address <span className="text-gold">*</span>
            </label>
            <input
              id="seller-homeAddress"
              name="homeAddress"
              type="text"
              required
              autoComplete="street-address"
              value={form.homeAddress}
              onChange={handleChange}
              placeholder="123 Main St, Philadelphia, PA"
              className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="seller-beds" className="mb-1.5 block text-sm font-medium text-foreground">
                Bedrooms
              </label>
              <select
                id="seller-beds"
                name="beds"
                value={form.beds}
                onChange={handleChange}
                className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="">Select</option>
                {["1", "2", "3", "4", "5", "6+"].map((v) => (
                  <option key={v} value={v} className="bg-background">
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="seller-baths" className="mb-1.5 block text-sm font-medium text-foreground">
                Bathrooms
              </label>
              <select
                id="seller-baths"
                name="baths"
                value={form.baths}
                onChange={handleChange}
                className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="">Select</option>
                {["1", "1.5", "2", "2.5", "3", "3.5", "4+"].map((v) => (
                  <option key={v} value={v} className="bg-background">
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="seller-sqft" className="mb-1.5 block text-sm font-medium text-foreground">
              Estimated Square Footage
            </label>
            <input
              id="seller-sqft"
              name="sqft"
              type="text"
              value={form.sqft}
              onChange={handleChange}
              placeholder="e.g., 2,000"
              className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>
      </div>

      {/* ── Section 3: Selling Details ──────────────────────── */}
      <div>
        <h3 className="font-heading text-lg font-bold text-foreground border-b border-border/40 pb-2 mb-4">
          Selling Details
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="seller-timeline" className="mb-1.5 block text-sm font-medium text-foreground">
              Timeline to Sell
            </label>
            <select
              id="seller-timeline"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="">Select a timeline</option>
              {timelines.map((t) => (
                <option key={t} value={t} className="bg-background">
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="seller-reason" className="mb-1.5 block text-sm font-medium text-foreground">
              Reason for Selling
            </label>
            <select
              id="seller-reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            >
              <option value="">Select a reason</option>
              {reasons.map((r) => (
                <option key={r} value={r} className="bg-background">
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="seller-message" className="mb-1.5 block text-sm font-medium text-foreground">
              Anything else we should know?
            </label>
            <textarea
              id="seller-message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Recent renovations, special circumstances, current tenants, etc."
              className="w-full resize-none rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>
      </div>

      <Turnstile onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} className="mt-4" />

      <button
        type="submit"
        disabled={state === "submitting" || !turnstileToken}
        className="w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? "Submitting..." : "Get My Free Valuation"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Free. No obligation. By submitting, you agree to our{" "}
        <a href="/privacy" className="text-gold-dark hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
