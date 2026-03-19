"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { LeadPayload } from "@/app/api/leads/route";
import { useUtm } from "@/hooks/useUtm";

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const utm = useUtm();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!form.firstName || form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }
    if (!form.lastName || form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!form.phone || form.phone.trim().length < 10) {
      newErrors.phone = "Phone number must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setFormState("submitting");

    const payload: LeadPayload = {
      type: "contact",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
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

      setFormState("success");
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setFormState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-gold/10">
          <CheckCircle className="size-8 text-gold" />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">
          Message Sent!
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          We&apos;ll be in touch within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setFormState("idle")}
          className="mt-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <h2 className="font-heading text-2xl font-bold text-foreground">
          Send a Message
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We typically respond within one business day.
        </p>
      </div>

      {formState === "error" && (
        <div className="flex items-start gap-2.5 rounded-lg border border-red-400/40 bg-red-400/10 p-3.5">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{errorMsg || "Something went wrong"}</p>
        </div>
      )}

      {/* Name row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block font-label text-xs font-medium uppercase tracking-wider text-foreground">
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
            className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
          />
          {errors.firstName && (
            <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block font-label text-xs font-medium uppercase tracking-wider text-foreground">
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
            className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
          />
          {errors.lastName && (
            <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block font-label text-xs font-medium uppercase tracking-wider text-foreground">
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
          className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block font-label text-xs font-medium uppercase tracking-wider text-foreground">
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
          className="w-full rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block font-label text-xs font-medium uppercase tracking-wider text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          className="w-full resize-none rounded-lg border border-border/40 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-all duration-300 focus:shadow-[0_0_0_3px_rgba(201,169,110,0.1)]"
        />
      </div>

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="shimmer-gold min-h-[48px] w-full rounded-lg bg-gold px-6 py-3 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formState === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="text-gold hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
