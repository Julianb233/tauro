import type { Metadata } from "next";
import {
  DollarSign,
  FileSearch,
  Home,
  MapPin,
  ArrowRight,
  Clock,
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  ChevronDown,
  Shield,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Buyer's Guide | Tauro Realty",
  description:
    "Your complete guide to buying a home in Philadelphia. Learn the step-by-step process, first-time buyer tips, financing options, and how Tauro Realty helps you find the perfect home.",
};

const buyingSteps = [
  {
    step: 1,
    title: "Get Pre-Approved for a Mortgage",
    description:
      "Before you start touring homes, get pre-approved by a lender. Pre-approval shows sellers you're a serious, qualified buyer and gives you a clear picture of your budget. Gather your income documents, tax returns, and credit history to streamline the process.",
    timeline: "1–2 weeks",
  },
  {
    step: 2,
    title: "Find the Right Real Estate Agent",
    description:
      "Partner with an agent who knows Philadelphia inside and out. Tauro agents specialize in Philly neighborhoods from Center City to Chestnut Hill, giving you hyperlocal insight on property values, school districts, and market trends that online searches can't match.",
    timeline: "1–3 days",
  },
  {
    step: 3,
    title: "Define Your Search Criteria",
    description:
      "Work with your agent to clarify your must-haves: budget range, preferred neighborhoods, number of bedrooms, commute requirements, and lifestyle priorities. A focused search saves time and helps you act quickly in Philadelphia's competitive market.",
    timeline: "1–2 days",
  },
  {
    step: 4,
    title: "Tour Homes and Make an Offer",
    description:
      "Visit properties that meet your criteria, attend open houses, and evaluate each home's condition and potential. When you find the right one, your agent will craft a competitive offer backed by market data and negotiate terms that protect your interests.",
    timeline: "2–8 weeks",
  },
  {
    step: 5,
    title: "Home Inspection and Due Diligence",
    description:
      "Schedule a professional home inspection to uncover any hidden issues with the property's structure, systems, or safety. Review the inspection report carefully and negotiate repairs or credits with the seller before moving forward.",
    timeline: "1–2 weeks",
  },
  {
    step: 6,
    title: "Secure Your Financing",
    description:
      "Finalize your mortgage application, lock in your interest rate, and complete the appraisal process. Stay in close contact with your lender, avoid making large purchases or changing jobs, and provide any additional documentation promptly to keep your timeline on track.",
    timeline: "2–3 weeks",
  },
  {
    step: 7,
    title: "Closing Day",
    description:
      "At closing, you'll review and sign the final documents, pay your closing costs and down payment, and receive the keys to your new home. Expect the process to take one to two hours. Your agent will walk you through every document so there are no surprises.",
    timeline: "1 day",
  },
];

const firstTimeTips = [
  {
    icon: DollarSign,
    title: "Explore Down Payment Assistance",
    description:
      "Pennsylvania offers programs like the Keystone Advantage Assistance Loan and the Philly First Home program that can help cover your down payment and closing costs. Many first-time buyers qualify for as little as 3% down.",
  },
  {
    icon: FileSearch,
    title: "Understand Your Closing Costs",
    description:
      "Beyond the purchase price, expect to pay 2-5% in closing costs including title insurance, transfer taxes, lender fees, and prepaid escrow items. In Philadelphia, the transfer tax is split between buyer and seller at 2.075% each.",
  },
  {
    icon: Home,
    title: "Never Skip the Home Inspection",
    description:
      "A thorough inspection can reveal costly issues like foundation problems, outdated electrical systems, or water damage. In Philadelphia's older housing stock, this step is especially critical and can save you tens of thousands of dollars.",
  },
  {
    icon: MapPin,
    title: "Research the Neighborhood Thoroughly",
    description:
      "Visit the neighborhood at different times of day. Check walkability scores, public transit access, parking availability, and proximity to amenities. Talk to neighbors and research future development plans that could affect property values.",
  },
];

