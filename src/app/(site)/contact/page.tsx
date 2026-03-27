"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, ArrowRight, ChevronDown } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";

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
    value: "1500 Walnut St, Suite 500, Philadelphia, PA 19102",
    href: "https://maps.google.com/?q=1500+Walnut+St+Philadelphia+PA+19102",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon\u2013Fri 9am\u20137pm \u00b7 Sat 10am\u20135pm \u00b7 Sun by appointment",
    href: null,
  },
];

const officeHours = [
  { day: "Monday", hours: "9:00 AM \u2013 7:00 PM" },
  { day: "Tuesday", hours: "9:00 AM \u2013 7:00 PM" },
  { day: "Wednesday", hours: "9:00 AM \u2013 7:00 PM" },
  { day: "Thursday", hours: "9:00 AM \u2013 7:00 PM" },
  { day: "Friday", hours: "9:00 AM \u2013 7:00 PM" },
  { day: "Saturday", hours: "10:00 AM \u2013 5:00 PM" },
  { day: "Sunday", hours: "By Appointment" },
];

const faqs = [
  {
    q: "How do I schedule a property showing?",
    a: "You can schedule a showing by calling us at (215) 839-4172, filling out the contact form above, or visiting any property listing page and clicking 'Schedule a Tour.' Our agents are available seven days a week.",
  },
  {
    q: "What areas of Philadelphia do you serve?",
    a: "We specialize in premium properties throughout Philadelphia including Rittenhouse Square, Society Hill, Fishtown, Northern Liberties, Center City, Chestnut Hill, Manayunk, and the surrounding Main Line suburbs.",
  },
  {
    q: "How much does it cost to work with a Tauro agent?",
    a: "For buyers, our services are typically free \u2014 the seller pays the commission. For sellers, we offer competitive commission structures. Contact us for a personalized consultation.",
  },
  {
    q: "Can I get a free home valuation?",
    a: "Absolutely. Visit our Sell page or contact us directly for a complimentary comparative market analysis (CMA) of your property. Our agents use local market data and recent comparable sales to provide an accurate estimate.",
  },
  {
    q: "Do you handle rental properties?",
    a: "While our primary focus is residential sales, we do assist with select luxury rental placements. Contact us to discuss your specific needs.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/40 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground">{q}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-gold transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

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
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Whether you&apos;re buying, selling, or just exploring, we&apos;re here to
            help.
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
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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

                {/* Social links */}
                <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5">
                  <span className="text-xs font-medium text-muted-foreground">Follow us:</span>
                  <a
                    href="https://instagram.com/taurorealty"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors hover:bg-gold hover:text-near-black"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a
                    href="https://facebook.com/taurorealty"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors hover:bg-gold hover:text-near-black"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/taurorealty"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex size-9 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors hover:bg-gold hover:text-near-black"
                  >
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>

              {/* Office hours */}
              <div className="rounded-xl border border-border/40 bg-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Office Hours
                </h3>
                <div className="mt-4 space-y-2">
                  {officeHours.map((row) => {
                    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
                    const isToday = row.day === today;
                    return (
                      <div
                        key={row.day}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                          isToday ? "bg-gold/10 font-semibold text-foreground" : "text-muted-foreground",
                        )}
                      >
                        <span>{row.day}{isToday && " (Today)"}</span>
                        <span>{row.hours}</span>
                      </div>
                    );
                  })}
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

      {/* Embedded Map */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Visit Our Office
            </h2>
            <p className="mt-2 text-muted-foreground">
              1500 Walnut Street, Suite 500 &middot; Philadelphia, PA 19102
            </p>
            <a
              href="https://maps.google.com/?q=1500+Walnut+St+Philadelphia+PA+19102"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-light"
            >
              <MapPin className="size-4" />
              Get Directions
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/40 shadow-lg">
            <iframe
              title="Tauro Realty office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.65!2d-75.168!3d39.9498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c63c0adee0d5%3A0x3c1e7e8d0c0e3c3e!2s1500+Walnut+St%2C+Philadelphia%2C+PA+19102!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Quick answers to common questions about working with Tauro.
            </p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-white px-6">
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
