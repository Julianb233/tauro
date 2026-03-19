"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ChevronDown,
  Instagram,
  Facebook,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

/* ─── Contact Methods ─── */
const contactMethods = [
  {
    icon: Phone,
    label: "Phone",
    value: "(215) 839-4172",
    href: "tel:+12158394172",
    description: "Call or text anytime",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@taurorealty.com",
    href: "mailto:info@taurorealty.com",
    description: "We respond within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "1500 Market St, Philadelphia, PA 19102",
    href: "https://www.openstreetmap.org/?mlat=39.9526&mlon=-75.1652#map=17/39.9526/-75.1652",
    description: "Center City Philadelphia",
  },
];

/* ─── Office Hours ─── */
const officeHours = [
  { day: "Monday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Friday", hours: "9:00 AM \u2013 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM \u2013 4:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
];

/* ─── Social Media Links ─── */
const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/taurorealty",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/taurorealty",
  },
];

/* ─── Contact FAQ ─── */
const contactFaqs = [
  {
    question: "How quickly can I expect a response after reaching out?",
    answer:
      "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, calling our office directly is the fastest way to reach us. Our agents are also available via text for quick questions.",
  },
  {
    question: "Do I need an appointment to visit the office?",
    answer:
      "Walk-ins are welcome during our regular office hours. However, we recommend scheduling an appointment to ensure an agent is available to give you their full attention, especially if you have specific properties or neighborhoods in mind.",
  },
  {
    question: "What areas of Philadelphia does Tauro serve?",
    answer:
      "Tauro serves all of Philadelphia and the surrounding suburbs, including Center City, Rittenhouse Square, Fishtown, Northern Liberties, Old City, University City, Manayunk, Chestnut Hill, and the Main Line. We also assist with relocations from other cities.",
  },
  {
    question: "Is there any cost for an initial consultation?",
    answer:
      "Absolutely not. Your first consultation is completely free with no obligation. We believe in building relationships first. Whether you are buying, selling, or just exploring your options, we are happy to sit down and discuss your real estate goals.",
  },
  {
    question: "Can I work with a specific agent at Tauro?",
    answer:
      "Yes! You can request a specific agent when you contact us. Visit our Agents page to browse our team and their specialties. If you are not sure who would be the best fit, we will match you with an agent based on your needs and preferred neighborhoods.",
  },
];

/* ─── FAQ Accordion Item ─── */
function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border/30 transition-colors hover:border-gold/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-medium text-foreground">
          {faq.question}
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="max-w-3xl pb-5 text-sm leading-relaxed text-muted-foreground">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Custom SVG Icons (not available in Lucide) ─── */
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/* ─── Main Page Component ─── */
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Get in Touch
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Contact Tauro
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Whether you&apos;re buying, selling, or just exploring, we&apos;re
            here to help. Reach out and let&apos;s start the conversation.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left column — Form (3/5) */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/40 bg-white p-8 shadow-xl">
                <ContactForm />
              </div>
            </div>

            {/* Right column — Contact info + hours (2/5) */}
            <div className="space-y-6 lg:col-span-2">
              {/* Contact Methods */}
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Contact Information
                </h2>
                <div className="mt-5 space-y-5">
                  {contactMethods.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                        <item.icon className="size-5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <a
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="font-medium text-foreground transition-colors hover:text-gold"
                        >
                          {item.value}
                        </a>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media Links */}
                <div className="mt-6 border-t border-border/30 pt-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Follow Us
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow Tauro on ${social.label}`}
                        className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                      >
                        <social.icon className="size-5" />
                      </a>
                    ))}
                    <a
                      href="https://twitter.com/taurorealty"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow Tauro on X"
                      className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                    >
                      <XIcon className="size-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/taurorealty"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Follow Tauro on LinkedIn"
                      className="flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-gold/40 hover:bg-gold/10 hover:text-gold"
                    >
                      <LinkedInIcon className="size-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <Clock className="size-5 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    Office Hours
                  </h3>
                </div>
                <table className="mt-4 w-full">
                  <tbody>
                    {officeHours.map((row) => {
                      const isToday =
                        new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                        }) === row.day;
                      return (
                        <tr
                          key={row.day}
                          className={`border-b border-border/20 last:border-0 ${isToday ? "font-semibold text-gold" : ""}`}
                        >
                          <td className="py-2.5 text-sm">{row.day}</td>
                          <td className="py-2.5 text-right text-sm">
                            {row.hours}
                            {isToday && (
                              <span className="ml-2 inline-block size-2 rounded-full bg-green-500" />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Quick links */}
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Other Ways We Can Help
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    {
                      label: "Schedule a Property Showing",
                      href: "/book-tour",
                    },
                    { label: "Get a Free Home Valuation", href: "/sell" },
                    { label: "Browse Our Listings", href: "/properties" },
                    { label: "Meet Our Agents", href: "/agents" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center justify-between rounded-lg border border-border/40 px-4 py-3 transition-all hover:border-gold/40 hover:bg-cream"
                      >
                        <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
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

      {/* Embedded OpenStreetMap */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Our Location
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Visit Our Office
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Located in the heart of Center City Philadelphia, our office is
              easily accessible by public transit and has nearby parking.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border/40 shadow-xl">
            <iframe
              title="Tauro Realty office location on OpenStreetMap"
              width="100%"
              height="450"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-75.1720%2C39.9490%2C-75.1580%2C39.9560&layer=mapnik&marker=39.9526%2C-75.1652"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-gold" />
            <span>1500 Market St, Philadelphia, PA 19102</span>
            <span className="text-border">|</span>
            <a
              href="https://www.openstreetmap.org/?mlat=39.9526&mlon=-75.1652#map=17/39.9526/-75.1652"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold transition-colors hover:text-gold-dark"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              FAQ
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Common Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Everything you need to know about contacting and working with
              Tauro.
            </p>
          </div>
          <div className="mt-10">
            {contactFaqs.map((faq, i) => (
              <FaqAccordionItem
                key={i}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Have a different question?{" "}
              <a
                href="/faq"
                className="font-medium text-gold transition-colors hover:text-gold-dark"
              >
                View all FAQs
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
