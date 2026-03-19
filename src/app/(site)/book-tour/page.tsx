"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Home, User } from "lucide-react";
import { TourBookingForm } from "@/components/tour-booking-form";

const infoBanner = [
  { icon: Calendar, label: "Flexible Scheduling", desc: "Choose a date and time that works for you" },
  { icon: Home, label: "Private Showings", desc: "One-on-one tours at your own pace" },
  { icon: User, label: "Expert Agents", desc: "Guided by Philadelphia's top specialists" },
];

const steps = [
  { num: "1", title: "Choose Your Property & Time", desc: "Browse our listings and pick a convenient slot." },
  { num: "2", title: "Meet Your Tauro Agent", desc: "A dedicated agent will greet you at the property." },
  { num: "3", title: "Explore at Your Pace", desc: "Take your time, ask questions, and envision your future home." },
];

function BookTourContent() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("property") ?? undefined;

  return (
    <>
      {/* -- Hero -- */}
      <section className="relative overflow-hidden bg-near-black pb-12 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Schedule a Visit
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">
            Book a Tour
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Schedule a private showing of any Philadelphia property with a Tauro
            Real Estate agent. Pick your property, choose a date and time, and
            we&apos;ll handle the rest.
          </p>
        </div>
      </section>

      {/* -- Info Banner -- */}
      <section className="bg-near-black pb-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border/40 bg-card p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              {infoBanner.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <item.icon className="size-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- Form Section -- */}
      <section className="bg-midnight py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-border/40 bg-card p-8">
            <TourBookingForm preselectedPropertyId={propertyId} />
          </div>
        </div>
      </section>

      {/* -- Trust Section: What to Expect -- */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            What to Expect
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            From booking to walking through the front door, we make the process seamless.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-near-black">
                  {step.num}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function BookTourPage() {
  return (
    <Suspense fallback={null}>
      <BookTourContent />
    </Suspense>
  );
}
