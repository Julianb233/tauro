"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  selector?: string;
  stagger?: number;
  duration?: number;
  className?: string;
}

export default function StaggerReveal({
  children,
  selector = "> *",
  stagger = 0.12,
  duration = 0.7,
  className,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const loadGSAP = async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const items = ref.current?.querySelectorAll(selector);
        if (!items?.length) return;

        gsap.set(items, { opacity: 0, y: 30 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      };
      loadGSAP();
    } catch {
      // Fallback: just show children
    }
  }, [selector, stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
