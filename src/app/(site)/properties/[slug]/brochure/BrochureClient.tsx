"use client";

import { Property, formatPriceFull } from "@/data/properties";
import { QrCode } from "./QrCode";

/* -------------------------------------------------------------------------- */
/*  SVG Logo — Zorro-inspired masked bull (inline for print)                   */
/* -------------------------------------------------------------------------- */
function TauroLogo({ fill = "#C9A96E", size = 144 }: { fill?: string; size?: number }) {
  const height = (size / 240) * 100;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 100" width={size} height={height} aria-label="Tauro logo" role="img">
      <g>
        {/* Left horn */}
        <path d="M72 52 C60 28, 44 16, 32 14 C36 20, 42 32, 50 44 C56 52, 66 58, 80 58" fill={fill} />
        <path d="M32 14 C26 10, 18 12, 16 20" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Right horn */}
        <path d="M168 52 C180 28, 196 16, 208 14 C204 20, 198 32, 190 44 C184 52, 174 58, 160 58" fill={fill} />
        <path d="M208 14 C214 10, 222 12, 224 20" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Face */}
        <path d="M80 50 C80 40, 96 30, 120 30 C144 30, 160 40, 160 50 L160 68 C160 82, 144 92, 120 92 C96 92, 80 82, 80 68 Z" stroke={fill} strokeWidth="3.5" fill="none" />
        {/* Ears */}
        <path d="M76 44 C68 38, 62 42, 64 50" stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M164 44 C172 38, 178 42, 176 50" stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Zorro mask band */}
        <path d="M82 50 C82 50, 90 44, 100 46 L108 48 C114 48.5, 120 48.5, 120 48.5 C120 48.5, 126 48.5, 132 48 L140 46 C150 44, 158 50, 158 50 L162 56 C162 56, 154 62, 140 60 L132 58 C126 57.5, 120 57.5, 120 57.5 C120 57.5, 114 57.5, 108 58 L100 60 C86 62, 78 56, 78 56 Z" fill={fill} opacity="0.15" />
        <path d="M78 53 L68 48 M162 53 L172 48" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
        {/* Eyes */}
        <ellipse cx="104" cy="53" rx="5" ry="3.5" fill={fill} />
        <ellipse cx="136" cy="53" rx="5" ry="3.5" fill={fill} />
        {/* Nose bridge + nostrils */}
        <path d="M116 60 L116 72 M124 60 L124 72" stroke={fill} strokeWidth="2" fill="none" />
        <ellipse cx="112" cy="76" rx="5" ry="3.5" stroke={fill} strokeWidth="2.5" fill="none" />
        <ellipse cx="128" cy="76" rx="5" ry="3.5" stroke={fill} strokeWidth="2.5" fill="none" />
        {/* Chin */}
        <path d="M104 86 C110 90, 130 90, 136 86" stroke={fill} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Brochure Client Component                                                  */
