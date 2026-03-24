"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";

function FaqSection({ title, faqs, prefix, openItems, onToggle }: { title: string; faqs: FaqItem[]; prefix: string; openItems: Set<string>; onToggle: (key: string) => void }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-gold mb-6">{title}</h2>
      <div className="space-y-0">
        {faqs.map((faq, i) => {
          const key = `${prefix}-${i}`;
          const isOpen = openItems.has(key);
          return (
            <div key={key} className="glass-accordion border-b border-border/30">
              <button type="button" onClick={() => onToggle(key)} className="flex w-full items-center justify-between py-5 text-left">
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown className={`size-5 shrink-0 text-gold transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden"><div className="pb-5 text-sm leading-relaxed text-muted-foreground max-w-3xl">{faq.answer}</div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function FaqClient({ buyerFaqs, sellerFaqs, generalFaqs }: { buyerFaqs: FaqItem[]; sellerFaqs: FaqItem[]; generalFaqs: FaqItem[] }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  function toggleItem(key: string) { setOpenItems((prev) => { const next = new Set(prev); if (next.has(key)) { next.delete(key); } else { next.add(key); } return next; }); }

  return (
    <>
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32"><div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" /><div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">FAQ</p><h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Frequently Asked Questions</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">Answers to common questions about buying, selling, and working with Tauro.</p></div></section>
      <section className="bg-cream py-20"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><FaqSection title="For Buyers" faqs={buyerFaqs} prefix="buyer" openItems={openItems} onToggle={toggleItem} /><div className="mt-14"><FaqSection title="For Sellers" faqs={sellerFaqs} prefix="seller" openItems={openItems} onToggle={toggleItem} /></div><div className="mt-14"><FaqSection title="General Questions" faqs={generalFaqs} prefix="general" openItems={openItems} onToggle={toggleItem} /></div></div></section>
      <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">Still Have Questions?</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Our team is here to help. Reach out directly or get a free home valuation.</p><div className="mt-8 flex flex-wrap items-center justify-center gap-4"><a href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg">Contact Us</a><a href="/home-value" className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black">Get Free Valuation</a></div></div></section>
    </>
  );
}
