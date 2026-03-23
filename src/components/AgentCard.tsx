"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Agent } from "@/data/agents";
import { BLUR_PORTRAIT } from "@/lib/blur-placeholder";

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="group relative block overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all duration-500 hover:border-gold/40 hover:shadow-md hover:scale-[1.02]"
    >
      {/* Portrait photo with gradient overlay */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Image
          src={agent.photo}
          alt={agent.fullName}
          fill
          className="object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PORTRAIT}
        />

        {/* Designation badges - top right */}
        <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
          <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-near-black backdrop-blur-sm">
            {agent.title}
          </span>
          {agent.languages.length > 1 && (
            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
              {agent.languages.join(" / ")}
            </span>
          )}
        </div>

        {/* Bottom info bar - always visible */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent px-5 pb-5 pt-16">
          <h3 className="font-heading text-xl font-bold text-white">
            {agent.fullName}
          </h3>
          <div className="my-2 h-px w-12 bg-gold/60" />
          <div className="flex flex-wrap gap-1.5">
            {agent.specialties.slice(0, 2).map((s) => (
              <span
                key={s}
                className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Hover overlay - slides up */}
        <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-black/70 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="p-5">
            <p className="text-sm leading-relaxed text-white/80 line-clamp-3">
              {agent.shortBio}
            </p>

            {/* Stats row */}
            <div className="mt-3 flex items-center gap-2 text-xs text-gold">
              <span>{agent.stats.yearsExperience}+ Yrs</span>
              <span className="text-white/30">|</span>
              <span>{agent.stats.propertiesSold} Sold</span>
              <span className="text-white/30">|</span>
              <span>{agent.stats.totalVolume} Volume</span>
            </div>

            {/* Contact info */}
            <div className="mt-3 flex flex-col gap-1">
              <span className="text-sm text-white/70">{agent.phone}</span>
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
                className="cursor-pointer text-sm text-gold hover:underline"
              >
                {agent.email}
              </span>
            </div>

            {/* View Profile CTA */}
            <div className="mt-4 flex items-center justify-end gap-1.5 font-label text-xs font-medium uppercase tracking-wider text-gold transition-all duration-300 group-hover:gap-2">
              View Profile
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
