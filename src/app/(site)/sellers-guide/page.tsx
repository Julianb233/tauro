import type { Metadata } from "next";
import {
  Paintbrush,
  Sparkles,
  Sun,
  Eye,
  Layers,
  TrendingUp,
  Home,
  Shield,
  Star,
  ArrowRight,
  Clock,
  Award,
  Users,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Seller's Guide | Tauro Realty",
  description:
    "The smart seller's guide to maximizing your Philadelphia home's value. Learn the selling process, staging tips, pricing strategy, and how Tauro Realty helps you get top dollar.",
};

const sellingSteps = [
  {
    step: 1,
    title: "Decide to Sell",
    description:
      "Evaluate your personal readiness and current market conditions. Consider factors like equity position, local inventory levels, and seasonal timing. In Philadelphia, spring and early fall typically see the highest buyer activity, but well-priced homes sell year-round.",
    timeline: "1–2 weeks",
  },
  {
    step: 2,
    title: "Choose Your Listing Agent",
    description:
      "Partner with an agent who has deep expertise in your neighborhood. Tauro agents combine hyperlocal market knowledge with premium marketing strategies, ensuring your home reaches qualified buyers quickly. Our track record speaks for itself: $2.1B in total sales volume.",
    timeline: "1–3 days",
  },
  {
    step: 3,
    title: "Price Your Home Strategically",
    description:
      "Your agent will prepare a Comparative Market Analysis (CMA) examining recent sales, active listings, and market trends in your area. Strategic pricing attracts more buyers, generates competitive offers, and often results in a higher final sale price than overpricing.",
    timeline: "2–3 days",
  },
  {
    step: 4,
    title: "Prepare and Stage Your Home",
    description:
      "First impressions drive offers. Address any deferred maintenance, declutter living spaces, and consider professional staging. Tauro coordinates staging consultations, minor repairs, and deep cleaning so your home shows at its absolute best from day one.",
    timeline: "1–3 weeks",
  },
  {
    step: 5,
    title: "List and Market Your Property",
    description:
      "Your home gets the full Tauro marketing treatment: professional photography, 3D virtual tours, drone footage, targeted social media advertising, and placement across Philadelphia's top listing portals. We create demand before showings even begin.",
    timeline: "1–2 weeks",
  },
  {
    step: 6,
    title: "Review Offers and Negotiate",
    description:
      "When offers come in, your agent will analyze each one beyond just the price: financing strength, contingencies, closing timeline, and buyer qualifications. In multiple-offer scenarios, we leverage competition to maximize your terms and protect your interests.",
    timeline: "3–7 days",
  },
  {
    step: 7,
    title: "Close the Deal",
    description:
      "After accepting an offer, your agent guides you through inspections, appraisals, and the closing process. Expect the buyer's final walkthrough, title transfer, and settlement within 30-45 days. You'll review closing documents, hand over the keys, and receive your proceeds.",
    timeline: "30–45 days",
  },
];

const stagingTips = [
  {
    icon: Layers,
    title: "Declutter and Depersonalize",
    description:
      "Remove personal photos, excess furniture, and accumulated belongings. Buyers need to envision themselves in the space. Aim for clean surfaces, open floor plans, and neutral decor that appeals to the widest audience.",
  },
  {
    icon: Paintbrush,
    title: "Fresh Paint Makes a Difference",
    description:
      "A fresh coat of paint in warm, neutral tones is one of the highest-ROI improvements you can make. Focus on high-traffic areas, scuffed trim, and any bold accent walls that may not appeal to all buyers.",
  },
  {
    icon: Sun,
    title: "Maximize Curb Appeal",
    description:
      "The exterior is the first thing buyers see. Power wash walkways, refresh landscaping, paint the front door, and ensure outdoor lighting works. In Philadelphia's row home neighborhoods, a well-maintained facade stands out immediately.",
  },
  {
    icon: Eye,
    title: "Optimize Lighting Throughout",
    description:
      "Bright, well-lit rooms feel larger and more inviting. Open all blinds, replace dim bulbs with higher-wattage options, and add lamps to dark corners. Natural light is a top priority for Philadelphia buyers.",
  },
  {
    icon: Sparkles,
    title: "Deep Clean Everything",
    description:
      "A spotless home signals that the property has been well-maintained. Hire professional cleaners for carpets, windows, grout, and appliances. Pay attention to often-overlooked areas like baseboards, light fixtures, and ceiling fans.",
  },
];