const buyerFaqs = [
  {
    question: "How much do I need for a down payment in Philadelphia?",
    answer:
      "Down payment requirements depend on your loan type. Conventional loans require as little as 3%, FHA loans 3.5%, and VA/USDA loans may require 0% down. Pennsylvania also offers assistance programs like the Keystone Advantage Assistance Loan that can provide up to $6,000 toward your down payment and closing costs.",
  },
  {
    question: "How long does the home buying process take?",
    answer:
      "From pre-approval to closing, the typical timeline is 45–90 days. Pre-approval takes 1–2 weeks, the home search varies based on inventory and your criteria, and once you're under contract, closing usually happens within 30–45 days.",
  },
  {
    question: "What are closing costs and how much should I budget?",
    answer:
      "Closing costs in Philadelphia typically range from 2–5% of the purchase price. They include title insurance, lender origination fees, recording fees, prepaid taxes and insurance, and the city's 2.075% buyer transfer tax. Your lender will provide a detailed Closing Disclosure at least three business days before settlement.",
  },
  {
    question: "Should I get a home inspection?",
    answer:
      "Absolutely. A professional home inspection costs $300–$500 and can uncover costly issues like foundation problems, roof damage, outdated electrical, plumbing leaks, or mold. In Philadelphia's older housing stock, inspections are especially critical. The findings give you leverage to negotiate repairs or credits with the seller.",
  },
  {
    question: "What's the difference between pre-qualification and pre-approval?",
    answer:
      "Pre-qualification is an informal estimate based on self-reported financial information. Pre-approval involves a full credit check, income verification, and documentation review by a lender—resulting in a conditional commitment for a specific loan amount. Sellers take pre-approved buyers much more seriously, especially in competitive markets.",
  },
  {
    question: "Do I need a real estate agent to buy a home?",
    answer:
      "While not legally required, having an experienced buyer's agent is strongly recommended. Your agent provides market expertise, negotiation skills, and guidance through complex paperwork—at no cost to you, since the seller typically pays both agents' commissions. A Tauro agent's local Philadelphia knowledge is especially valuable in navigating neighborhood dynamics and pricing.",
  },
  {
    question: "What credit score do I need to buy a home?",
    answer:
      "Minimum credit score requirements vary by loan type: 620 for conventional loans, 580 for FHA loans (or 500 with 10% down), and no official minimum for VA loans (though most lenders prefer 620+). Higher scores unlock better interest rates—a score of 740+ typically qualifies you for the best available terms.",
  },
];

