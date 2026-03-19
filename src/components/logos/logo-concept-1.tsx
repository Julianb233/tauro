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
 * Concept 1 — "Abstract Bull Crest"
 * A refined, abstract bull silhouette integrated into a shield/crest shape.
 * The bull is suggested through negative space and clever geometry.
 */
export function LogoConcept1({
  size = "sm",
  variant = "light",
  className,
}: LogoConceptProps) {
  const dimensions = sizeMap[size];
  const { primary, accent } = colors[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 80"
      width={dimensions.width}
      height={dimensions.height}
      className={cn("shrink-0", className)}
      aria-label="Tauro logo — Abstract Bull Crest"
      role="img"
    >
      {/* Shield / Crest shape */}
      <g fill={primary}>
        {/* Outer shield */}
        <path d="M32 6 L54 6 C56 6, 58 8, 58 10 L58 38 C58 48, 50 58, 43 62 C41 63, 39 63, 37 62 L37 62 C30 58, 22 48, 22 38 L22 10 C22 8, 24 6, 26 6 Z" />
        {/* Negative-space bull head — cut out from shield */}
        <path
          d="M32 14 L48 14 L48 36 C48 44, 44 50, 40 52 C36 50, 32 44, 32 36 Z"
          fill={variant === "light" ? "#1A1A2E" : "#F8F6F1"}
        />
        {/* Bull horns emerging from shield top — negative space creates the silhouette */}
        <path d="M26 6 C22 2, 16 1, 14 5 C13 7, 14 10, 16 12 L24 16 L26 10 Z" />
        <path d="M54 6 C58 2, 64 1, 66 5 C67 7, 66 10, 64 12 L56 16 L54 10 Z" />
        {/* Inner bull profile — gold on dark cutout */}
        <path
          d="M36 20 L44 20 L44 32 C44 38, 42 42, 40 44 C38 42, 36 38, 36 32 Z"
          fill={primary}
        />
        {/* Subtle nostrils */}
        <circle cx="38" cy="36" r="1" fill={variant === "light" ? "#1A1A2E" : "#F8F6F1"} opacity="0.4" />
        <circle cx="42" cy="36" r="1" fill={variant === "light" ? "#1A1A2E" : "#F8F6F1"} opacity="0.4" />
        {/* Nose bridge */}
        <line
          x1="40" y1="28" x2="40" y2="33"
          stroke={variant === "light" ? "#1A1A2E" : "#F8F6F1"}
          strokeWidth="0.6"
          opacity="0.25"
        />
      </g>

      {/* TAURO wordmark — premium serif with wide tracking */}
      <g fill={primary}>
        {/* T */}
        <path d="M82 28 L82 31 L87.5 31 L87.5 54 L90.5 54 L90.5 31 L96 31 L96 28 Z" />
        {/* A */}
        <path d="M102 54 L105 54 L106.5 49 L114.5 49 L116 54 L119 54 L111.5 28 L109.5 28 Z M107.5 46.5 L110.5 35 L113.5 46.5 Z" />
        {/* U */}
        <path d="M124 28 L124 44 C124 48.5, 127 52.5, 132.5 52.5 C138 52.5, 141 48.5, 141 44 L141 28 L138 28 L138 43.5 C138 46.8, 136 49.5, 132.5 49.5 C129 49.5, 127 46.8, 127 43.5 L127 28 Z" />
        {/* R */}
        <path d="M148 28 L148 54 L151 54 L151 43 L155 43 L160 54 L163.5 54 L158 42.5 C160.5 41.5, 162 39, 162 36 C162 31.5, 159 28, 154.5 28 Z M151 31 L154 31 C157.5 31, 159 33, 159 36 C159 39, 157.5 40.5, 154 40.5 L151 40.5 Z" />
        {/* O */}
        <path d="M175 27.5 C168.5 27.5, 166 32.5, 166 40 C166 47.5, 168.5 52.5, 175 52.5 C181.5 52.5, 184 47.5, 184 40 C184 32.5, 181.5 27.5, 175 27.5 Z M175 30.5 C179.5 30.5, 181 34, 181 40 C181 46, 179.5 49.5, 175 49.5 C170.5 49.5, 169 46, 169 40 C169 34, 170.5 30.5, 175 30.5 Z" />
      </g>

      {/* Thin decorative line beneath text */}
      <line
        x1="82" y1="58" x2="184" y2="58"
        stroke={primary}
        strokeWidth="0.5"
        opacity="0.4"
      />
    </svg>
  );
}
