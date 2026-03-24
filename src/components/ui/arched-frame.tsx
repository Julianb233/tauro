import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface ArchedFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Optional gold border accent */
  bordered?: boolean;
  /** Aspect ratio class — defaults to aspect-[3/4] */
  aspect?: string;
}

/**
 * Arched image frame — rounded top that evokes classic architectural arches.
 * Wrap an <Image fill /> or any content inside this container.
 */
export function ArchedFrame({
  children,
  bordered = false,
  aspect = "aspect-[3/4]",
  className,
  ...props
}: ArchedFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspect,
        // Arch shape: large top radius, subtle bottom radius
        "rounded-t-[50%] rounded-b-lg",
        bordered && "ring-2 ring-gold/40 ring-offset-2 ring-offset-background",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
