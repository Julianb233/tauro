"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import {
  Home,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  BarChart3,
  FileText,
} from "lucide-react";
import type { LeadPayload } from "@/app/api/leads/route";
import { Turnstile } from "@/components/turnstile";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  /* Step 1 — Property */
  homeAddress: string;
  beds: string;
  baths: string;
  sqft: string;
  /* Step 2 — Contact */
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const initialForm: FormData = {
  homeAddress: "",
  beds: "",
  baths: "",
  sqft: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

/* ------------------------------------------------------------------ */
/*  Select options                                                     */
/* ------------------------------------------------------------------ */

const bedOptions = ["1", "2", "3", "4", "5", "6+"];
const bathOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "5+"];
const sqftOptions = [
  { value: "<1000", label: "Under 1,000 sq ft" },
  { value: "1000-1500", label: "1,000 – 1,500 sq ft" },
  { value: "1500-2000", label: "1,500 – 2,000 sq ft" },
  { value: "2000-3000", label: "2,000 – 3,000 sq ft" },
  { value: "3000+", label: "3,000+ sq ft" },
];

/* ------------------------------------------------------------------ */
/*  How-it-works steps                                                 */
/* ------------------------------------------------------------------ */

const processSteps = [
  {
    icon: Home,
    number: "01",
    title: "Submit Your Property",
    description: "Tell us about your home and how to reach you.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "We Analyze the Market",
    description:
      "A Tauro agent researches comparable sales and neighborhood trends.",
  },
  {
    icon: FileText,
    number: "03",
    title: "Receive Your Report",
    description: "Get a comprehensive market analysis within 24 hours.",
  },
];

/* ------------------------------------------------------------------ */
/*  Shared input classes                                               */
/* ------------------------------------------------------------------ */

const inputBase =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#C9A96E]/60 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/20 min-h-[48px]";
const selectBase =
  "w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-[#C9A96E]/60 focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/20 min-h-[48px]";
const labelBase = "mb-1.5 block text-sm font-medium text-white/80";

/* ================================================================== */
/*  Page Component                                                     */
/* ================================================================== */

