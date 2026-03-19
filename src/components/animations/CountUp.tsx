"use client";

import { useRef, useState, useEffect } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
  className?: string;
}

function parseValue(value: string) {
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, decimals: 0, suffix: value };
  return {
    prefix: match[1],
    num: parseFloat(match[2]),
    decimals: match[2].includes(".") ? match[2].split(".")[1].length : 0,
    suffix: match[3],
  };
}

export default function CountUp({ value, duration = 2, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let cancelled = false;
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        if (cancelled) return;

        const { prefix, num, decimals, suffix } = parseValue(value);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: num,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (!cancelled) setDisplay(`${prefix}${obj.val.toFixed(decimals)}${suffix}`);
          },
        });
      } catch {
        // Fallback: show final value
      }
    };
    loadGSAP();
    return () => { cancelled = true; };
  }, [value, duration]);

  return <span ref={ref} className={className}>{display}</span>;
}
