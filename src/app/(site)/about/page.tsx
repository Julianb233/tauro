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
  title: "About Tauro | Philadelphia's Premier Real Estate Brokerage",
  description:
    "Tauro is Philadelphia's premier real estate brokerage redefining luxury property services. From Rittenhouse Square to Fishtown, we serve every corner of the city with local expertise and premium service.",
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
  { value: "15", label: "Philly Neighborhoods" },
  { value: "98%", label: "Client Satisfaction" },
];

const neighborhoods = [
  { name: "Rittenhouse Square", description: "Luxury condos and historic townhomes in the heart of Center City" },
  { name: "Fishtown", description: "Vibrant arts district with trendy lofts and converted rowhouses" },
  { name: "Society Hill", description: "Colonial-era charm meets modern elegance on cobblestone streets" },
  { name: "Graduate Hospital", description: "Tree-lined blocks with stunning rowhome renovations" },
  { name: "Old City", description: "Historic lofts and penthouses near the Delaware waterfront" },
  { name: "Chestnut Hill", description: "Suburban estates and gardens in Philadelphia's most picturesque enclave" },
  { name: "Northern Liberties", description: "Modern new construction in one of Philly's hottest neighborhoods" },
  { name: "Point Breeze", description: "Emerging market with new builds and strong investment returns" },
  { name: "Brewerytown", description: "Up-and-coming corridor with rapid development and rising values" },
  { name: "East Passyunk", description: "Award-winning dining district with charming south Philly character" },
  { name: "Fairmount", description: "Beautiful rowhomes steps from the Art Museum and Boathouse Row" },
  { name: "Manayunk", description: "Canal-side living with Main Street shops and scenic trails" },
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1920&q=80"
          alt="Philadelphia skyline with City Hall and downtown skyscrapers"
          fill
          priority
          className="object-cover brightness-[0.3]"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="font-label mb-3 text-sm uppercase tracking-widest text-gold">
            Serving Philadelphia
          </p>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Philadelphia&apos;s Premier<br className="hidden sm:block" /> Real Estate Brokerage
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            Born and built in Philadelphia. We know every block, every
            neighborhood, every opportunity in the city we call home.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-gold">
            <MapPin className="h-5 w-5" />
            <span className="font-label text-sm uppercase tracking-wider">
              Philadelphia, PA &mdash; 12+ Neighborhoods Served
            </span>
          </div>
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
            Founded in the heart of Philadelphia, Tauro was born from a simple
            belief: the city&apos;s real estate market deserves better. Better
            service, better technology, better results. We saw an industry ripe
            for transformation and built a brokerage that raises the standard at
            every touchpoint — from Broad Street to the Schuylkill, and every
            block in between.
          </p>
          <p>
            Our name — inspired by the bull, a symbol of strength, determination,
            and forward momentum — reflects our approach to everything we do.
            From Center City penthouses to Fishtown rowhouses, from Society
            Hill&apos;s cobblestone charm to Brewerytown&apos;s emerging
            developments, we bring the same relentless drive and premium
            attention to every client, every property, every Philadelphia
            neighborhood.
          </p>
          <p>
            What sets us apart is our deep Philadelphia roots combined with
            world-class marketing and technology. Our agents don&apos;t just list
            homes — they tell stories, build brands, and create experiences that
            move properties faster and for more. We live where we work, and our
            hyper-local knowledge of Philadelphia&apos;s diverse communities is
            something national brokerages simply cannot replicate.
          </p>
        </div>
      </section>

      {/* Philadelphia Commitment */}
      <section className="border-t border-border/40 bg-gradient-to-b from-card/50 to-background">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-gold" />
            <h2 className="font-heading text-3xl font-bold md:text-4xl">
              Our Commitment to Philadelphia
            </h2>
          </div>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>
              Philadelphia isn&apos;t just where we do business — it&apos;s our
              home. We are deeply committed to the communities we serve. From
              sponsoring local youth sports leagues in South Philly to partnering
              with neighborhood revitalization programs in Brewerytown and Point
              Breeze, Tauro invests in the city that built us.
            </p>
            <p>
              We believe in Philadelphia&apos;s future. As the city continues to
              attract new residents, world-class restaurants, thriving arts
              scenes, and major employers, we are proud to help families and
              investors plant roots in one of America&apos;s most dynamic and
              affordable major cities.
            </p>
          </div>
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

      {/* Philadelphia Neighborhoods */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-gold" />
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Philadelphia Neighborhoods We Serve
          </h2>
        </div>
        <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
          From the cobblestone streets of Society Hill to the vibrant arts
          corridor of Fishtown, we have agents embedded in every major
          Philadelphia neighborhood — giving you hyper-local insight that
          national brokerages simply cannot match.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((n) => (
            <div
              key={n.name}
              className="rounded-lg border border-border/40 bg-card/50 p-5 transition-colors hover:border-gold/30"
            >
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <div>
                  <h3 className="font-heading text-base font-semibold">
                    {n.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {n.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/neighborhoods"
          className="shimmer-gold mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-colors hover:bg-gold-light"
        >
          Explore All Neighborhoods <ArrowRight className="h-4 w-4" />
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
            (215) 839-4172
          </a>
          <a
            href="mailto:info@taurorealty.com"
            className="flex items-center gap-2 text-gold hover:text-gold-light"
          >
            <Mail className="h-5 w-5" />
            info@taurorealty.com
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
