"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  /** The target value to count up to (e.g. "500+", "$2.1B", "98%") */
  value: string;
  /** Duration of the count animation in seconds. Default 2 */
  duration?: number;
  className?: string;
}

/**
 * Parses a display value like "$2.1B", "500+", "98%" into parts
 * for animation: prefix, numeric portion, suffix.
 */
function parseValue(value: string) {
  const match = value.match(/^([^0-9]*)([\d.]+)(.*)$/);
  if (!match) return { prefix: "", num: 0, decimals: 0, suffix: value };
  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const num = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { prefix, num, decimals, suffix };
}

export default function CountUp({
  value,
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { prefix, num, decimals, suffix } = parseValue(value);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

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
        setDisplay(`${prefix}${obj.val.toFixed(decimals)}${suffix}`);
      },
    });
  });

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
