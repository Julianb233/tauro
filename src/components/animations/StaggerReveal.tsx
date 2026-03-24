"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

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
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setFallback(true);
    }, 2000);

    try {
      const loadGSAP = async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (cancelled) return;

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
      setFallback(true);
    }

    return () => { cancelled = true; clearTimeout(timeout); };
  }, [selector, stagger, duration]);

  return (
    <div ref={ref} className={className} style={fallback ? { opacity: 1 } : undefined}>
      {children}
    </div>
  );
}