export default function HomeValuePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  /* ---- helpers --------------------------------------------------- */

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (stepErrors[name]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  /* ---- step 1 validation ---------------------------------------- */

  function validateStep1(): boolean {
    const errors: Record<string, string> = {};
    if (!form.homeAddress.trim()) errors.homeAddress = "Address is required";
    if (!form.beds) errors.beds = "Select bedrooms";
    if (!form.baths) errors.baths = "Select bathrooms";
    if (!form.sqft) errors.sqft = "Select square footage";
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  }

  /* ---- step 2 validation ---------------------------------------- */

  function validateStep2(): boolean {
    const errors: Record<string, string> = {};
    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.lastName.trim()) errors.lastName = "Last name is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.phone.trim()) errors.phone = "Phone is required";
    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  }

  /* ---- navigation ----------------------------------------------- */

  function goNext() {
    if (validateStep1()) {
      setStep(2);
      setStepErrors({});
    }
  }

  function goBack() {
    setStep(1);
    setStepErrors({});
  }

  /* ---- submit --------------------------------------------------- */

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateStep2()) return;

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
        message: form.message || undefined,
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
        setStep(1);
      } catch (err) {
        setState("error");
        setErrorMsg(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form, turnstileToken]
  );

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */

  return (
    <>
      {/* -- Hero -------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[#1A1A2E] pb-16 pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
            alt="Philadelphia home"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-[#1A1A2E]/90 to-[#1A1A2E]/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
            Free Home Valuation
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            What&apos;s Your Home Worth?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            Get a no-obligation market analysis from a local expert — delivered
            within 24 hours.
          </p>
        </div>
      </section>

      {/* -- Form Section ------------------------------------------ */}
      <section className="bg-[#1A1A2E] pb-24 pt-4">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
          {state === "success" ? (
            /* ---------- Success State ---------- */
            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-14">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#C9A96E]/10">
                <CheckCircle className="size-10 text-[#C9A96E]" />
              </div>
              <h2 className="mt-6 font-heading text-2xl font-bold text-white sm:text-3xl">
                Request Received
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
                A Tauro agent will analyze your property and deliver a
                comprehensive market report within{" "}
                <span className="font-semibold text-[#C9A96E]">
                  24 hours
                </span>
                . Check your email for a confirmation.
              </p>

              {/* Timeline indicator */}
              <div className="mt-8 w-full rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                  <Clock className="size-5 shrink-0 text-[#C9A96E]" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-white">
                      Estimated delivery
                    </p>
                    <p className="text-xs text-white/40">
                      Your personalized report will arrive within 1 business day
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setState("idle")}
                  className="flex-1 rounded-lg border border-[#C9A96E]/40 px-5 py-3 text-sm font-semibold text-[#C9A96E] transition-all hover:bg-[#C9A96E]/10"
                >
                  Submit Another
                </button>
                <a
                  href="/properties"
                  className="flex-1 rounded-lg bg-[#C9A96E] px-5 py-3 text-center text-sm font-semibold text-[#1A1A2E] transition-all hover:bg-[#d4b87e]"
                >
                  Browse Listings
                </a>
              </div>
            </div>
          ) : (
            /* ---------- Wizard Form ---------- */
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
              {/* Progress bar */}
              <div className="px-8 pt-8">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className={step === 1 ? "text-[#C9A96E]" : "text-white/40"}>
                    Step 1: Property
                  </span>
                  <span className={step === 2 ? "text-[#C9A96E]" : "text-white/40"}>
                    Step 2: Contact
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#C9A96E] transition-all duration-500 ease-out"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                  />
                </div>
                <p className="mt-2 text-center text-[11px] text-white/30">
                  Step {step} of 2
                </p>
              </div>

              {/* Error banner */}
              {state === "error" && (
                <div className="mx-8 mt-4 flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
                  <p className="text-sm text-red-400">{errorMsg}</p>
                </div>
              )}

              {/* Sliding container */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                      transform:
                        step === 1 ? "translateX(0)" : "translateX(-50%)",
                      width: "200%",
                    }}
                  >
                    {/* ====== STEP 1: Property Details ====== */}
                    <div className="w-1/2 px-8 pb-8 pt-6">
                      <h2 className="font-heading text-lg font-bold text-white">
                        Property Details
                      </h2>
                      <p className="mt-1 text-xs text-white/40">
                        Tell us about your property so we can prepare an
                        accurate valuation.
                      </p>

                      <div className="mt-6 space-y-5">
                        {/* Address */}
                        <div>
                          <label htmlFor="homeAddress" className={labelBase}>
                            Property Address{" "}
                            <span className="text-[#C9A96E]">*</span>
                          </label>
                          <div className="relative">
                            <Home className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#C9A96E]/50" />
                            <input
                              id="homeAddress"
                              name="homeAddress"
                              type="text"
                              autoComplete="street-address"
                              value={form.homeAddress}
                              onChange={handleChange}
                              placeholder="123 Walnut St, Philadelphia, PA 19103"
                              className={`${inputBase} pl-10`}
                            />
                          </div>
                          {stepErrors.homeAddress && (
                            <p className="mt-1 text-xs text-red-400">
                              {stepErrors.homeAddress}
                            </p>
                          )}
                        </div>

                        {/* Beds + Baths row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="beds" className={labelBase}>
                              Bedrooms{" "}
                              <span className="text-[#C9A96E]">*</span>
                            </label>
                            <select
                              id="beds"
                              name="beds"
                              value={form.beds}
                              onChange={handleChange}
                              className={selectBase}
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {bedOptions.map((b) => (
                                <option key={b} value={b}>
                                  {b} {b === "6+" ? "" : b === "1" ? "bed" : "beds"}
                                </option>
                              ))}
                            </select>
                            {stepErrors.beds && (
                              <p className="mt-1 text-xs text-red-400">
                                {stepErrors.beds}
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="baths" className={labelBase}>
                              Bathrooms{" "}
                              <span className="text-[#C9A96E]">*</span>
                            </label>
                            <select
                              id="baths"
                              name="baths"
                              value={form.baths}
                              onChange={handleChange}
                              className={selectBase}
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {bathOptions.map((b) => (
                                <option key={b} value={b}>
                                  {b} {b === "5+" ? "" : b === "1" ? "bath" : "baths"}
                                </option>
                              ))}
                            </select>
                            {stepErrors.baths && (
                              <p className="mt-1 text-xs text-red-400">
                                {stepErrors.baths}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Sqft */}
                        <div>
                          <label htmlFor="sqft" className={labelBase}>
                            Approximate Square Footage{" "}
                            <span className="text-[#C9A96E]">*</span>
                          </label>
                          <select
                            id="sqft"
                            name="sqft"
                            value={form.sqft}
                            onChange={handleChange}
                            className={selectBase}
                          >
                            <option value="" disabled>
                              Select range
                            </option>
                            {sqftOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {stepErrors.sqft && (
                            <p className="mt-1 text-xs text-red-400">
                              {stepErrors.sqft}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Next button */}
                      <button
                        type="button"
                        onClick={goNext}
                        className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A96E] px-6 py-3.5 text-sm font-semibold text-[#1A1A2E] transition-all hover:bg-[#d4b87e] hover:shadow-lg"
                      >
                        Next
                        <ArrowRight className="size-4" />
                      </button>
                    </div>

                    {/* ====== STEP 2: Contact Info ====== */}
                    <div className="w-1/2 px-8 pb-8 pt-6">
                      <h2 className="font-heading text-lg font-bold text-white">
                        Contact Information
                      </h2>
                      <p className="mt-1 text-xs text-white/40">
                        How should we deliver your valuation report?
                      </p>

                      <div className="mt-6 space-y-5">
                        {/* Name row */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="firstName" className={labelBase}>
                              First Name{" "}
                              <span className="text-[#C9A96E]">*</span>
                            </label>
                            <input
                              id="firstName"
                              name="firstName"
                              type="text"
                              autoComplete="given-name"
                              value={form.firstName}
                              onChange={handleChange}
                              placeholder="Jane"
                              className={inputBase}
                            />
                            {stepErrors.firstName && (
                              <p className="mt-1 text-xs text-red-400">
                                {stepErrors.firstName}
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="lastName" className={labelBase}>
                              Last Name{" "}
                              <span className="text-[#C9A96E]">*</span>
                            </label>
                            <input
                              id="lastName"
                              name="lastName"
                              type="text"
                              autoComplete="family-name"
                              value={form.lastName}
                              onChange={handleChange}
                              placeholder="Smith"
                              className={inputBase}
                            />
                            {stepErrors.lastName && (
                              <p className="mt-1 text-xs text-red-400">
                                {stepErrors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className={labelBase}>
                            Email Address{" "}
                            <span className="text-[#C9A96E]">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="jane@example.com"
                            className={inputBase}
                          />
                          {stepErrors.email && (
                            <p className="mt-1 text-xs text-red-400">
                              {stepErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className={labelBase}>
                            Phone{" "}
                            <span className="text-[#C9A96E]">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="(215) 555-0100"
                            className={inputBase}
                          />
                          {stepErrors.phone && (
                            <p className="mt-1 text-xs text-red-400">
                              {stepErrors.phone}
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className={labelBase}>
                            Notes{" "}
                            <span className="text-white/30">(optional)</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={2}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Recent renovations, timeline to sell..."
                            className={`${inputBase} resize-none`}
                          />
                        </div>

                        {/* Turnstile */}
                        <Turnstile
                          onVerify={setTurnstileToken}
                          onExpire={() => setTurnstileToken("")}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="mt-8 flex gap-3">
                        <button
                          type="button"
                          onClick={goBack}
                          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-5 py-3.5 text-sm font-semibold text-white/60 transition-all hover:border-white/20 hover:text-white"
                        >
                          <ArrowLeft className="size-4" />
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={state === "submitting" || !turnstileToken}
                          className="flex-1 rounded-lg bg-[#C9A96E] px-6 py-3.5 text-sm font-semibold text-[#1A1A2E] transition-all hover:bg-[#d4b87e] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {state === "submitting"
                            ? "Submitting..."
                            : "Get My Free Estimate"}
                        </button>
                      </div>

                      <p className="mt-4 text-center text-[11px] text-white/30">
                        Free. No obligation. By submitting, you agree to our{" "}
                        <a
                          href="/privacy"
                          className="text-[#C9A96E]/60 hover:underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* -- How It Works ------------------------------------------ */}
      <section className="bg-[#1A1A2E] pb-20 pt-4">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
              Simple Process
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              How It Works
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {processSteps.map((s) => (
              <div key={s.number} className="text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#C9A96E]/10">
                  <s.icon className="size-5 text-[#C9A96E]" />
                </div>
                <p className="mt-3 font-heading text-xl font-bold text-[#C9A96E]">
                  {s.number}
                </p>
                <h3 className="mt-1 font-heading text-base font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
