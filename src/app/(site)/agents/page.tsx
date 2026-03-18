import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { agents } from "@/data/agents";
import AgentCard from "@/components/AgentCard";

export const metadata: Metadata = {
  title: "Our Agents | Tauro",
  description:
    "Meet the Tauro team — Philadelphia's premier luxury real estate agents.",
};

export default function AgentsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-near-black pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Our Team
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Meet the Tauro Agents
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Our agents bring deep Philadelphia market expertise, premium
            service, and a track record of results.
          </p>
        </div>
      </section>

      {/* ── Team Grid ─────────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ──────────────────────────────────────────── */}
      <section className="bg-midnight pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/40 bg-near-black p-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-white">
              Interested in Joining Tauro?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              We&apos;re always looking for exceptional agents who share our
              commitment to excellence.
            </p>
            <Link
              href="/join"
              className="shimmer-gold mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              Learn More
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
