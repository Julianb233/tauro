import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  Heart,
  Shield,
  Target,
  Users,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Tauro",
  description:
    "Tauro is a premium Philadelphia real estate brokerage redefining luxury property services. Meet our team, learn our story, and discover why top agents and clients choose Tauro.",
};

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    description:
      "Every transaction is built on transparency, honesty, and unwavering ethical standards.",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "We combine market expertise with cutting-edge technology to deliver exceptional outcomes.",
  },
  {
    icon: Heart,
    title: "Client-Centered",
    description:
      "Your goals become our mission. We listen first, then craft strategies tailored to you.",
  },
  {
    icon: Award,
    title: "Excellence Always",
    description:
      "From staging to closing, every detail receives the premium attention it deserves.",
  },
];

const stats = [
  { value: "$2.1B+", label: "Total Sales Volume" },
  { value: "150+", label: "Licensed Agents" },
  { value: "15", label: "Neighborhoods Served" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80"
          alt="Philadelphia skyline at dusk"
          fill
          priority
          className="object-cover brightness-[0.35]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="font-label mb-3 text-sm uppercase tracking-widest text-gold">
            Our Story
          </p>
          <h1 className="font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
            Redefining Philadelphia Real Estate
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Where luxury meets local expertise. Tauro is the premium brokerage
            built for Philadelphia&apos;s most discerning buyers, sellers, and
            agents.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/40 bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-gold md:text-4xl">
                {stat.value}
              </p>
              <p className="font-label mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          The Tauro Difference
        </h2>
        <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Founded in Philadelphia, Tauro was born from a simple belief: real
            estate deserves better. Better service, better technology, better
            results. We saw an industry ripe for transformation and built a
            brokerage that raises the standard at every touchpoint.
          </p>
          <p>
            Our name — inspired by the bull, a symbol of strength, determination,
            and forward momentum — reflects our approach to everything we do.
            From Center City penthouses to Fishtown rowhouses, we bring the same
            relentless drive and premium attention to every client, every
            property, every neighborhood.
          </p>
          <p>
            What sets us apart is our deep Philadelphia roots combined with
            world-class marketing and technology. Our agents don&apos;t just list
            homes — they tell stories, build brands, and create experiences that
            move properties faster and for more.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/40 bg-card/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-heading text-center text-3xl font-bold md:text-4xl">
            Our Core Values
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="card-tilt rounded-xl border border-border/40 bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading mt-4 text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-gold" />
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Our Philadelphia
          </h2>
        </div>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We serve 15 distinct Philadelphia neighborhoods, each with its own
          character, market dynamics, and community. Our agents live where they
          work — giving you hyper-local insight that national brokerages
          simply can&apos;t match.
        </p>
        <Link
          href="/neighborhoods"
          className="shimmer-gold mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-colors hover:bg-gold-light"
        >
          Explore Neighborhoods <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Meet the Team CTA */}
      <section className="border-y border-border/40 bg-card/30 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Users className="mx-auto h-10 w-10 text-gold" />
          <h2 className="font-heading mt-4 text-3xl font-bold md:text-4xl">
            Meet Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our agents are Philadelphia&apos;s finest — experienced, connected,
            and committed to delivering extraordinary results for every client.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/agents"
              className="shimmer-gold inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-colors hover:bg-gold-light"
            >
              View Our Agents <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/why-join"
              className="inline-flex items-center gap-2 rounded-lg border border-gold/40 px-6 py-3 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold/10"
            >
              Join Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-muted-foreground">
          Whether you&apos;re buying, selling, or exploring your options — we&apos;re
          here to help.
        </p>
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <a
            href="tel:+12155551234"
            className="flex items-center gap-2 text-gold hover:text-gold-light"
          >
            <Phone className="h-5 w-5" />
            (215) 555-1234
          </a>
          <a
            href="mailto:info@tauro.realty"
            className="flex items-center gap-2 text-gold hover:text-gold-light"
          >
            <Mail className="h-5 w-5" />
            info@tauro.realty
          </a>
        </div>
        <Link
          href="/contact"
          className="shimmer-gold mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-colors hover:bg-gold-light"
        >
          Contact Us <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
