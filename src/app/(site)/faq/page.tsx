"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

interface FaqItem {
  question: string;
  answer: string;
}

const buyerFaqs: FaqItem[] = [
  {
    question: "How much do I need for a down payment?",
    answer:
      "It depends on the loan type. Conventional mortgages typically require 3-20% down. FHA loans require as little as 3.5%, and VA loans offer 0% down for eligible veterans. Pennsylvania also has first-time buyer assistance programs that can help with down payment and closing costs. A Tauro agent can connect you with trusted lenders who specialize in these programs.",
  },
  {
    question: "How long does the home buying process take?",
    answer:
      "From accepted offer to closing, the process typically takes 30-60 days. However, getting pre-approved, searching for a home, and making offers can add several weeks. Getting pre-approved before you start looking helps expedite the process and makes your offers more competitive in Philadelphia's market.",
  },
  {
    question: "What credit score do I need to buy a home?",
    answer:
      "Most conventional lenders require a minimum score of 620, while FHA loans may accept scores as low as 580. A higher credit score generally means better interest rates and lower monthly payments. If your score needs improvement, we can recommend credit counseling resources to help you get mortgage-ready.",
  },
  {
    question: "Do I need a real estate agent to buy a home?",
    answer:
      "While not legally required, having a buyer's agent is strongly recommended. Your agent represents your interests exclusively, provides market expertise, negotiates on your behalf, and guides you through inspections and closing. In most transactions, the seller pays the buyer agent's commission, so representation comes at no direct cost to you.",
  },
  {
    question: "What are closing costs?",
    answer:
      "Closing costs typically range from 2-5% of the purchase price. They include lender fees (origination, appraisal, credit report), title insurance, attorney fees, transfer taxes, recording fees, and prepaid items like homeowner's insurance and property taxes. Your lender will provide a detailed estimate early in the process.",
  },
  {
    question: "What's the difference between pre-qualification and pre-approval?",
    answer:
      "Pre-qualification is a quick, informal estimate of what you might afford based on self-reported financial information. Pre-approval is a formal process where a lender verifies your income, assets, credit, and employment to issue a conditional commitment for a specific loan amount. In competitive markets like Philadelphia, sellers strongly prefer offers backed by a pre-approval letter.",
  },
];

const sellerFaqs: FaqItem[] = [
  {
    question: "How much is my home worth?",
    answer:
      "Home value depends on location, condition, recent comparable sales, and current market conditions. A Tauro agent will prepare a Comparative Market Analysis (CMA) that examines recent sales of similar homes in your neighborhood to determine an accurate market value. Get a free, no-obligation valuation on our home value page.",
  },
  {
    question: "How long will it take to sell my home?",
    answer:
      "In Philadelphia, the average days on market is approximately 28 days, though this varies by neighborhood, price point, and season. Well-priced homes in desirable areas can sell in under a week. Factors like condition, staging, marketing, and pricing strategy all affect how quickly your home sells.",
  },
  {
    question: "What does Tauro charge in commission?",
    answer:
      "Tauro offers competitive commission rates tailored to your property and situation. Our commission covers professional photography, 3D tours, targeted digital marketing, MLS listing, open houses, and expert negotiation. We believe in transparent pricing and will discuss all costs upfront during your listing consultation.",
  },
  {
    question: "Should I make repairs before listing?",
    answer:
      "Strategic repairs and updates can significantly impact your sale price and speed. High-ROI improvements include fresh paint, updated fixtures, landscaping, and addressing any deferred maintenance. Tauro provides concierge guidance to help you prioritize which improvements will give you the best return on investment.",
  },
  {
    question: "What happens if I get multiple offers?",
    answer:
      "Multiple offers are a great position to be in. Your Tauro agent will present all offers side by side, analyzing not just price but also contingencies, financing strength, closing timeline, and escalation clauses. We'll guide you through a strategic review process to select the strongest overall offer or negotiate counteroffers to maximize your outcome.",
  },
  {
    question: "Can I sell my home if I still have a mortgage?",
    answer:
      "Absolutely. Most homeowners sell with an existing mortgage. At closing, the proceeds from the sale first pay off your remaining mortgage balance, then cover closing costs and commissions. The remainder is your net proceeds. Your Tauro agent can help you estimate your net proceeds so you know what to expect before listing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FaqPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <>
      {/* -- Hero ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-near-black pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            FAQ
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
            Answers to common questions about buying, selling, and working with
            Tauro.
          </p>
        </div>
      </section>

      {/* -- FAQ Accordion ------------------------------------------- */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Buyers */}
          <div>
            <h2 className="font-heading text-xl font-bold text-gold mb-6">
              For Buyers
            </h2>
            <div className="space-y-0">
              {buyerFaqs.map((faq, i) => {
                const key = `buyer-${i}`;
                const isOpen = openItems.has(key);
                return (
                  <div key={key} className="border-b border-border/30">
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-gold transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-sm leading-relaxed text-muted-foreground max-w-3xl">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sellers */}
          <div className="mt-14">
            <h2 className="font-heading text-xl font-bold text-gold mb-6">
              For Sellers
            </h2>
            <div className="space-y-0">
              {sellerFaqs.map((faq, i) => {
                const key = `seller-${i}`;
                const isOpen = openItems.has(key);
                return (
                  <div key={key} className="border-b border-border/30">
                    <button
                      type="button"
                      onClick={() => toggleItem(key)}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-medium text-white pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`size-5 shrink-0 text-gold transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-sm leading-relaxed text-muted-foreground max-w-3xl">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -- CTA ----------------------------------------------------- */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Our team is here to help. Reach out directly or get a free home
            valuation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/home-value"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Get Free Valuation
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
