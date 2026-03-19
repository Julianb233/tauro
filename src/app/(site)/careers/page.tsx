"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  TrendingUp,
  Building2,
  Zap,
  GraduationCap,
  Handshake,
  Users,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Shield,
  Coffee,
  Laptop,
  Trophy,
  Send,
  ChevronDown,
  Sparkles,
  Star,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Compensation",
    description:
      "Industry-leading commission splits and salary packages that reward your hard work and dedication to excellence.",
  },
  {
    icon: Shield,
    title: "Health & Wellness",
    description:
      "Comprehensive health, dental, and vision insurance for you and your family. Your well-being is our priority.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "Ongoing training, mentorship programs, conference stipends, and access to top-producer coaching.",
  },
  {
    icon: Laptop,
    title: "Cutting-Edge Technology",
    description:
      "CRM, marketing automation, AI-powered tools, and a premium website to maximize your productivity.",
  },
  {
    icon: Coffee,
    title: "Flexible Work Culture",
    description:
      "Hybrid work options, generous PTO, and a culture that values work-life balance alongside ambitious goals.",
  },
  {
    icon: Trophy,
    title: "Performance Bonuses",
    description:
      "Quarterly and annual bonuses, team incentive trips, and recognition programs that celebrate your wins.",
  },
];

const stats = [
  { value: "$120M+", label: "Annual Sales Volume" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "28", label: "Avg. Days on Market" },
  { value: "50+", label: "Agents & Growing" },
];

const openPositions = [
  {
    title: "Listing Agent",
    type: "Full-Time",
    location: "Philadelphia, PA",
    department: "Sales",
    description:
      "Drive our luxury listing portfolio by sourcing, marketing, and closing premium Philadelphia properties. You will manage the full listing lifecycle — from pricing strategy and staging consultations to negotiation and settlement.",
    requirements: [
      "Active PA real estate license",
      "2+ years of listing experience preferred",
      "Strong negotiation and communication skills",
      "Track record of $5M+ annual sales volume",
      "Proficiency with MLS, CRM, and digital marketing tools",
    ],
  },
  {
    title: "Marketing Coordinator",
    type: "Full-Time",
    location: "Philadelphia, PA",
    department: "Marketing",
    description:
      "Own the creative direction of our brand across all channels. You will craft compelling property campaigns, manage social media, produce listing photography direction, and drive our digital presence to attract high-value clients.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "2+ years of marketing experience (real estate a plus)",
      "Proficiency in Adobe Creative Suite and Canva",
      "Strong copywriting and social media skills",
      "Experience with email marketing and analytics platforms",
    ],
  },
  {
    title: "Office Manager",
    type: "Full-Time",
    location: "Philadelphia, PA",
    department: "Operations",
    description:
      "Keep the Tauro machine running smoothly. You will oversee daily office operations, coordinate agent onboarding, manage vendor relationships, and ensure our team has everything they need to deliver premium client experiences.",
    requirements: [
      "3+ years of office management experience",
      "Exceptional organizational and multitasking abilities",
      "Proficiency in Google Workspace and project management tools",
      "Strong interpersonal skills and professional demeanor",
      "Real estate industry experience preferred but not required",
    ],
  },
  {
    title: "Buyer's Agent",
    type: "Full-Time",
    location: "Philadelphia, PA",
    department: "Sales",
    description:
      "Guide discerning buyers through their journey to find the perfect Philadelphia home. You will conduct property showings, provide neighborhood expertise, negotiate offers, and deliver a white-glove client experience from first call to closing.",
    requirements: [
      "Active PA real estate license",
      "1+ year of buyer representation experience",
      "Deep knowledge of Philadelphia neighborhoods",
      "Strong client relationship management skills",
      "Availability for evening and weekend showings",
    ],
  },
];