export default function BuyersGuidePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Buyer's Guide", href: "/buyers-guide" }]} />

      {/* -- Hero --------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-midnight/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.07]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Buyer&apos;s Guide
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Complete Guide to Buying a Home in Philadelphia
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            From pre-approval to closing day, navigate every step of the home
            buying process with confidence. Tauro agents are with you the entire
            way.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Talk to an Agent
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-gold hover:text-gold"
            >
              Browse Listings
            </Link>
          </div>
        </div>
      </section>

      {/* -- Step-by-Step Timeline --------------------------------- */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Buying Process
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              7 Steps to Your New Home
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Buying a home is one of the biggest decisions you&apos;ll ever
              make. Here&apos;s exactly what to expect at each stage.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent sm:block lg:left-1/2 lg:-translate-x-px" />

            <div className="space-y-8 sm:space-y-12">
              {buyingSteps.map((item, index) => (
                <div
                  key={item.step}
                  className={`relative flex flex-col gap-4 sm:flex-row sm:gap-8 lg:gap-16 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-5 top-0 z-10 hidden -translate-x-1/2 sm:block lg:left-1/2">
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-gold bg-cream font-heading text-sm font-bold text-gold shadow-md">
                      {item.step}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 sm:pl-16 lg:pl-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                    <div className="rounded-xl border border-border/40 bg-white p-6 shadow-sm transition-all hover:border-gold/30 hover:shadow-md sm:p-8">
                      <div className="flex items-start gap-4 sm:hidden">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-gold/10 font-heading text-sm font-bold text-gold">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading text-lg font-bold text-foreground">
                            {item.title}
                          </h3>
                          <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-0.5 text-xs font-medium text-gold-dark">
                            <Clock className="size-3" />
                            {item.timeline}
                          </span>
                        </div>
                      </div>
                      <div className="hidden sm:block">
                        <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                          {item.title}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold-dark">
                          <Clock className="size-3" />
                          {item.timeline}
                        </span>
                      </div>
                      <p className="mt-3 leading-relaxed text-muted-foreground sm:mt-4">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- First-Time Buyer Tips ---------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              First-Time Buyers
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Tips for First-Time Home Buyers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Buying your first home can feel overwhelming. These essential tips
              will help you avoid common pitfalls and make smarter decisions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {firstTimeTips.map((tip) => (
              <div
                key={tip.title}
                className="group rounded-xl border border-border/40 bg-cream p-6 transition-all hover:border-gold/30 hover:shadow-md"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <tip.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {tip.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- Financing 101 ----------------------------------------- */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Financing 101
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Understanding Your Mortgage Options
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-10">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Conventional Loans
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                The most common mortgage type, conventional loans are offered by
                private lenders and typically require a minimum credit score of
                620 and a down payment of 3-20%. If you put less than 20% down,
                you&apos;ll pay private mortgage insurance (PMI) until you reach
                20% equity. Conventional loans offer competitive rates and
                flexible terms of 15 or 30 years.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                FHA Loans
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Backed by the Federal Housing Administration, FHA loans are
                popular with first-time buyers because they accept credit scores
                as low as 580 with just 3.5% down. They have more flexible
                qualifying requirements but include an upfront mortgage insurance
                premium and annual mortgage insurance for the life of the loan.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                VA Loans
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Available to eligible veterans, active-duty service members, and
                surviving spouses, VA loans offer outstanding terms: zero down
                payment, no PMI, and competitive interest rates. If you&apos;ve
                served, this is often the best mortgage option available.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                USDA Loans
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                USDA loans are designed for buyers in eligible rural and
                suburban areas. They offer zero down payment, reduced mortgage
                insurance, and competitive rates. While most of Philadelphia
                proper doesn&apos;t qualify, several surrounding areas in
                Montgomery, Bucks, and Chester counties are eligible, making
                this an excellent option for buyers flexible on location.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                PHFA Down Payment Assistance
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                The Pennsylvania Housing Finance Agency (PHFA) offers several
                programs specifically for first-time and qualifying buyers.
                The Keystone Advantage Assistance Loan provides up to
                $6,000 toward down payment and closing costs as a
                no-interest second mortgage. The HFA Preferred program
                offers reduced mortgage insurance and below-market rates.
                Philadelphia&apos;s own Philly First Home grant provides
                additional assistance for city residents.
              </p>
            </div>

            <div className="rounded-xl border border-border/40 bg-white p-6">
              <h3 className="font-heading text-xl font-bold text-foreground">
                Key Terms to Know
              </h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gold">
                    Debt-to-Income Ratio (DTI)
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your monthly debt payments divided by your gross monthly
                    income. Most lenders prefer a DTI of 43% or lower. The lower
                    your DTI, the more favorable your loan terms.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gold">
                    Credit Score Impact
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your credit score directly affects your interest rate. A
                    score of 740+ typically gets the best rates. Even a small
                    rate difference can mean tens of thousands of dollars over
                    the life of your loan.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gold">
                    Rate Lock
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A rate lock guarantees your interest rate for a set period
                    (typically 30-60 days) while your loan processes. In a
                    rising-rate environment, locking early can save you
                    significant money.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -- What to Expect at Closing ----------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Finish Line
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What to Expect at Closing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Closing day is when everything comes together. Here&apos;s what
              you need to know so there are no surprises.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3">
            <div className="group rounded-xl border border-border/40 bg-cream p-6 transition-all hover:border-gold/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                <Clock className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                Timeline
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Closing typically happens 30-45 days after your offer is
                accepted. The settlement meeting itself takes one to two hours.
                Your agent will confirm the date, time, and location well in
                advance.
              </p>
            </div>

            <div className="group rounded-xl border border-border/40 bg-cream p-6 transition-all hover:border-gold/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                <DollarSign className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                Closing Costs
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Budget 2-5% of the purchase price for closing costs. In
                Philadelphia, these include title insurance, lender fees,
                recording fees, and the city&apos;s 2.075% buyer transfer tax.
                Your lender will provide a Closing Disclosure at least three
                days before settlement.
              </p>
            </div>

            <div className="group rounded-xl border border-border/40 bg-cream p-6 transition-all hover:border-gold/30 hover:shadow-md">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                <FileText className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                Documents You&apos;ll Need
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold/60" />
                  Government-issued photo ID
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold/60" />
                  Proof of homeowner&apos;s insurance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold/60" />
                  Certified or cashier&apos;s check for closing costs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold/60" />
                  Signed loan documents and disclosures
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -- FAQ Accordion ----------------------------------------- */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Common Questions
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Buyer FAQ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything first-time and experienced buyers ask before starting
              their Philadelphia home search.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={buyerFaqs} />
          </div>
        </div>
      </section>

      {/* -- Agent CTA --------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.06]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                Your Guide Awaits
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
                Ready to Start Your Home Search?
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/70">
                Whether you&apos;re a first-time buyer or a seasoned investor,
                Tauro agents are ready to help you find the perfect Philadelphia
                home. Get personalized guidance from day one.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
                >
                  Talk to an Agent
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/book-tour"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-all hover:border-gold hover:bg-gold/10"
                >
                  Schedule a Showing
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/10">
                    <Award className="size-5 text-gold" />
                  </div>
                  <p className="mt-3 font-heading text-2xl font-bold text-gold">$2.1B+</p>
                  <p className="mt-1 text-xs text-white/50">Sales Volume</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/10">
                    <Users className="size-5 text-gold" />
                  </div>
                  <p className="mt-3 font-heading text-2xl font-bold text-gold">98%</p>
                  <p className="mt-1 text-xs text-white/50">Satisfaction</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-gold/10">
                    <Shield className="size-5 text-gold" />
                  </div>
                  <p className="mt-3 font-heading text-2xl font-bold text-gold">6 Days</p>
                  <p className="mt-1 text-xs text-white/50">Avg. to Offer</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/20 font-heading text-lg font-bold text-gold">
                  T
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Tauro Realty Team</p>
                  <p className="mt-0.5 text-xs text-white/50">Philadelphia&apos;s Premier Real Estate Experts</p>
                  <div className="mt-2 flex items-center gap-4">
                    <a
                      href="tel:+12155551234"
                      className="inline-flex items-center gap-1.5 text-xs text-gold transition-colors hover:text-gold-light"
                    >
                      <Phone className="size-3" />
                      Contact Us
                    </a>
                    <a
                      href="mailto:info@taurorealty.com"
                      className="inline-flex items-center gap-1.5 text-xs text-gold transition-colors hover:text-gold-light"
                    >
                      <Mail className="size-3" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
