"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar, Clock, Download, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { Calendar, Clock, Download, X } from "lucide-react";
import { Property } from "@/data/properties";
import { siteUrl } from "@/lib/site-config";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/* ------------------------------------------------------------------ */
/*  .ics file generator                                                */
/* ------------------------------------------------------------------ */

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function toIcsDateLocal(dateStr: string, time: string): string {
  // dateStr = "YYYY-MM-DD", time = "HH:MM"
  const [y, m, d] = dateStr.split("-");
  const [h, min] = time.split(":");
  return `${y}${m}${d}T${h}${min}00`;
}

function generateIcs(property: Property): string {
  const ev = property.openHouseEvent!;
  const location = `${property.address}, ${property.city}, ${property.state} ${property.zip}`;
  const url = `${siteUrl}/properties/${property.slug}`;
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//TAURO Realty//Open House//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART;TZID=America/Los_Angeles:${toIcsDateLocal(ev.date, ev.startTime)}`,
    `DTEND;TZID=America/Los_Angeles:${toIcsDateLocal(ev.date, ev.endTime)}`,
    `DTSTAMP:${stamp}`,
    `UID:openhouse-${property.id}-${ev.date}@tauro.realty`,
    `SUMMARY:Open House: ${property.address}`,
    `LOCATION:${location}`,
    `DESCRIPTION:Open House for ${location}. View listing: ${url}`,
    `URL:${url}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs(property: Property) {
  const ics = generateIcs(property);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `open-house-${property.slug}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function googleCalendarUrl(property: Property): string {
  const ev = property.openHouseEvent!;
  const start = toIcsDateLocal(ev.date, ev.startTime);
  const end = toIcsDateLocal(ev.date, ev.endTime);
  const location = encodeURIComponent(`${property.address}, ${property.city}, ${property.state} ${property.zip}`);
  const title = encodeURIComponent(`Open House: ${property.address}`);
  const details = encodeURIComponent(`View listing: ${siteUrl}/properties/${property.slug}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}&details=${details}`;
}

function outlookCalendarUrl(property: Property): string {
  const ev = property.openHouseEvent!;
  const location = encodeURIComponent(`${property.address}, ${property.city}, ${property.state} ${property.zip}`);
  const title = encodeURIComponent(`Open House: ${property.address}`);
  const startdt = `${ev.date}T${ev.startTime}:00`;
  const enddt = `${ev.date}T${ev.endTime}:00`;
  const body = encodeURIComponent(`View listing: ${siteUrl}/properties/${property.slug}`);
  return `https://outlook.live.com/calendar/0/action/compose?subject=${title}&startdt=${startdt}&enddt=${enddt}&location=${location}&body=${body}`;
}

/* ------------------------------------------------------------------ */
/*  Countdown hook                                                     */
/* ------------------------------------------------------------------ */

function useCountdown(targetDate: Date) {
  const calc = useCallback(() => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return null;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds };
  }, [targetDate]);

  const [countdown, setCountdown] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setCountdown(calc), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return countdown;
}

/* ------------------------------------------------------------------ */
/*  RSVP Modal                                                         */
/* ------------------------------------------------------------------ */

