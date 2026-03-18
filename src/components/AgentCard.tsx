import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Agent } from "@/data/agents";

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="card-tilt group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-gold/40 hover:shadow-lg"
    >
      {/* Portrait photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={agent.photo}
          alt={agent.fullName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-white">
          {agent.fullName}
        </h3>
        <p className="mt-1 text-sm font-label uppercase tracking-wider text-gold">
          {agent.title}
        </p>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {agent.shortBio}
        </p>

        {/* Stats row */}
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-gold">
              {agent.stats.propertiesSold}
            </span>{" "}
            Sold
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="font-semibold text-gold">
              {agent.stats.totalVolume}
            </span>{" "}
            Volume
          </span>
        </div>

        {/* Contact row */}
        <div className="mt-4 flex flex-col gap-1 border-t border-border/40 pt-4">
          <span className="text-sm text-white/80">{agent.phone}</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              window.location.href = `mailto:${agent.email}`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                window.location.href = `mailto:${agent.email}`;
              }
            }}
            className="text-sm text-gold hover:underline cursor-pointer"
          >
            {agent.email}
          </span>
        </div>

        {/* View Profile link */}
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-gold opacity-0 transition-opacity group-hover:opacity-100">
          View Profile
          <ArrowRight className="size-4" />
        </div>
      </div>
    </Link>
  );
}
