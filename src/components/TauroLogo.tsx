import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "md" | "lg";
type ColorVariant = "light" | "dark";

interface TauroLogoProps {
  size?: SizeVariant;
  variant?: ColorVariant;
  className?: string;
}

const sizeMap: Record<SizeVariant, { width: number; height: number }> = {
  sm: { width: 80, height: 52 },
  md: { width: 120, height: 78 },
  lg: { width: 160, height: 104 },
};

export function TauroLogo({ size = "sm", variant = "light", className }: TauroLogoProps) {
  const { width, height } = sizeMap[size];
  const fill = variant === "light" ? "#FFFFFF" : "#1A1A2E";

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
      {/* Bull head with house roof */}
      <g fill={fill}>
        {/* House roof / triangle */}
        <path d="M120 12 L140 32 L134 32 L120 18 L106 32 L100 32 Z" />
        {/* House chimney */}
        <rect x="133" y="18" width="4" height="10" />

        {/* Horns */}
        <path d="M88 56 C78 36, 68 28, 58 24 C62 28, 66 36, 70 46 C74 54, 82 58, 90 58 Z" strokeWidth="0" />
        <path d="M152 56 C162 36, 172 28, 182 24 C178 28, 174 36, 170 46 C166 54, 158 58, 150 58 Z" strokeWidth="0" />

        {/* Outer horn curves */}
        <path
          d="M58 24 C52 22, 46 24, 44 30"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M182 24 C188 22, 194 24, 196 30"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Head outline */}
        <path
          d="M90 52 C86 52, 82 56, 82 62 L82 72 C82 72, 84 68, 92 66 L92 52 Z"
          opacity="0.9"
        />
        <path
          d="M150 52 C154 52, 158 56, 158 62 L158 72 C158 72, 156 68, 148 66 L148 52 Z"
          opacity="0.9"
        />

        {/* Face */}
        <ellipse cx="120" cy="62" rx="28" ry="22" opacity="0.05" />
        <path
          d="M92 52 C92 44, 104 36, 120 36 C136 36, 148 44, 148 52 L148 66 C148 78, 136 88, 120 88 C104 88, 92 78, 92 66 Z"
          stroke={fill}
          strokeWidth="3.5"
          fill="none"
        />

        {/* Eyes */}
        <circle cx="108" cy="56" r="2.5" />
        <circle cx="132" cy="56" r="2.5" />

        {/* Nose bridge */}
        <path d="M116 60 L116 70 M124 60 L124 70" stroke={fill} strokeWidth="2" fill="none" />

        {/* Nostrils */}
        <ellipse cx="113" cy="74" rx="4" ry="3" stroke={fill} strokeWidth="2" fill="none" />
        <ellipse cx="127" cy="74" rx="4" ry="3" stroke={fill} strokeWidth="2" fill="none" />

        {/* Ears */}
        <path
          d="M86 48 C80 44, 76 48, 78 54"
          stroke={fill}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M154 48 C160 44, 164 48, 162 54"
          stroke={fill}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* House frame behind head */}
        <rect x="96" y="32" width="48" height="40" rx="2" stroke={fill} strokeWidth="3" fill="none" opacity="0.3" />
      </g>

      {/* TAURO REALTY text */}
      <text
        x="120"
        y="114"
        textAnchor="middle"
        fill={fill}
        fontFamily="'Playfair Display', Georgia, serif"
        fontWeight="700"
        fontSize="26"
        letterSpacing="3"
      >
        TAURO REALTY
      </text>

      {/* PREMIER REAL ESTATE subtitle */}
      <text
        x="120"
        y="132"
        textAnchor="middle"
        fill={fill}
        fontFamily="'Montserrat', 'DM Sans', sans-serif"
        fontWeight="500"
        fontSize="10"
        letterSpacing="4"
        opacity="0.7"
      >
        PREMIER REAL ESTATE
      </text>
    </svg>
  );
}
