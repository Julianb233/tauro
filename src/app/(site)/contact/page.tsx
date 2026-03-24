"use client";

import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "(215) 839-4172",
    href: "tel:+12158394172",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@taurorealty.com",
    href: "mailto:info@taurorealty.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Philadelphia, PA",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon\u2013Sat 9am\u20137pm",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Get in Touch
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl">
            Contact Tauro
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Whether you&apos;re buying, selling, or just exploring, we&apos;re here to
            help.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="cv-auto bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left column — Form (3/5) */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/40 bg-white p-8 shadow-xl">
                <ContactForm />
              </div>
            </div>

            {/* Right column — Contact info (2/5) */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Contact Information
                </h2>
                <div className="mt-5 space-y-5">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                        <item.icon className="size-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-foreground font-medium transition-colors hover:text-gold"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Other Ways We Can Help
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    { label: "Schedule a Property Showing", href: "/book-tour" },
                    { label: "Get a Free Home Valuation", href: "/sell" },
                    { label: "Browse Our Listings", href: "/properties" },
                    { label: "Meet Our Agents", href: "/agents" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg border border-border/40 px-4 py-3 transition-all hover:border-gold/40 hover:bg-cream"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-white">
                          {link.label}
                        </span>
                        <ArrowRight className="size-4 text-gold opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
