import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loadAgents } from "@/lib/data";
import AgentsGrid from "@/components/AgentsGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Agents",
  description:
    "Meet the Tauro Realty team of expert Philadelphia real estate agents. Local market specialists across Rittenhouse, Center City, Fishtown, and all neighborhoods. Find your perfect agent today.",
};

export default async function AgentsPage() {
  const agents = await loadAgents();
  const totalSold = agents.reduce((sum, a) => sum + (a.stats?.propertiesSold ?? 0), 0);
  const avgYears = agents.length > 0 ? Math.round(agents.reduce((sum, a) => sum + (a.stats?.yearsExperience ?? 0), 0) / agents.length) : 0;

  return (
    <>
      <Breadcrumbs items={[{ label: "Agents", href: "/agents" }]} />
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 h-px w-16 bg-gold/60" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">Our Team</p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Philadelphia&apos;s <em>Finest</em> Real Estate Professionals</h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">Each Tauro agent is hand-selected for their market expertise, negotiation skill, and unwavering commitment to client success.</p>
          <div className="mt-8 flex gap-8">
            <div><p className="font-heading text-2xl font-bold text-gold">{totalSold}+</p><p className="mt-1 text-xs uppercase tracking-wider text-white/70">Properties Sold</p></div>
            <div><p className="font-heading text-2xl font-bold text-gold">$500M+</p><p className="mt-1 text-xs uppercase tracking-wider text-white/70">Total Volume</p></div>
            <div><p className="font-heading text-2xl font-bold text-gold">{avgYears}+</p><p className="mt-1 text-xs uppercase tracking-wider text-white/70">Avg Years Experience</p></div>
          </div>
        </div>
      </section>
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10"><div className="mb-3 h-px w-12 bg-gold/60" /><h2 className="font-heading text-2xl font-bold text-foreground">Meet the Team</h2></div>
          <AgentsGrid agents={agents} />
        </div>
      </section>
      <section className="bg-cream pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/40 bg-white p-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">Interested in Joining Tauro?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">We&apos;re always looking for exceptional agents who share our commitment to excellence.</p>
            <Link href="/join" className="shimmer-gold mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light">Learn More<ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
