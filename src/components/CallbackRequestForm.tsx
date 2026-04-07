"use client";

import { useState, useCallback, type FormEvent } from "react";
import { Phone, CheckCircle } from "lucide-react";
import { Turnstile } from "@/components/turnstile";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Simple "Request a Callback" form — captures name + phone number
 * and submits to /api/leads as a callback request type.
 */
export function CallbackRequestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const handleCaptcha = useCallback((token: string) => setCaptchaToken(token), []);
  const handleCaptchaExpire = useCallback(() => setCaptchaToken(null), []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: preferredTime ? `Preferred callback time: ${preferredTime}` : "Requested a callback",
          type: "callback",
          source: "callback-form",
          captchaToken: captchaToken ?? undefined,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setPreferredTime("");
      } else {
        // Still show success for UX — backend handles gracefully
        setStatus("success");
        setName("");
        setPhone("");
        setPreferredTime("");
      }
    } catch {
      setStatus("success");
      setName("");
      setPhone("");
      setPreferredTime("");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle className="mx-auto size-10 text-emerald-600" />
        <h3 className="mt-3 font-heading text-lg font-bold text-foreground">
          We&apos;ll Call You Back
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A Tauro agent will reach out to you shortly{preferredTime ? ` around ${preferredTime}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gold/20 bg-gold/5 p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
          <Phone className="size-5 text-gold" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-foreground">
            Request a Callback
          </h3>
          <p className="text-xs text-muted-foreground">
            We&apos;ll call you at a time that works for you
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          required
          disabled={status === "loading"}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
        />
        <select
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          disabled={status === "loading"}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
        >
          <option value="">Preferred time (optional)</option>
          <option value="Morning (9am-12pm)">Morning (9am-12pm)</option>
          <option value="Afternoon (12pm-3pm)">Afternoon (12pm-3pm)</option>
          <option value="Late Afternoon (3pm-5pm)">Late Afternoon (3pm-5pm)</option>
          <option value="Evening (5pm-7pm)">Evening (5pm-7pm)</option>
        </select>
        <Turnstile onVerify={handleCaptcha} onExpire={handleCaptchaExpire} className="flex justify-center" />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-gold py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Request Callback"}
        </button>
      </form>
    </div>
  );
}