function RsvpModal({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const focusTrapRef = useFocusTrap(true, {
    onEscape: onClose,
    initialFocusRef: nameInputRef,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const [firstName, ...rest] = form.name.split(" ");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "open_house_rsvp" as const,
          firstName,
          lastName: rest.join(" ") || firstName,
          email: form.email,
          phone: form.phone || undefined,
          message: `RSVP for Open House on ${property.openHouse}`,
          propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
          propertyId: property.id,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-label="RSVP for Open House"
        className="relative mx-4 w-full max-w-md rounded-2xl border border-gold/30 bg-card p-6 shadow-2xl"
      >
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="RSVP for Open House">
      <div className="relative mx-4 w-full max-w-md rounded-2xl border border-gold/30 bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/20">
              <Calendar className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="font-heading text-xl font-bold">You&apos;re on the list!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;ll send you a reminder before the open house at {property.address}.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-xl font-bold">RSVP for Open House</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {property.address} &mdash; {property.openHouse}
            </p>
            <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Full Name"
                aria-label="Full Name"
                required
                disabled={submitting}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
              />
              <input
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                required
                disabled={submitting}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
              />
              <input
                type="tel"
                placeholder="Phone Number (optional)"
                aria-label="Phone Number (optional)"
                disabled={submitting}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Confirm RSVP"}
              </button>
              {error && (
                <p role="alert" className="text-center text-sm text-red-400">{error}</p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Countdown unit                                                     */
/* ------------------------------------------------------------------ */

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-heading text-2xl font-bold tabular-nums text-gold sm:text-3xl">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Banner                                                        */
/* ------------------------------------------------------------------ */

export default function OpenHouseBanner({ property }: { property: Property }) {
  const [showRsvp, setShowRsvp] = useState(false);
  const [showCalMenu, setShowCalMenu] = useState(false);

  const ev = property.openHouseEvent;
  if (!ev) return null;

  // Parse the open house start into a Date for countdown
  const [y, m, d] = ev.date.split("-").map(Number);
  const [sh, sm] = ev.startTime.split(":").map(Number);
  const startDate = new Date(y, m - 1, d, sh, sm);

  // Only show if the open house is in the future
  const now = new Date();
  if (startDate.getTime() < now.getTime()) return null;

  // Show countdown only if within 7 days
  const msUntil = startDate.getTime() - now.getTime();
  const showCountdown = msUntil <= 7 * 86400000;

  return (
    <>
      <div className="rounded-xl border-2 border-gold/40 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: event info */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/20">
              <Calendar className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                Open House
              </h3>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {property.openHouse}
              </p>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowRsvp(true)}
              className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              RSVP
            </button>
            {/* Calendar dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowCalMenu((v) => !v)}
                aria-expanded={showCalMenu}
                aria-haspopup="true"
                className="flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
              >
                <Download className="h-4 w-4" />
                Add to Calendar
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showCalMenu ? "rotate-180" : ""}`} />
              </button>
              {showCalMenu && (
                <div
                  role="menu"
                  className="absolute right-0 z-20 mt-1 min-w-[180px] rounded-lg border border-border bg-card py-1 shadow-xl"
                >
                  <button
                    role="menuitem"
                    onClick={() => { downloadIcs(property); setShowCalMenu(false); }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <Download className="h-4 w-4 shrink-0 text-gold" />
                    Apple / iCal (.ics)
                  </button>
                  <a
                    role="menuitem"
                    href={googleCalendarUrl(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCalMenu(false)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <Calendar className="h-4 w-4 shrink-0 text-gold" />
                    Google Calendar
                  </a>
                  <a
                    role="menuitem"
                    href={outlookCalendarUrl(property)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCalMenu(false)}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    <Calendar className="h-4 w-4 shrink-0 text-gold" />
                    Outlook
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Countdown */}
        {showCountdown && <CountdownDisplay targetDate={startDate} />}
      </div>

      {/* RSVP modal */}
      {showRsvp && (
        <RsvpModal property={property} onClose={() => setShowRsvp(false)} />
      )}
    </>
  );
}

/* Separate client component so the hook isn't called conditionally */
function CountdownDisplay({ targetDate }: { targetDate: Date }) {
  const countdown = useCountdown(targetDate);
  if (!countdown) return null;

  return (
    <div className="mt-4 flex items-center gap-1 border-t border-gold/20 pt-4">
      <span className="mr-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Starts in
      </span>
      <div className="flex gap-4">
        {countdown.days > 0 && (
          <CountdownUnit value={countdown.days} label="Days" />
        )}
        <CountdownUnit value={countdown.hours} label="Hrs" />
        <CountdownUnit value={countdown.minutes} label="Min" />
        <CountdownUnit value={countdown.seconds} label="Sec" />
      </div>
    </div>
  );
}