const cultureValues = [
  {
    icon: Star,
    title: "Excellence as Standard",
    description:
      "We don't settle for good enough. Every listing, every interaction, every detail reflects our commitment to being the best in Philadelphia real estate.",
  },
  {
    icon: Users,
    title: "Team Over Ego",
    description:
      "Success is shared. Our collaborative culture means agents support each other, share insights, and celebrate wins together.",
  },
  {
    icon: Sparkles,
    title: "Innovation First",
    description:
      "We embrace new technology, creative marketing, and fresh approaches. Staying ahead of the curve is in our DNA.",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description:
      "We're invested in Philadelphia beyond transactions. From local charity partnerships to neighborhood events, we give back to the communities we serve.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareersPage() {
  const [expandedPosition, setExpandedPosition] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API route
    setFormSubmitted(true);
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
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
            Build Your Future{" "}
            <span className="text-gold">with&nbsp;Tauro</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/60">
            We&apos;re building Philadelphia&apos;s most elite real estate team.
            If you&apos;re driven, client-focused, and ready to elevate your
            career, Tauro is where you belong.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#open-positions"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              View Open Positions
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────── */}
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

      {/* ── Open Positions ───────────────────────────────────────── */}
      <section id="open-positions" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Open Positions
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Find Your Role at Tauro
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We&apos;re growing fast and looking for exceptional talent to join
              our team. Explore the roles below and find your perfect fit.
            </p>
          </div>

          <div className="mt-14 space-y-4">
            {openPositions.map((position, idx) => (
              <div
                key={position.title}
                className="overflow-hidden rounded-xl border border-border/40 bg-card transition-all hover:border-gold/30 hover:shadow-md"
              >
                {/* Position Header */}
                <button
                  onClick={() =>
                    setExpandedPosition(expandedPosition === idx ? null : idx)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Briefcase className="size-3.5" />
                        {position.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3.5" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" />
                        {position.department}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`size-5 shrink-0 text-gold transition-transform duration-200 ${
                      expandedPosition === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expanded Content */}
                {expandedPosition === idx && (
                  <div className="border-t border-border/40 px-6 pb-6 pt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {position.description}
                    </p>
                    <h4 className="mt-5 text-sm font-semibold text-foreground">
                      Requirements
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {position.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="mt-0.5 size-4 shrink-0 text-gold" />
                          {req}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#apply"
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-md"
                    >
                      Apply for this Role
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits Grid ────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Why Tauro
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Benefits & Perks
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From competitive compensation to professional development, Tauro
              invests in every member of our team.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
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
        </div>
      </section>

      {/* ── Team Culture ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground py-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Collaborative team working together"
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Our Culture
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
                More Than a Brokerage —{" "}
                <span className="text-gold">A Family</span>
              </h2>
              <p className="mt-4 text-white/60">
                At Tauro, we believe the best work happens when people feel
                valued, supported, and inspired. Our culture blends ambitious
                goals with genuine care — creating an environment where everyone
                can thrive.
              </p>
              <p className="mt-3 text-white/60">
                From team retreats and mentorship circles to Friday happy hours
                and community service days, life at Tauro is about more than
                closing deals. It&apos;s about building something meaningful
                together.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {cultureValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-white/10"
                >
                  <value.icon className="size-6 text-gold" />
                  <h3 className="mt-3 font-heading text-sm font-bold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/50">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ─────────────────────────────────────── */}
      <section id="apply" className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Apply Today
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Start Your Journey with Tauro
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Fill out the form below and a team leader will be in touch within
              2-3 business days. We can&apos;t wait to meet you.
            </p>
          </div>

          {formSubmitted ? (
            <div className="mt-12 rounded-xl border border-gold/30 bg-gold/5 p-10 text-center">
              <CheckCircle className="mx-auto size-12 text-gold" />
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                Application Received
              </h3>
              <p className="mt-2 text-muted-foreground">
                Thank you for your interest in joining Tauro! A team leader will
                review your application and reach out within 2-3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-foreground"
                  >
                    First Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-foreground"
                  >
                    Last Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground"
                  >
                    Email <span className="text-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="(215) 555-0100"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-foreground"
                  >
                    Position of Interest <span className="text-gold">*</span>
                  </label>
                  <select
                    id="position"
                    required
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    <option value="">Select a position...</option>
                    {openPositions.map((p) => (
                      <option key={p.title} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-foreground"
                  >
                    Years of Experience
                  </label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className="mt-1.5 w-full rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    <option value="">Select...</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  Tell Us About Yourself <span className="text-gold">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-1.5 w-full resize-none rounded-lg border border-border/60 bg-card px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  placeholder="Share your background, what excites you about Tauro, and what you'd bring to the team..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg sm:w-auto"
              >
                <Send className="size-4" />
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Don&apos;t See the Right Role?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            We&apos;re always looking for exceptional people. Send us your
            information and we&apos;ll keep you in mind for future opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#apply"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Submit Your Resume
              <ArrowRight className="size-4" />
            </a>
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
