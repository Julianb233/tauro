import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "md" | "lg";
type ColorVariant = "light" | "dark";

interface LogoProps {
  /** sm = navbar ~32px, md = footer ~48px, lg = hero ~64px */
  size?: SizeVariant;
  /** light = gold on dark bg, dark = midnight on light bg */
  variant?: ColorVariant;
  className?: string;
  /** @deprecated Use size prop instead */
  width?: number;
  /** @deprecated Use size prop instead */
  height?: number;
}

const sizeMap: Record<SizeVariant, { width: number; height: number }> = {
  sm: { width: 96, height: 32 },
  md: { width: 144, height: 48 },
  lg: { width: 192, height: 64 },
};

const colorMap: Record<ColorVariant, string> = {
  light: "#C9A96E",
  dark: "#1A1A2E",
};

export function Logo({
  size = "sm",
  variant = "light",
  className,
  width,
  height,
}: LogoProps) {
  const dimensions = width && height
    ? { width, height }
    : sizeMap[size];

  const fill = colorMap[variant];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 64"
      width={dimensions.width}
      height={dimensions.height}
      className={cn("shrink-0", className)}
      aria-label="Tauro logo"
      role="img"
    >
      {/* Bull head mark — geometric, minimal */}
      <g fill={fill}>
        {/* Left horn */}
        <path d="M16 8 C12 4, 6 2, 2 6 C0 8, 1 12, 4 14 L18 22 Z" />
        {/* Right horn */}
        <path d="M48 8 C52 4, 58 2, 62 6 C64 8, 63 12, 60 14 L46 22 Z" />
        {/* Head — shield shape */}
        <path d="M14 18 C14 18, 12 26, 16 34 C20 42, 28 48, 32 50 C36 48, 44 42, 48 34 C52 26, 50 18, 50 18 L44 14 C40 12, 36 11, 32 11 C28 11, 24 12, 20 14 Z" />
        {/* Left ear */}
        <path d="M14 18 L10 16 C8 18, 9 22, 12 24 L18 22 Z" />
        {/* Right ear */}
        <path d="M50 18 L54 16 C56 18, 55 22, 52 24 L46 22 Z" />
        {/* Nostrils — negative space */}
        <ellipse cx="26" cy="38" rx="3" ry="2.5" fill={variant === "light" ? "#1A1A2E" : "#FFFFFF"} opacity="0.3" />
        <ellipse cx="38" cy="38" rx="3" ry="2.5" fill={variant === "light" ? "#1A1A2E" : "#FFFFFF"} opacity="0.3" />
        {/* Nose bridge line */}
        <line x1="32" y1="28" x2="32" y2="34" stroke={variant === "light" ? "#1A1A2E" : "#FFFFFF"} strokeWidth="1" opacity="0.15" />
      </g>

      {/* TAURO text — premium serif tracking */}
      <g fill={fill}>
        {/* T */}
        <path d="M72 22 L72 25 L77.5 25 L77.5 46 L80.5 46 L80.5 25 L86 25 L86 22 Z" />
        {/* A */}
        <path d="M89 46 L92 46 L93.5 41 L101.5 41 L103 46 L106 46 L98.5 22 L96.5 22 Z M94.5 38.5 L97.5 27.5 L100.5 38.5 Z" />
        {/* U */}
        <path d="M109 22 L109 38 C109 42.5, 112 46.5, 117.5 46.5 C123 46.5, 126 42.5, 126 38 L126 22 L123 22 L123 37.5 C123 40.8, 121 43.5, 117.5 43.5 C114 43.5, 112 40.8, 112 37.5 L112 22 Z" />
        {/* R */}
        <path d="M131 22 L131 46 L134 46 L134 37 L138 37 L143 46 L146.5 46 L141 36.5 C143.5 35.5, 145 33, 145 30 C145 25.5, 142 22, 137.5 22 Z M134 25 L137 25 C140.5 25, 142 27, 142 30 C142 33, 140.5 34.5, 137 34.5 L134 34.5 Z" />
        {/* O */}
        <path d="M158 21.5 C151.5 21.5, 149 26.5, 149 34 C149 41.5, 151.5 46.5, 158 46.5 C164.5 46.5, 167 41.5, 167 34 C167 26.5, 164.5 21.5, 158 21.5 Z M158 24.5 C162.5 24.5, 164 28, 164 34 C164 40, 162.5 43.5, 158 43.5 C153.5 43.5, 152 40, 152 34 C152 28, 153.5 24.5, 158 24.5 Z" />
      </g>
    </svg>
  );
}
