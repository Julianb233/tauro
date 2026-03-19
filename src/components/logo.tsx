import Image from "next/image";
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
  sm: { width: 96, height: 96 },
  md: { width: 144, height: 144 },
  lg: { width: 192, height: 192 },
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

  return (
    <Image
      src="/tauro-logo.png"
      alt="Tauro Realty logo"
      width={dimensions.width}
      height={dimensions.height}
      className={cn(
        "shrink-0 object-contain",
        variant === "dark" && "brightness-0",
        className
      )}
      priority
    />
  );
}