const tauroAdvantages = [
  {
    icon: TrendingUp,
    title: "Top Dollar Results",
    description:
      "Our agents consistently sell above asking price by combining strategic pricing with high-demand marketing. We study micro-market trends in every Philadelphia neighborhood to position your home where buyers are ready to compete.",
  },
  {
    icon: Home,
    title: "Premium Marketing",
    description:
      "Every Tauro listing receives professional photography, cinematic video tours, 3D Matterport walkthroughs, targeted social media campaigns, and placement on 500+ listing platforms. We don't just list your home, we launch it.",
  },
  {
    icon: Shield,
    title: "Expert Negotiation",
    description:
      "With $2.1B in closed volume, our agents know how to structure deals that protect your bottom line. From navigating multiple offers to handling inspection negotiations, we advocate for your interests at every turn.",
  },
  {
    icon: Star,
    title: "Concierge Service",
    description:
      "Selling a home involves dozens of moving parts. Tauro coordinates staging consultations, professional cleaning, minor repairs, photography scheduling, and open house logistics so you can focus on what matters most to you.",
  },
];

const sellerFaqs = [
  {
    question: "How do I know when it's the right time to sell?",
    answer:
      "The best time to sell depends on your personal circumstances and market conditions. In Philadelphia, spring (March–May) and early fall (September–October) see the highest buyer activity. However, well-priced homes sell year-round. Key indicators include strong equity position, low local inventory, rising home values in your area, and personal readiness. A Tauro agent can provide a free market analysis to help you decide.",
  },
  {
    question: "How much is my home worth?",
    answer:
      "Your home's value depends on recent comparable sales, current market conditions, your property's condition, and location-specific factors. Online estimates (Zillow, Redfin) provide a rough starting point, but they can be off by 5–15%. A Tauro agent will prepare a detailed Comparative Market Analysis (CMA) based on actual sold data, pending sales, and hyperlocal market knowledge—at no cost or obligation.",
  },
  {
    question: "How long does it take to sell a home in Philadelphia?",
    answer:
      "The average days on market in Philadelphia varies by neighborhood and price point, but well-priced homes with strong marketing typically receive offers within 6–14 days. From listing to closing, the full process usually takes 60–90 days. Preparation time (staging, repairs, photography) adds 1–3 weeks before going live.",
  },
  {
    question: "What are the costs of selling a home?",
    answer:
      "Typical seller costs in Philadelphia include: agent commissions (5–6% of sale price), seller's transfer tax (2.075%), title insurance, any agreed-upon buyer credits or repairs, outstanding mortgage payoff, and potential capital gains tax. Your net proceeds can be estimated in advance—ask your Tauro agent for a detailed seller net sheet.",
  },
  {
    question: "Should I make repairs or renovations before listing?",
    answer:
      "Focus on high-ROI improvements: fresh paint, updated lighting, clean landscaping, and fixing obvious maintenance issues (leaky faucets, broken hardware). Major renovations rarely recoup 100% of their cost. Your Tauro agent will do a walkthrough and recommend the specific improvements that will have the greatest impact on your sale price and timeline.",
  },
  {
    question: "Do I need to stage my home?",
    answer:
      "Staged homes consistently sell faster and for more money—studies show staged properties sell for 5–10% more than unstaged ones. At minimum, declutter, depersonalize, and deep clean. For vacant properties or homes that need extra visual appeal, Tauro can coordinate professional staging services tailored to your budget and target buyer demographic.",
  },
  {
    question: "What happens if my home doesn't sell?",
    answer:
      "If your home isn't attracting offers, the most common culprit is pricing. Your Tauro agent will monitor showing feedback, online activity metrics, and comparable sales data to recommend strategic adjustments. Options include price adjustments, enhanced marketing, staging updates, or targeting a different buyer segment. We work with you until your home is sold.",
  },
];

