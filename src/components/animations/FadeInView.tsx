"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  start?: string;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export default function FadeInView({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className,
  start = "top 85%",
}: FadeInViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const loadGSAP = async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const offset = directionOffset[direction];
        gsap.fromTo(
          ref.current,
          { opacity: 0, x: offset.x, y: offset.y },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      };
      loadGSAP();
    } catch {
      setVisible(true);
    }
  }, [direction, delay, duration, start]);

  return (
    <div ref={ref} className={className} style={visible ? undefined : { opacity: 0 }}>
      {children}
    </div>
  );
}
