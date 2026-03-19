"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: React.ReactNode;
  /** CSS selector for child items to stagger. Default "> *" */
  selector?: string;
  /** Stagger delay between each item in seconds. Default 0.12 */
  stagger?: number;
  /** Animation duration per item. Default 0.7 */
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

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        // Make children visible immediately
        gsap.set(ref.current!.querySelectorAll(selector), { opacity: 1, y: 0 });
        return;
      }

      const items = ref.current!.querySelectorAll(selector);
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
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