export default function SellersGuidePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Seller's Guide", href: "/sellers-guide" }]} />

      {/* -- Hero --------------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground pb-24 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-midnight/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.07]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Seller&apos;s Guide
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            The Smart Seller&apos;s Guide to Maximizing Your Home&apos;s Value
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            From pricing strategy to closing day, Tauro helps Philadelphia
            sellers get top dollar with expert guidance and premium marketing at
            every step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/home-value"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Get Free Valuation
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-gold hover:text-gold"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>

      {/* -- Selling Process Timeline ------------------------------- */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Selling Process
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              7 Steps to a Successful Sale
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Selling your home doesn&apos;t have to be stressful. Here&apos;s
              exactly what to expect when you list with Tauro.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent sm:block lg:left-1/2 lg:-translate-x-px" />

            <div className="space-y-8 sm:space-y-12">
              {sellingSteps.map((item, index) => (
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

      {/* -- Staging Tips ------------------------------------------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Staging Tips
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Prepare Your Home to Impress
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Well-staged homes sell faster and for more money. These proven tips
              help your property make the strongest possible first impression.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stagingTips.map((tip) => (
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

      {/* -- Pricing Strategy --------------------------------------- */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Pricing Strategy
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              The Art and Science of Pricing Your Home
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Pricing is the single most important factor in how quickly your
              home sells and how much you net. Here&apos;s how Tauro approaches
              it.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-10">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Comparative Market Analysis (CMA)
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Every pricing recommendation starts with a deep-dive CMA. Your
                agent analyzes recently sold properties, active and pending
                listings, expired listings, and market absorption rates in your
                specific neighborhood. This data-driven approach ensures your
                price reflects real buyer behavior, not guesswork.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Market Conditions and Timing
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Philadelphia&apos;s real estate market shifts by season,
                neighborhood, and price point. In a seller&apos;s market with
                low inventory, aggressive pricing can trigger bidding wars. In a
                balanced or buyer&apos;s market, strategic pricing slightly
                below comparable sales attracts more showings and can still
                generate multiple offers.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl font-bold text-foreground">
                Pricing Psychology
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Buyers search in price brackets. A home listed at $505,000
                misses every buyer searching up to $500,000. Strategic price
                positioning ensures your listing appears in the maximum number
                of search results. The first two weeks on market generate the
                most activity, so getting the price right from day one is
                critical to maximizing competition and final sale price.
              </p>
            </div>

            <div className="rounded-xl border border-gold/20 bg-white p-6">
              <p className="text-sm font-semibold text-gold">
                The Overpricing Trap
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Overpriced homes sit on the market, accumulate days on market,
                and eventually sell for less than they would have at the correct
                price. Buyers view stale listings with suspicion and submit
                lowball offers. Tauro&apos;s data-first approach avoids this
                trap and positions your home to sell quickly at maximum value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -- Tauro's Value Proposition ------------------------------ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Tauro Advantage
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              The Tauro Selling Advantage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              When you list with Tauro, you get a team of Philadelphia real
              estate experts backed by proven results and premium service.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tauroAdvantages.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-border/40 bg-white p-6 transition-all hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <item.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mt-14 grid grid-cols-3 gap-8 rounded-2xl border border-border/40 bg-cream p-8">
            {[
              { value: "$2.1B+", label: "Total Sales Volume" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "6 Days", label: "Avg. Days to Offer" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
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
              Seller FAQ
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Answers to the most common questions Philadelphia home sellers ask
              before listing their property.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={sellerFaqs} />
          </div>
        </div>
      </section>

      {/* -- Agent CTA --------------------------------------------- */}
      <section className="relative overflow-hidden bg-foreground py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--color-gold)_0%,_transparent_50%)] opacity-[0.06]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                Sell With Confidence
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
                Ready to Sell Your Home?
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-white/70">
                Get a free home valuation and discover what your property is worth
                in today&apos;s Philadelphia market. No obligation, no pressure —
                just expert insight from agents who know your neighborhood.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/home-value"
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
                >
                  Get Free Valuation
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/sell"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-gold/40 px-6 py-3 text-sm font-semibold text-gold transition-all hover:border-gold hover:bg-gold/10"
                >
                  Start Selling
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
