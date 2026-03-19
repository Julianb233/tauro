import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "md" | "lg";
type ColorVariant = "light" | "dark";

interface LogoConceptProps {
  size?: SizeVariant;
  variant?: ColorVariant;
  className?: string;
}

const sizeMap: Record<SizeVariant, { width: number; height: number }> = {
  sm: { width: 120, height: 40 },
  md: { width: 180, height: 60 },
  lg: { width: 240, height: 80 },
};

const colors: Record<ColorVariant, { primary: string; accent: string }> = {
  light: { primary: "#C9A96E", accent: "#1A1A2E" },
  dark: { primary: "#1A1A2E", accent: "#F8F6F1" },
};

/**
 * Concept 2 — "Monogram Crown"
 * A sophisticated "T" monogram with subtle bull horn elements forming a crown.
 * Very clean, very high-end. Think Ritz-Carlton meets real estate.
 */
export function LogoConcept2({
  size = "sm",
  variant = "light",
  className,
}: LogoConceptProps) {
  const dimensions = sizeMap[size];
  const { primary } = colors[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 80"
      width={dimensions.width}
      height={dimensions.height}
      className={cn("shrink-0", className)}
      aria-label="Tauro logo — Monogram Crown"
      role="img"
    >
      {/* Crown / Horn monogram mark */}
      <g fill="none" stroke={primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Left horn curving up into crown */}
        <path d="M22 28 C18 18, 14 8, 10 4 C9 3, 8 3.5, 8.5 5 C10 10, 14 18, 20 24" />
        {/* Right horn curving up into crown */}
        <path d="M58 28 C62 18, 66 8, 70 4 C71 3, 72 3.5, 71.5 5 C70 10, 66 18, 60 24" />
        {/* Crown center peak */}
        <path d="M34 12 L40 4 L46 12" />
        {/* Crown base connecting horns */}
        <path d="M20 24 L22 20 L30 16 L34 12" />
        <path d="M60 24 L58 20 L50 16 L46 12" />
        {/* Small diamond at crown peak */}
        <path d="M38 6 L40 3 L42 6 L40 9 Z" fill={primary} />
      </g>

      {/* Large T monogram */}
      <g fill={primary}>
        {/* T crossbar */}
        <rect x="24" y="28" width="32" height="2.5" rx="0.5" />
        {/* T stem */}
        <rect x="38.5" y="28" width="3" height="30" rx="0.5" />
        {/* Elegant serifs on T */}
        <rect x="24" y="28" width="2" height="4" rx="0.5" />
        <rect x="54" y="28" width="2" height="4" rx="0.5" />
        <rect x="36" y="55" width="8" height="2.5" rx="0.5" />
      </g>

      {/* Thin circle frame around monogram */}
      <circle
        cx="40" cy="38" r="34"
        fill="none"
        stroke={primary}
        strokeWidth="0.6"
        opacity="0.35"
      />

      {/* TAURO wordmark — wide letter-spacing, refined */}
      <g fill={primary}>
        {/* T */}
        <path d="M96 48 L96 50.5 L100.5 50.5 L100.5 66 L103 66 L103 50.5 L107.5 50.5 L107.5 48 Z" />
        {/* A */}
        <path d="M114 66 L116.5 66 L117.8 62 L124.2 62 L125.5 66 L128 66 L122 48 L120 48 Z M118.5 60 L121 51 L123.5 60 Z" />
        {/* U */}
        <path d="M134 48 L134 60 C134 63.5, 136.5 66.5, 140.5 66.5 C144.5 66.5, 147 63.5, 147 60 L147 48 L144.5 48 L144.5 59.5 C144.5 62.2, 143 64.2, 140.5 64.2 C138 64.2, 136.5 62.2, 136.5 59.5 L136.5 48 Z" />
        {/* R */}
        <path d="M154 48 L154 66 L156.5 66 L156.5 59 L159.5 59 L163.5 66 L166.5 66 L162 58.5 C164 57.7, 165.5 55.8, 165.5 53.5 C165.5 50, 163 48, 159.5 48 Z M156.5 50.5 L159 50.5 C161.5 50.5, 163 52, 163 53.5 C163 55.5, 161.5 57, 159 57 L156.5 57 Z" />
        {/* O */}
        <path d="M178 47.5 C173 47.5, 171 51, 171 57 C171 63, 173 66.5, 178 66.5 C183 66.5, 185 63, 185 57 C185 51, 183 47.5, 178 47.5 Z M178 50 C181.5 50, 182.5 52.5, 182.5 57 C182.5 61.5, 181.5 64, 178 64 C174.5 64, 173.5 61.5, 173.5 57 C173.5 52.5, 174.5 50, 178 50 Z" />
      </g>

      {/* Subtle decorative dots flanking the wordmark */}
      <circle cx="91" cy="57" r="1" fill={primary} opacity="0.5" />
      <circle cx="190" cy="57" r="1" fill={primary} opacity="0.5" />
    </svg>
  );
}