/* -------------------------------------------------------------------------- */
export function BrochureClient({
  property,
  listingUrl,
}: {
  property: Property;
  listingUrl: string;
}) {
  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 0; size: letter; }
        }
      `}</style>

      {/* Download button — hidden in print */}
      <div className="no-print fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[#C9A96E]/30 bg-[#1A1A2E] px-6 py-3">
        <a
          href={`/properties/${property.slug}`}
          className="text-sm text-[#C9A96E] hover:text-[#D4C4A0] transition-colors"
        >
          &larr; Back to Listing
        </a>
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-[#C9A96E] px-6 py-2 text-sm font-semibold text-[#1A1A2E] transition-colors hover:bg-[#D4C4A0]"
        >
          Download as PDF
        </button>
      </div>

      {/* Brochure body */}
      <div className="mx-auto min-h-screen bg-white text-[#1A1A2E]" style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>

        {/* ─── Page 1: Hero + Key Details ─── */}
        <section className="relative flex min-h-screen flex-col print:min-h-0 print:h-[100vh]" style={{ pageBreakAfter: "always" }}>
          {/* Hero image — full bleed */}
          <div className="relative h-[60vh] w-full overflow-hidden print:h-[55vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.images[0]}
              alt={property.address}
              className="h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/40 to-transparent" />

            {/* Logo top-left */}
            <div className="absolute left-8 top-8 print:left-6 print:top-6">
              <TauroLogo fill="#C9A96E" size={160} />
            </div>

            {/* Status badge */}
            <div className="absolute right-8 top-8 print:right-6 print:top-6">
              <span className="rounded-md bg-[#C9A96E] px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-[#1A1A2E]">
                {property.status}
              </span>
            </div>

            {/* Address & price overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 print:px-8 print:pb-8">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C9A96E]">
                {property.neighborhood} &middot; {property.city}, {property.state}
              </p>
              <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl print:text-4xl" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}>
                {property.address}
              </h1>
              <p className="mt-3 text-3xl font-bold text-[#C9A96E] md:text-4xl print:text-3xl" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}>
                {formatPriceFull(property.price)}
              </p>
            </div>
          </div>

          {/* Key stats bar */}
          <div className="border-b border-[#C9A96E]/20 bg-[#1A1A2E]">
            <div className="mx-auto flex max-w-4xl items-center justify-around px-6 py-5 print:py-4">
              {[
                { label: "Bedrooms", value: property.beds },
                { label: "Bathrooms", value: property.baths },
                { label: "Square Feet", value: property.sqft.toLocaleString() },
                { label: "Year Built", value: property.yearBuilt },
                { label: "Lot Size", value: property.lotSqft > 0 ? `${property.lotSqft.toLocaleString()} SF` : "N/A" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-[#C9A96E] print:text-xl" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}>
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Description + property type */}
          <div className="flex flex-1 flex-col justify-center px-10 py-10 print:px-8 print:py-6">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#C9A96E]">
                {property.propertyType}
              </p>
              <div className="mt-2 h-px w-12 bg-[#C9A96E]" />
              <p className="mt-4 text-base leading-relaxed text-[#1A1A2E]/80 print:text-[14px] print:leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>

          {/* Decorative bottom bar */}
          <div className="h-1.5 bg-gradient-to-r from-[#C9A96E] via-[#B08D4C] to-[#C9A96E]" />
        </section>

        {/* ─── Page 2: Features + Agent + QR ─── */}
        <section className="flex min-h-screen flex-col print:min-h-0 print:h-[100vh]" style={{ pageBreakInside: "avoid" }}>
          {/* Secondary images */}
          {property.images.length > 1 && (
            <div className="grid grid-cols-3 gap-1">
              {property.images.slice(1, 4).map((img, i) => (
                <div key={i} className="h-48 overflow-hidden print:h-40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${property.address} photo ${i + 2}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Features grid */}
          <div className="flex-1 px-10 py-10 print:px-8 print:py-6">
            <h2 className="text-2xl font-bold text-[#1A1A2E] print:text-xl" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}>
              Features & Amenities
            </h2>
            <div className="mt-1 h-px w-12 bg-[#C9A96E]" />

            <div className="mt-6 grid grid-cols-3 gap-8 print:mt-4 print:gap-6">
              {(["interior", "exterior", "community"] as const).map((cat) => (
                <div key={cat}>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#C9A96E]">
                    {cat}
                  </h3>
                  <ul className="space-y-1.5">
                    {property.features[cat].map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#1A1A2E]/75 print:text-[13px]">
                        <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9A96E]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Agent card + QR */}
          <div className="mt-auto border-t border-[#C9A96E]/20 bg-[#F8F6F1]">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-10 py-8 print:px-8 print:py-6">
              {/* Agent info */}
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#C9A96E] print:h-16 print:w-16">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C9A96E]">
                    Listing Agent
                  </p>
                  <p className="mt-1 text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: "var(--font-playfair, 'Playfair Display', Georgia, serif)" }}>
                    {property.agent.name}
                  </p>
                  <p className="mt-1 text-sm text-[#1A1A2E]/70">
                    {property.agent.phone}
                  </p>
                  <p className="text-sm text-[#1A1A2E]/70">
                    {property.agent.email}
                  </p>
                </div>
              </div>

              {/* QR code + branding */}
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <TauroLogo fill="#1A1A2E" size={120} />
                  <p className="mt-2 text-xs text-[#1A1A2E]/50">
                    Scan to view listing online
                  </p>
                </div>
                <QrCode url={listingUrl} size={80} />
              </div>
            </div>

            {/* Footer bar */}
            <div className="flex items-center justify-between bg-[#1A1A2E] px-10 py-3 print:px-8">
              <p className="text-xs text-white/50">
                {property.address}, {property.city}, {property.state} {property.zip}
              </p>
              <p className="text-xs text-white/50">
                taurorealty.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
