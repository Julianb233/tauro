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
      className="group relative block overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all duration-300 hover:border-gold/40 hover:shadow-md active:scale-[0.99] sm:hover:scale-[1.02]"
    >
      {/* Portrait photo - rounded corners, responsive aspect */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={agent.photo}
          alt={agent.fullName}
          fill
          className="object-cover object-center grayscale-[20%] transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PORTRAIT}
        />

        {/* Designation badges - top right, responsive spacing */}
        <div className="absolute right-2 top-2 z-10 flex flex-col items-end gap-1 sm:right-3 sm:top-3 sm:gap-1.5">
          <span className="rounded bg-gold/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-near-black sm:text-[10px] sm:px-2.5">
            {agent.title}
          </span>
          {agent.languages.length > 1 && (
            <span className="rounded bg-white/95 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground sm:text-[10px] sm:px-2.5">
              {agent.languages.join(" / ")}
            </span>
          )}
        </div>

        {/* Bottom info bar - strong contrast, responsive padding */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight via-midnight/95 to-transparent px-4 pb-4 pt-12 sm:px-5 sm:pb-5 sm:pt-16">
          <h3 className="font-heading text-base font-bold text-white sm:text-xl">
            {agent.fullName}
          </h3>
          {agent.certifications.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {agent.certifications.map((cert) => (
                <span
                  key={cert.code}
                  className="rounded border border-gold/50 bg-gold/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold"
                >
                  {cert.code}
                </span>
              ))}
            </div>
          )}
          <div className="my-1.5 h-px w-10 bg-gold/70 sm:my-2 sm:w-12 sm:bg-gold/60" />
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {agent.specialties.slice(0, 2).map((s) => (
              <span
                key={s}
                className="rounded-full border border-gold/40 bg-gold/20 px-2 py-0.5 text-[9px] font-medium text-gold sm:text-[10px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Hover overlay - slides up, responsive padding */}
        <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-black/80 transition-transform duration-300 ease-out group-hover:translate-y-0 group-active:translate-y-0">
          <div className="p-4 sm:p-5">
            <p className="text-xs leading-relaxed text-white/90 line-clamp-3 sm:text-sm sm:text-white/80">
              {agent.shortBio}
            </p>

            {/* Stats row */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-gold sm:mt-3 sm:gap-2 sm:text-xs">
              <span>{agent.stats.yearsExperience}+ Yrs</span>
              <span className="text-white/40">|</span>
              <span>{agent.stats.propertiesSold} Sold</span>
              <span className="text-white/40">|</span>
              <span>{agent.stats.totalVolume} Volume</span>
            </div>

            {/* Contact info */}
            <div className="mt-2 flex flex-col gap-0.5 sm:mt-3 sm:gap-1">
              <span className="text-xs text-white/80 sm:text-sm sm:text-white/70">{agent.phone}</span>
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
                className="cursor-pointer text-xs text-gold hover:underline sm:text-sm"
              >
                {agent.email}
              </span>
            </div>

            {/* View Profile CTA */}
            <div className="mt-3 flex items-center justify-end gap-1.5 font-label text-[11px] font-medium uppercase tracking-wider text-gold sm:mt-4 sm:text-xs">
              View Profile
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
