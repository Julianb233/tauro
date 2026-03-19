import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Building2,
  Zap,
  GraduationCap,
  Handshake,
  Users,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Target,
  BarChart3,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Splits",
    description:
      "Industry-leading commission structure that rewards your hard work and lets you keep more of what you earn.",
  },
  {
    icon: Building2,
    title: "Premium Brand",
    description:
      "Leverage the Tauro name — a brand synonymous with luxury Philadelphia real estate that opens doors.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description:
      "CRM, marketing automation, AI-powered tools, and a best-in-class website to help you close more deals.",
  },
  {
    icon: GraduationCap,
    title: "Ongoing Training",
    description:
      "Weekly masterclasses, mentorship programs, and access to top-producer coaching at every experience level.",
  },
  {
    icon: Handshake,
    title: "Lead Generation",
    description:
      "Inbound leads from our premium web presence, SEO strategy, and targeted marketing campaigns.",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "A team-first environment where agents support each other, share knowledge, and celebrate wins together.",
  },
];

const stats = [
  { value: "$120M+", label: "Annual Sales Volume" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "28", label: "Avg. Days on Market" },
  { value: "50+", label: "Agents & Growing" },
];

const agentTypes = [
  {
    icon: Target,
    title: "New Agents",
    description:
      "Just got your license? Tauro provides the mentorship, leads, and training to launch your career with confidence. Our structured onboarding program sets you up for success from day one.",
  },
  {
    icon: BarChart3,
    title: "Experienced Producers",
    description:
      "Ready to take your business to the next level? Our competitive splits, premium brand, and marketing support help top producers maximize their income and build lasting client relationships.",
  },
  {
    icon: DollarSign,
    title: "Team Leaders",
    description:
      "Want to build a team within Tauro? We provide the infrastructure, tech stack, and operational support so you can focus on growing your team and closing deals.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
            alt="Professional team meeting"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/50" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Careers at Tauro
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Why Join TAURO?
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            We&apos;re building Philadelphia&apos;s most elite real estate team. If
            you&apos;re driven, client-focused, and ready to elevate your career,
            Tauro is where you belong.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Apply Now
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="#why-tauro"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-foreground py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl font-bold text-gold sm:text-4xl">
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

      {/* Why Agents Choose Tauro */}
      <section id="why-tauro" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              The Tauro Advantage
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Why Agents Choose Tauro
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From competitive splits to cutting-edge technology, Tauro provides
              everything you need to build a thriving real estate career.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/40 bg-card p-6 transition-all hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
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
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Opportunities
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              A Place for Every Stage of Your Career
            </h2>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {agentTypes.map((type) => (
              <div
                key={type.title}
                className="rounded-xl border border-border/40 bg-white p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <type.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Requirements
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                What We Look For
              </h2>
              <p className="mt-4 text-muted-foreground">
                We value character and drive as much as experience. If you
                embody these qualities, we want to hear from you.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Active PA real estate license (or willingness to transfer)",
                "Strong work ethic and client-first mentality",
                "Excellent communication and negotiation skills",
                "Desire to grow within a team environment",
                "Integrity, professionalism, and attention to detail",
                "Comfort with technology and willingness to learn new tools",
              ].map((req) => (
                <div
                  key={req}
                  className="flex items-start gap-3 rounded-lg border border-border/40 bg-card px-5 py-4"
                >
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span className="text-sm text-foreground/80">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Elevate Your Career?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Take the first step toward joining Philadelphia&apos;s most dynamic
            real estate team. Apply today and a team leader will be in touch
            within 2-3 business days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Apply Now
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
