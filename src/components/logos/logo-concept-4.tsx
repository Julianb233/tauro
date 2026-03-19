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
 * Concept 4 — "Architectural Bull"
 * Bull horns abstracted into an architectural arch/doorway shape,
 * symbolizing both the bull and real estate (homes, doorways).
 * Clean, geometric, sophisticated.
 */
export function LogoConcept4({
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
      aria-label="Tauro logo — Architectural Bull"
      role="img"
    >
      {/* Architectural arch / doorway with horn integration */}
      <g fill="none" stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Left horn sweeping outward from arch top */}
        <path d="M24 30 C20 22, 14 12, 8 6 C6 4, 5 5, 6 7 C8 12, 14 20, 20 26" />
        {/* Right horn sweeping outward from arch top */}
        <path d="M56 30 C60 22, 66 12, 72 6 C74 4, 75 5, 74 7 C72 12, 66 20, 60 26" />

        {/* Arch / doorway — the central architectural element */}
        <path d="M20 66 L20 30 C20 18, 28 10, 40 10 C52 10, 60 18, 60 30 L60 66" />

        {/* Inner arch — nested for depth */}
        <path
          d="M28 66 L28 36 C28 26, 33 20, 40 20 C47 20, 52 26, 52 36 L52 66"
          strokeWidth="1.2"
          opacity="0.5"
        />

        {/* Keystone at arch peak */}
        <path d="M37 12 L40 8 L43 12" strokeWidth="1.5" />

        {/* Base line / threshold */}
        <line x1="16" y1="66" x2="64" y2="66" strokeWidth="2" />
      </g>

      {/* Small decorative diamond at keystone */}
      <path d="M39 11 L40 9 L41 11 L40 13 Z" fill={primary} />

      {/* TAURO REALTY wordmark */}
      <g fill={primary}>
        {/* T */}
        <path d="M86 22 L86 24.5 L90.5 24.5 L90.5 42 L93 42 L93 24.5 L97.5 24.5 L97.5 22 Z" />
        {/* A */}
        <path d="M103 42 L105.5 42 L106.8 38 L113.2 38 L114.5 42 L117 42 L111 22 L109 22 Z M107.5 36 L110 27 L112.5 36 Z" />
        {/* U */}
        <path d="M122 22 L122 35 C122 38.8, 124.5 42.2, 128.5 42.2 C132.5 42.2, 135 38.8, 135 35 L135 22 L132.5 22 L132.5 34.5 C132.5 37.4, 131 39.5, 128.5 39.5 C126 39.5, 124.5 37.4, 124.5 34.5 L124.5 22 Z" />
        {/* R */}
        <path d="M141 22 L141 42 L143.5 42 L143.5 34 L146.5 34 L150.5 42 L153.5 42 L149 33.5 C151 32.7, 152.5 31, 152.5 28.5 C152.5 24.5, 150 22, 146.5 22 Z M143.5 24.5 L146 24.5 C148.5 24.5, 150 26, 150 28.5 C150 31, 148.5 32, 146 32 L143.5 32 Z" />
        {/* O */}
        <path d="M164 21.5 C159 21.5, 157 25.5, 157 32 C157 38.5, 159 42.5, 164 42.5 C169 42.5, 171 38.5, 171 32 C171 25.5, 169 21.5, 164 21.5 Z M164 24 C167.5 24, 168.5 27, 168.5 32 C168.5 37, 167.5 40, 164 40 C160.5 40, 159.5 37, 159.5 32 C159.5 27, 160.5 24, 164 24 Z" />
      </g>

      {/* "REALTY" beneath — smaller, lighter weight */}
      <g fill={primary} opacity="0.7">
        {/* R */}
        <path d="M108 50 L108 62 L110 62 L110 57.5 L112 57.5 L114.5 62 L117 62 L114 57 C115.5 56.5, 116.5 55, 116.5 53.5 C116.5 51, 114.5 50, 112.5 50 Z M110 52 L112 52 C113.5 52, 114.5 52.8, 114.5 53.5 C114.5 54.8, 113.5 55.5, 112 55.5 L110 55.5 Z" />
        {/* E */}
        <path d="M120 50 L120 62 L128 62 L128 60 L122 60 L122 57 L127 57 L127 55 L122 55 L122 52 L128 52 L128 50 Z" />
        {/* A */}
        <path d="M132 62 L134 62 L135 59 L140 59 L141 62 L143 62 L138.5 50 L137 50 Z M135.5 57 L137.5 52 L139.5 57 Z" />
        {/* L */}
        <path d="M146 50 L146 62 L153 62 L153 60 L148 60 L148 50 Z" />
        {/* T */}
        <path d="M155 50 L155 52 L158.5 52 L158.5 62 L160.5 62 L160.5 52 L164 52 L164 50 Z" />
        {/* Y */}
        <path d="M166 50 L170 56 L174 50 L172 50 L170 53.5 L168 50 Z" />
        <rect x="169" y="56" width="2" height="6" />
      </g>

      {/* Thin separator line between TAURO and REALTY */}
      <line
        x1="108" y1="46" x2="174" y2="46"
        stroke={primary}
        strokeWidth="0.4"
        opacity="0.3"
      />
    </svg>
  );
}
