"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GoldShimmerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GoldShimmer({
  children,
  className,
  ...props
}: GoldShimmerProps) {
  return (
    <div className={cn("gold-shimmer", className)} {...props}>
      <span className="relative z-2">{children}</span>
    </div>
  );
}
