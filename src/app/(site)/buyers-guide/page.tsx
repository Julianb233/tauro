import type { Metadata } from "next";
import { DollarSign, FileSearch, Home, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

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
  },
  {
    step: 2,
    title: "Find the Right Real Estate Agent",
    description:
      "Partner with an agent who knows Philadelphia inside and out. Tauro agents specialize in Philly neighborhoods from Center City to Chestnut Hill, giving you hyperlocal insight on property values, school districts, and market trends that online searches can't match.",
  },
  {
    step: 3,
    title: "Define Your Search Criteria",
    description:
      "Work with your agent to clarify your must-haves: budget range, preferred neighborhoods, number of bedrooms, commute requirements, and lifestyle priorities. A focused search saves time and helps you act quickly in Philadelphia's competitive market.",
  },
  {
    step: 4,
    title: "Tour Homes and Make an Offer",
    description:
      "Visit properties that meet your criteria, attend open houses, and evaluate each home's condition and potential. When you find the right one, your agent will craft a competitive offer backed by market data and negotiate terms that protect your interests.",
  },
  {
    step: 5,
    title: "Home Inspection and Due Diligence",
    description:
      "Schedule a professional home inspection to uncover any hidden issues with the property's structure, systems, or safety. Review the inspection report carefully and negotiate repairs or credits with the seller before moving forward.",
  },
  {
    step: 6,
    title: "Secure Your Financing",
    description:
      "Finalize your mortgage application, lock in your interest rate, and complete the appraisal process. Stay in close contact with your lender, avoid making large purchases or changing jobs, and provide any additional documentation promptly to keep your timeline on track.",
  },
  {
    step: 7,
    title: "Closing Day",
    description:
      "At closing, you'll review and sign the final documents, pay your closing costs and down payment, and receive the keys to your new home. Expect the process to take one to two hours. Your agent will walk you through every document so there are no surprises.",
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

export default function BuyersGuidePage() {
  return (
    <>
      {/* -- Hero --------------------------------------------------- */}
      <section className="relative overflow-hidden bg-near-black pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Buyer&apos;s Guide
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Complete Guide to Buying a Home in Philadelphia
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/60">
            From pre-approval to closing day, navigate every step of the home
            buying process with confidence. Tauro agents are with you the entire
            way.
          </p>
        </div>
      </section>

      {/* -- Step-by-Step Process ----------------------------------- */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Buying Process
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              7 Steps to Your New Home
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Buying a home is one of the biggest decisions you&apos;ll ever
              make. Here&apos;s exactly what to expect at each stage.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {buyingSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border/40 bg-near-black p-6 transition-all hover:border-gold/30 sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 font-heading text-lg font-bold text-gold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- First-Time Buyer Tips ---------------------------------- */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              First-Time Buyers
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
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
                className="rounded-xl border border-border/40 bg-midnight p-6 transition-all hover:border-gold/30"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <tip.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
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
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Financing 101
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Understanding Your Mortgage Options
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-10">
            <div>
              <h3 className="font-heading text-xl font-bold text-white">
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
              <h3 className="font-heading text-xl font-bold text-white">
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
              <h3 className="font-heading text-xl font-bold text-white">
                VA Loans
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Available to eligible veterans, active-duty service members, and
                surviving spouses, VA loans offer outstanding terms: zero down
                payment, no PMI, and competitive interest rates. If you&apos;ve
                served, this is often the best mortgage option available.
              </p>
            </div>

            <div className="rounded-xl border border-border/40 bg-near-black p-6">
              <h3 className="font-heading text-xl font-bold text-white">
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

      {/* -- CTA --------------------------------------------------- */}
      <section className="bg-near-black py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Home Search?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you&apos;re a first-time buyer or a seasoned investor, Tauro
            agents are ready to help you find the perfect Philadelphia home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Browse Listings
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Talk to an Agent
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
