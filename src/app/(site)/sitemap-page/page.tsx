import type { Metadata } from "next";
import Link from "next/link";
import {
  loadProperties,
  loadNeighborhoods,
  loadAgents,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Sitemap | Tauro Realty",
  description:
    "Browse all pages on Tauro Realty. Find properties, neighborhoods, agents, resources, and more across Philadelphia's premier real estate brokerage.",
};

const resourceLinks = [
  { href: "/buyers-guide", label: "Buyer's Guide" },
  { href: "/sellers-guide", label: "Seller's Guide" },
  { href: "/market-insights", label: "Market Insights" },
  { href: "/home-value", label: "Home Valuation" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/book-tour", label: "Book a Tour" },
  { href: "/sell", label: "Sell Your Home" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Tauro" },
  { href: "/careers", label: "Careers" },
  { href: "/join", label: "Join Our Team" },
  { href: "/why-join", label: "Why Join Tauro" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/fair-housing", label: "Fair Housing" },
];

export default async function SitemapPage() {
  const [properties, neighborhoods, agents] = await Promise.all([
    loadProperties(),
    loadNeighborhoods(),
    loadAgents(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Navigation
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Sitemap
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            A complete directory of every page on Tauro Realty.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Properties */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Properties
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {properties.length} listings
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/properties"
                    className="text-sm font-medium text-gold transition-colors hover:text-gold/80"
                  >
                    All Properties
                  </Link>
                </li>
                {properties.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/properties/${p.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {p.address}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neighborhoods */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Neighborhoods
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {neighborhoods.length} areas
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/neighborhoods"
                    className="text-sm font-medium text-gold transition-colors hover:text-gold/80"
                  >
                    All Neighborhoods
                  </Link>
                </li>
                {neighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/neighborhoods/${n.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Agents */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Agents
              </h2>
              <p className="mt-1 text-sm text-white/50">
                {agents.length} team members
              </p>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/agents"
                    className="text-sm font-medium text-gold transition-colors hover:text-gold/80"
                  >
                    All Agents
                  </Link>
                </li>
                {agents.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/agents/${a.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {a.fullName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Resources
              </h2>
              <ul className="mt-4 space-y-2">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Legal
              </h2>
              <ul className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
