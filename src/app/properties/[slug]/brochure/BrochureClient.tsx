"use client";

import { Property, formatPriceFull } from "@/data/properties";
import { QrCode } from "./QrCode";

/* -------------------------------------------------------------------------- */
/*  SVG Logo (inline so it renders in print without external requests)         */
/* -------------------------------------------------------------------------- */
function TauroLogo({ fill = "#C9A96E", size = 144 }: { fill?: string; size?: number }) {
  const height = (size / 192) * 64;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 64" width={size} height={height} aria-label="Tauro logo" role="img">
      <g fill={fill}>
        <path d="M16 8 C12 4, 6 2, 2 6 C0 8, 1 12, 4 14 L18 22 Z" />
        <path d="M48 8 C52 4, 58 2, 62 6 C64 8, 63 12, 60 14 L46 22 Z" />
        <path d="M14 18 C14 18, 12 26, 16 34 C20 42, 28 48, 32 50 C36 48, 44 42, 48 34 C52 26, 50 18, 50 18 L44 14 C40 12, 36 11, 32 11 C28 11, 24 12, 20 14 Z" />
        <path d="M14 18 L10 16 C8 18, 9 22, 12 24 L18 22 Z" />
        <path d="M50 18 L54 16 C56 18, 55 22, 52 24 L46 22 Z" />
        <ellipse cx="26" cy="38" rx="3" ry="2.5" fill="#1A1A2E" opacity="0.3" />
        <ellipse cx="38" cy="38" rx="3" ry="2.5" fill="#1A1A2E" opacity="0.3" />
        <line x1="32" y1="28" x2="32" y2="34" stroke="#1A1A2E" strokeWidth="1" opacity="0.15" />
      </g>
      <g fill={fill}>
        <path d="M72 22 L72 25 L77.5 25 L77.5 46 L80.5 46 L80.5 25 L86 25 L86 22 Z" />
        <path d="M89 46 L92 46 L93.5 41 L101.5 41 L103 46 L106 46 L98.5 22 L96.5 22 Z M94.5 38.5 L97.5 27.5 L100.5 38.5 Z" />
        <path d="M109 22 L109 38 C109 42.5, 112 46.5, 117.5 46.5 C123 46.5, 126 42.5, 126 38 L126 22 L123 22 L123 37.5 C123 40.8, 121 43.5, 117.5 43.5 C114 43.5, 112 40.8, 112 37.5 L112 22 Z" />
        <path d="M131 22 L131 46 L134 46 L134 37 L138 37 L143 46 L146.5 46 L141 36.5 C143.5 35.5, 145 33, 145 30 C145 25.5, 142 22, 137.5 22 Z M134 25 L137 25 C140.5 25, 142 27, 142 30 C142 33, 140.5 34.5, 137 34.5 L134 34.5 Z" />
        <path d="M158 21.5 C151.5 21.5, 149 26.5, 149 34 C149 41.5, 151.5 46.5, 158 46.5 C164.5 46.5, 167 41.5, 167 34 C167 26.5, 164.5 21.5, 158 21.5 Z M158 24.5 C162.5 24.5, 164 28, 164 34 C164 40, 162.5 43.5, 158 43.5 C153.5 43.5, 152 40, 152 34 C152 28, 153.5 24.5, 158 24.5 Z" />
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
