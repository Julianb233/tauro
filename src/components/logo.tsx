import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 120, height = 40 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 40"
      width={width}
      height={height}
      className={cn("shrink-0", className)}
      aria-label="Tauro logo"
      role="img"
    >
      {/* TODO: Replace with actual NanoBanana Pro generated SVG (Zorro/bull-inspired) — BRAND-04 */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#C9A84C"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize="24"
        fontWeight="700"
        letterSpacing="4"
      >
        TAURO
      </text>
    </svg>
  );
}
