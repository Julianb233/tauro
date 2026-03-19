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
 * Concept 3 — "Golden Bull Profile"
 * An elegant side-profile bull head in minimalist line-art style.
 * Single continuous stroke feel. Luxury fashion brand aesthetic.
 */
export function LogoConcept3({
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
      aria-label="Tauro logo — Golden Bull Profile"
      role="img"
    >
      {/* Bull side-profile — continuous line-art stroke */}
      <g
        fill="none"
        stroke={primary}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Horn — elegant sweeping curve */}
        <path d="M8 8 C12 4, 18 3, 22 6 C26 9, 26 14, 24 18" />
        {/* Forehead to ear */}
        <path d="M24 18 C22 20, 18 22, 16 20 C14 18, 16 14, 20 16" />
        {/* Forehead down to brow */}
        <path d="M24 18 C28 20, 30 24, 30 28" />
        {/* Eye — subtle almond shape */}
        <path d="M24 24 C26 23, 28 24, 27 26 C26 27, 24 26, 24 24 Z" />
        {/* Bridge of nose */}
        <path d="M30 28 C32 32, 34 38, 36 42" />
        {/* Nose and muzzle */}
        <path d="M36 42 C38 46, 40 50, 42 52 C44 54, 46 54, 48 52 C50 50, 50 46, 48 44" />
        {/* Nostril */}
        <path d="M42 48 C43 47, 45 47, 44 49" />
        {/* Jaw line curving back */}
        <path d="M48 44 C46 40, 42 36, 38 34 C34 32, 30 34, 28 38" />
        {/* Chin and throat */}
        <path d="M28 38 C26 44, 24 50, 22 56" />
        {/* Neck line */}
        <path d="M22 56 C20 60, 16 64, 12 66" />
        {/* Back of neck from ear */}
        <path d="M16 20 C12 24, 10 32, 10 40 C10 48, 10 56, 12 66" />
      </g>

      {/* Small filled eye dot */}
      <circle cx="26" cy="25" r="1.2" fill={primary} />

      {/* TAURO wordmark — refined serif with wide tracking */}
      <g fill={primary}>
        {/* T */}
        <path d="M72 28 L72 31 L78 31 L78 56 L81 56 L81 31 L87 31 L87 28 Z" />
        {/* Serif feet on T */}
        <rect x="76.5" y="53.5" width="6" height="2.5" rx="0.3" />

        {/* A */}
        <path d="M96 56 L99 56 L100.5 51 L109.5 51 L111 56 L114 56 L106 28 L104 28 Z M101.5 48.5 L105 36 L108.5 48.5 Z" />

        {/* U */}
        <path d="M122 28 L122 44 C122 49, 125.5 53, 131 53 C136.5 53, 140 49, 140 44 L140 28 L137 28 L137 43.5 C137 47.2, 135 50, 131 50 C127 50, 125 47.2, 125 43.5 L125 28 Z" />

        {/* R */}
        <path d="M149 28 L149 56 L152 56 L152 44 L156.5 44 L162 56 L165.5 56 L159.5 43.5 C162 42.3, 163.5 40, 163.5 37 C163.5 32, 160.5 28, 156 28 Z M152 31 L155.5 31 C159 31, 160.5 33.2, 160.5 37 C160.5 40, 159 41.5, 155.5 41.5 L152 41.5 Z" />

        {/* O */}
        <path d="M177 27.5 C170.5 27.5, 168 33, 168 42 C168 51, 170.5 56.5, 177 56.5 C183.5 56.5, 186 51, 186 42 C186 33, 183.5 27.5, 177 27.5 Z M177 30.5 C181.5 30.5, 183 34.5, 183 42 C183 49.5, 181.5 53.5, 177 53.5 C172.5 53.5, 171 49.5, 171 42 C171 34.5, 172.5 30.5, 177 30.5 Z" />
      </g>

      {/* Thin decorative line above text */}
      <line
        x1="72" y1="24" x2="186" y2="24"
        stroke={primary}
        strokeWidth="0.4"
        opacity="0.3"
      />
      {/* Thin decorative line below text */}
      <line
        x1="72" y1="60" x2="186" y2="60"
        stroke={primary}
        strokeWidth="0.4"
        opacity="0.3"
      />
    </svg>
  );
}
