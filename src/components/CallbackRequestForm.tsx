"use client";

import { useState } from "react";
import { Phone, Check, Clock } from "lucide-react";

interface CallbackRequestFormProps {
  source?: string;
  /** Optional address/listing context to pre-fill message */
  context?: string;
  compact?: boolean;
}

const TIME_SLOTS = [
  { value: "morning", label: "Morning (9am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–5pm)" },
  { value: "evening", label: "Evening (5pm–7pm)" },
];

export default function CallbackRequestForm({
  source = "callback-form",
  context,
  compact = false,
}: CallbackRequestFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("morning");
  const [note, setNote] = useState(context ?? "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          message: `Callback request — preferred time: ${time}${note ? `. Note: ${note}` : ""}`,
          source,
          type: "callback",
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className={`rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center ${compact ? "" : "py-8"}`}>
        <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="size-6 text-emerald-400" />
        </div>
        <p className="font-heading text-base font-bold text-foreground">
          Request Received
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll call you back during your preferred window.
        </p>
        <button
          onClick={() => { setSuccess(false); setName(""); setPhone(""); setNote(context ?? ""); }}
          className="mt-4 text-sm font-medium text-gold transition-colors hover:text-gold/80"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!compact && (
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-gold/10">
            <Phone className="size-4 text-gold" strokeWidth={1.5} />
          </div>
          <div>
            <p className="font-heading text-base font-semibold text-foreground">
              Request a Callback
            </p>
            <p className="text-xs text-muted-foreground">
              We&apos;ll call you at a time that works for you.
            </p>
          </div>
        </div>
      )}

      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground/80">
            Your Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            required
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground/80">
            Phone Number <span className="text-gold">*</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(215) 555-0000"
            required
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/80">
          <Clock className="size-3 text-gold" />
          Preferred Call Window
        </label>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => setTime(slot.value)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                time === slot.value
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border bg-background text-muted-foreground hover:border-gold/30 hover:text-foreground"
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      {!compact && (
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground/80">
            Note (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Let us know what you'd like to discuss..."
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
          />
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading || !name.trim() || !phone.trim()}
        className="w-full rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Request Callback"}
      </button>
    </form>
  );
}
