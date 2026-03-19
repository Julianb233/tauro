"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  mode?: "word" | "char";
  stagger?: number;
  duration?: number;
  className?: string;
}

export default function TextReveal({
  children,
  mode = "word",
  stagger = 0.05,
  duration = 0.6,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const el = ref.current;
        if (!el) return;

        const text = el.textContent || "";
        const parts = mode === "char" ? text.split("") : text.split(/\s+/);

        el.innerHTML = parts
          .map((p) => `<span style="display:inline-block;opacity:0;transform:translateY(20px)">${p}</span>`)
          .join(mode === "char" ? "" : " ");

        const spans = el.querySelectorAll("span");
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      } catch {
        // Fallback: text stays visible
      }
    };
    loadGSAP();
  }, [mode, stagger, duration]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
