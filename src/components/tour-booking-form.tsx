"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Home, User, CheckCircle, AlertCircle } from "lucide-react";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import type { LeadPayload } from "@/app/api/leads/route";

type FormState = "idle" | "submitting" | "success" | "error";

interface TourFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  preferredDate: string;
  preferredTime: string;
  agentPreference: string;
  message: string;
}

const initialForm: TourFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  propertyId: "",
  preferredDate: "",
  preferredTime: "",
  agentPreference: "",
  message: "",
};

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMaxDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
}

interface TourBookingFormProps {
  preselectedPropertyId?: string;
}

export function TourBookingForm({ preselectedPropertyId }: TourBookingFormProps) {
  const [form, setForm] = useState<TourFormData>(() => ({
    ...initialForm,
    propertyId: preselectedPropertyId ?? "",
  }));
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const selectedProperty = properties.find((p) => p.id === form.propertyId);
    const propertyAddress = selectedProperty
      ? `${selectedProperty.address}, ${selectedProperty.city}, ${selectedProperty.state}`
      : undefined;

    const payload: LeadPayload = {
      type: "showing",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      propertyId: form.propertyId || undefined,
      propertyAddress,
      preferredDate: form.preferredDate || undefined,
      preferredTime: form.preferredTime || undefined,
      agentPreference: form.agentPreference || undefined,
      message: form.message || undefined,
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

  const selectedProperty = properties.find((p) => p.id === form.propertyId);

  if (state === "success") {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-gold/10">
          <CheckCircle className="size-10 text-gold" />
        </div>
        <h3 className="mt-6 font-heading text-2xl font-bold text-white sm:text-3xl">
          Showing Request Received!
        </h3>
        <p className="mt-3 max-w-sm text-muted-foreground">
          Your tour request has been submitted. An agent will reach out within
          24 hours to confirm your showing.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setState("idle")}
            className="rounded-lg border border-gold px-5 py-2.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
          >
            Book Another Tour
          </button>
          <a
            href="/properties"
            className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light"
          >
            Browse More Listings
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-0">
      <h2 className="font-heading text-2xl font-bold text-white">
        Schedule Your Showing
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        All fields marked with <span className="text-gold">*</span> are required.
      </p>

      {state === "error" && (
        <div className="mt-5 flex items-start gap-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{errorMsg}</p>
        </div>
      )}

      {/* -- Section: Property -- */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gold/10">
            <Home className="size-4 text-gold" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Property
          </h3>
        </div>

        <div>
          <label htmlFor="propertyId" className="mb-1.5 block text-sm font-medium text-white">
            Select Property <span className="text-gold">*</span>
          </label>
          <select
            id="propertyId"
            name="propertyId"
            required
            value={form.propertyId}
            onChange={handleChange}
            className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
          >
            <option value="" className="text-muted-foreground">
              Choose a property...
            </option>
            {properties.map((p) => (
              <option key={p.id} value={p.id} className="bg-midnight text-white">
                {p.address}, {p.city} — ${p.price.toLocaleString()}
              </option>
            ))}
            <option value="other" className="bg-midnight text-white">
              Other / Not Listed
            </option>
          </select>
        </div>

        {selectedProperty && (
          <div className="mt-3 flex items-center gap-4 rounded-lg border border-gold/20 bg-midnight p-3">
            <Image
              src={selectedProperty.images[0]}
              alt={selectedProperty.address}
              width={80}
              height={64}
              className="shrink-0 rounded-md object-cover"
              sizes="80px"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {selectedProperty.address}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedProperty.city}, {selectedProperty.state} &middot;{" "}
                {selectedProperty.beds}bd / {selectedProperty.baths}ba
              </p>
              <p className="mt-0.5 text-sm font-bold text-gold">
                ${selectedProperty.price.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* -- Section: Date & Time -- */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gold/10">
            <Calendar className="size-4 text-gold" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Date &amp; Time
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium text-white">
              Preferred Date <span className="text-gold">*</span>
            </label>
            <input
              id="preferredDate"
              name="preferredDate"
              type="date"
              required
              min={getMinDate()}
              max={getMaxDate()}
              value={form.preferredDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20 [color-scheme:dark]"
            />
          </div>
          <div>
            <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-medium text-white">
              Preferred Time <span className="text-gold">*</span>
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              required
              value={form.preferredTime}
              onChange={handleChange}
              className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            >
              <option value="" className="text-muted-foreground">
                Choose a time...
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot} className="bg-midnight text-white">
                  {slot}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/40 bg-midnight p-3">
          <Clock className="size-4 shrink-0 text-gold" />
          <p className="text-xs text-muted-foreground">
            Showings are typically 30-60 minutes. An agent will confirm availability after submission.
          </p>
        </div>
      </div>

      {/* -- Section: Your Info -- */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-gold/10">
            <User className="size-4 text-gold" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Your Information
          </h3>
        </div>

        <div className="space-y-4">
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

          <div>
            <label htmlFor="agentPreference" className="mb-1.5 block text-sm font-medium text-white">
              Agent Preference <span className="text-xs text-muted-foreground">(optional)</span>
            </label>
            <select
              id="agentPreference"
              name="agentPreference"
              value={form.agentPreference}
              onChange={handleChange}
              className="w-full rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            >
              <option value="" className="text-muted-foreground">
                No preference (first available)
              </option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.fullName} className="bg-midnight text-white">
                  {agent.fullName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-white">
              Any special requests or questions?
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="Accessibility needs, specific features you'd like to see, or any other questions..."
              className="w-full resize-none rounded-lg border border-border/40 bg-midnight px-4 py-2.5 text-sm text-white placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="w-full rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Submitting..." : "Request Showing"}
        </button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="text-gold hover:underline">
            Privacy Policy
          </a>
          . Your showing will be confirmed within 24 hours.
        </p>
      </div>
    </form>
  );
}
