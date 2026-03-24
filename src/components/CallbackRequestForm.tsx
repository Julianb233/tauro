"use client";

import { useState } from "react";
import { Phone, CheckCircle, Loader2 } from "lucide-react";
import type { LeadPayload } from "@/app/api/leads/route";
import { useUtm } from "@/hooks/useUtm";

type FormState = "idle" | "submitting" | "success" | "error";

const TIME_SLOTS = [
  "Morning (9am–12pm)",
  "Afternoon (12pm–3pm)",
  "Late Afternoon (3pm–5pm)",
  "Evening (5pm–7pm)",
];

export function CallbackRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const utm = useUtm();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMsg("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg("Please enter a valid phone number");
      return;
    }

    setFormState("submitting");

    const [firstName, ...rest] = name.trim().split(" ");
    const payload: LeadPayload = {
      type: "callback",
      firstName,
      lastName: rest.join(" ") || firstName,
      email: "callback@taurorealty.com",
      phone: phone.trim(),
      message: `Callback request — preferred time: ${preferredTime || "Any time"}`,
      preferredTime: preferredTime || undefined,
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
    } catch (err) {
      setFormState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle className="size-6 text-emerald-500" />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground">
          We&apos;ll call you soon!
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          One of our agents will reach out
          {preferredTime ? ` during ${preferredTime.toLowerCase()}` : " shortly"}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
          <Phone className="size-5 text-gold" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            Have an Agent Call You
          </h3>
          <p className="text-sm text-muted-foreground">
            Quick callback — no waiting on hold.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="cb-name" className="mb-1 block text-xs font-medium text-muted-foreground">
            Your Name
          </label>
          <input
            id="cb-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            disabled={formState === "submitting"}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="cb-phone" className="mb-1 block text-xs font-medium text-muted-foreground">
            Phone Number
          </label>
          <input
            id="cb-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(215) 555-0123"
            disabled={formState === "submitting"}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="cb-time" className="mb-1 block text-xs font-medium text-muted-foreground">
            Best Time to Call
          </label>
          <select
            id="cb-time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            disabled={formState === "submitting"}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
          >
            <option value="">Any time</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {errorMsg && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={formState === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:opacity-50"
        >
          {formState === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Phone className="size-4" />
              Request Callback
            </>
          )}
        </button>
      </form>
    </div>
  );
}
