import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "md" | "lg" | "xl";
type ColorVariant = "light" | "dark" | "gold";

interface TauroLogoProps {
  size?: SizeVariant;
  variant?: ColorVariant;
  className?: string;
  showText?: boolean;
}

const sizeMap: Record<SizeVariant, { width: number; height: number }> = {
  sm: { width: 80, height: 52 },
  md: { width: 120, height: 78 },
  lg: { width: 160, height: 104 },
  xl: { width: 240, height: 156 },
};

const colorMap: Record<ColorVariant, { primary: string; accent: string; mask: string }> = {
  light: { primary: "#FFFFFF", accent: "#C9A96E", mask: "#FFFFFF" },
  dark: { primary: "#1A1A2E", accent: "#C9A96E", mask: "#1A1A2E" },
  gold: { primary: "#C9A96E", accent: "#A8854A", mask: "#C9A96E" },
};

/**
 * Tauro Realty premium logo — Zorro-inspired masked bull design.
 * Bold horns, dramatic eye mask, premium serif typography.
 */
export function TauroLogo({ size = "sm", variant = "light", className, showText = true }: TauroLogoProps) {
  const { width, height } = sizeMap[size];
  const { primary, accent, mask } = colorMap[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 156"
      width={width}
      height={height}
      className={cn("shrink-0", className)}
      aria-label="Tauro Realty"
      role="img"
    >
      {/* === BULL ICON WITH ZORRO MASK === */}
      <g>
        {/* Left horn — sweeping dramatic curve */}
        <path
          d="M72 52 C60 28, 44 16, 32 14 C36 20, 42 32, 50 44 C56 52, 66 58, 80 58"
          fill={primary}
        />
        <path
          d="M32 14 C26 10, 18 12, 16 20"
          stroke={primary}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right horn — sweeping dramatic curve */}
        <path
          d="M168 52 C180 28, 196 16, 208 14 C204 20, 198 32, 190 44 C184 52, 174 58, 160 58"
          fill={primary}
        />
        <path
          d="M208 14 C214 10, 222 12, 224 20"
          stroke={primary}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        {/* Bull face — strong oval */}
        <path
          d="M80 50 C80 40, 96 30, 120 30 C144 30, 160 40, 160 50 L160 68 C160 82, 144 92, 120 92 C96 92, 80 82, 80 68 Z"
          stroke={primary}
          strokeWidth="3.5"
          fill="none"
        />

        {/* Ears */}
        <path
          d="M76 44 C68 38, 62 42, 64 50"
          stroke={primary}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M164 44 C172 38, 178 42, 176 50"
          stroke={primary}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* === ZORRO MASK — dramatic band across eyes === */}
        <path
          d="M82 50 C82 50, 90 44, 100 46 L108 48 C112 48.5, 116 48.5, 120 48.5 C124 48.5, 128 48.5, 132 48 L140 46 C150 44, 158 50, 158 50 L162 56 C162 56, 154 62, 140 60 L132 58 C128 57.5, 124 57.5, 120 57.5 C116 57.5, 112 57.5, 108 58 L100 60 C86 62, 78 56, 78 56 Z"
          fill={mask}
          opacity="0.15"
        />
        {/* Mask pointed tips (Zorro flair) */}
        <path
          d="M78 53 L68 48 M162 53 L172 48"
          stroke={primary}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Eyes — sharp and intense within the mask */}
        <ellipse cx="104" cy="53" rx="5" ry="3.5" fill={primary} />
        <ellipse cx="136" cy="53" rx="5" ry="3.5" fill={primary} />
        {/* Eye glint */}
        <circle cx="106" cy="52" r="1" fill={variant === "dark" ? "#FFFFFF" : "#1A1A2E"} opacity="0.6" />
        <circle cx="138" cy="52" r="1" fill={variant === "dark" ? "#FFFFFF" : "#1A1A2E"} opacity="0.6" />

        {/* Nose bridge */}
        <path d="M116 60 L116 72 M124 60 L124 72" stroke={primary} strokeWidth="2" fill="none" />

        {/* Nostrils — strong presence */}
        <ellipse cx="112" cy="76" rx="5" ry="3.5" stroke={primary} strokeWidth="2.5" fill="none" />
        <ellipse cx="128" cy="76" rx="5" ry="3.5" stroke={primary} strokeWidth="2.5" fill="none" />

        {/* Chin / jaw accent */}
        <path
          d="M104 86 C110 90, 130 90, 136 86"
          stroke={primary}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Zorro slash mark — subtle Z accent behind bull */}
        <path
          d="M170 28 L182 28 L170 42 L182 42"
          stroke={accent}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </g>

      {showText && (
        <>
          {/* TAURO text — premium serif */}
          <text
            x="120"
            y="116"
            textAnchor="middle"
            fill={primary}
            fontFamily="'Playfair Display', Georgia, serif"
            fontWeight="700"
            fontSize="28"
            letterSpacing="5"
          >
            TAURO
          </text>

          {/* REALTY subtitle */}
          <text
            x="120"
            y="134"
            textAnchor="middle"
            fill={accent}
            fontFamily="'Montserrat', 'DM Sans', sans-serif"
            fontWeight="600"
            fontSize="11"
            letterSpacing="6"
          >
            REALTY
          </text>

          {/* Decorative line under TAURO */}
          <line x1="88" y1="120" x2="152" y2="120" stroke={accent} strokeWidth="1" opacity="0.5" />
        </>
      )}
    </svg>
  );
}
