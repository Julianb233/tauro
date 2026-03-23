import Image from "next/image";
import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "md" | "lg";
type ColorVariant = "light" | "dark";

interface LogoProps {
  size?: SizeVariant;
  variant?: ColorVariant;
  className?: string;
}

const sizeMap: Record<SizeVariant, { width: number; height: number }> = {
  sm: { width: 80, height: 68 },
  md: { width: 120, height: 102 },
  lg: { width: 160, height: 136 },
};

export function Logo({ size = "sm", variant = "light", className }: LogoProps) {
  const dimensions = sizeMap[size];
  const src = variant === "light" ? "/tauro-logo-white.svg" : "/tauro-logo-dark.svg";

  return (
    <Image
      src={src}
      alt="Tauro Realty"
      width={dimensions.width}
      height={dimensions.height}
      className={cn("shrink-0 object-contain", className)}
      priority
      quality={100}
    />
  );
}
