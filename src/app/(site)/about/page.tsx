import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Star, MapPin, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Tauro | Philadelphia Premium Real Estate",
  description:
    "Tauro is Philadelphia's premier luxury real estate brokerage. Learn about our mission, values, and the team behind our success.",
};

const stats = [
  { value: "500+", label: "Properties Sold" },
  { value: "15", label: "Neighborhoods" },
  { value: "$2.1B+", label: "Volume" },
  { value: "98%", label: "Satisfaction" },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Every transaction is guided by transparency, honesty, and an unwavering commitment to doing what is right for our clients.",
  },
  {
    icon: Star,
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards in marketing, negotiation, and client service — because premium results demand premium effort.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Philadelphia is our home. We know every neighborhood, every block, and every market trend that shapes the city's real estate landscape.",
  },
  {
    icon: Users,
    title: "Client First",
    description:
      "Your goals drive every decision we make. We listen, advise, and advocate so you can buy or sell with complete confidence.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-near-black pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Our Story
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            About Tauro
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Philadelphia&apos;s premier luxury real estate brokerage, built on
            deep local knowledge and an uncompromising standard of service.
          </p>
        </div>
      </section>

      {/* ── Brand Story ───────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Who We Are
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              Born in Philadelphia, Built for Excellence
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/70">
              <p>
                Tauro was founded by a team of visionaries who saw
                Philadelphia&apos;s immense potential long before the rest of the
                market caught on. From the historic row homes of Society Hill to
                the modern towers rising along the Schuylkill, we recognized
                that this city deserved a brokerage as remarkable as its
                architecture.
              </p>
              <p>
                What started as a boutique operation in Center City has grown
                into one of the region&apos;s most trusted luxury real estate
                brands. Our growth was never about scale for its own sake — it
                was about earning the trust of Philadelphia&apos;s most
                discerning buyers and sellers, one exceptional experience at a
                time.
              </p>
              <p>
                Today, Tauro represents a curated portfolio of
                Philadelphia&apos;s finest properties. Our agents combine
                neighborhood-level expertise with institutional-grade marketing
                to deliver results that consistently exceed expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/40 bg-midnight p-10 sm:p-14 text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Our Mission
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold text-white sm:text-4xl">
              Elevating Philadelphia Real Estate
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              To redefine the Philadelphia real estate experience by combining
              hyperlocal expertise, modern technology, and white-glove service —
              so every client feels confident, informed, and empowered throughout
              their journey.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-4xl font-bold text-gold sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              What Drives Us
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border/40 bg-midnight p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <value.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Preview ──────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/40 bg-near-black p-10 sm:p-14 text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
              Our Team
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
              Meet the Agents Behind the Results
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/60">
              Every Tauro agent is a Philadelphia specialist — deeply connected
              to the neighborhoods they serve and committed to delivering
              premium outcomes.
            </p>
            <div className="mt-8">
              <Link
                href="/agents"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
              >
                View Our Agents
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-near-black py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            Whether you&apos;re buying your first home or selling a luxury
            estate, we&apos;re here to make your Philadelphia real estate
            experience exceptional.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Contact Us
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/home-value"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Get Free Valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
