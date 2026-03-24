"use client";

import { useRef, useEffect } from "react";

interface GoldDividerProps {
  className?: string;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Animation duration (seconds) */
  duration?: number;
}

export default function GoldDivider({
  className = "",
  delay = 0,
  duration = 1.2,
}: GoldDividerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ctx: { revert: () => void } | undefined;

    const loadGSAP = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Animate scaleX from 0 → 1 (draws from center outward)
        gsap.fromTo(
          el,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration,
            delay,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    };

    loadGSAP();

    return () => {
      ctx?.revert();
    };
  }, [delay, duration]);

  return (
    <div
      ref={ref}
      className={`gold-divider-animated mx-auto max-w-7xl ${className}`}
      style={{ scaleX: 0, opacity: 0 }}
    />
  );
}
