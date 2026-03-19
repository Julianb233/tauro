"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  /** "word" splits by spaces; "char" splits by character. Default "word" */
  mode?: "word" | "char";
  /** Stagger delay between each word/char. Default 0.04 */
  stagger?: number;
  /** Duration per item. Default 0.5 */
  duration?: number;
  className?: string;
  /** HTML element to render. Default "p" */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
}

export default function TextReveal({
  children,
  mode = "word",
  stagger = 0.04,
  duration = 0.5,
  className,
  as: Tag = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  const items =
    mode === "word"
      ? children.split(" ").map((w, i) => (
          <span key={i} className="inline-block" style={{ opacity: 0 }}>
            {w}&nbsp;
          </span>
        ))
      : children.split("").map((ch, i) => (
          <span
            key={i}
            className="inline-block"
            style={{ opacity: 0, whiteSpace: ch === " " ? "pre" : undefined }}
          >
            {ch}
          </span>
        ));

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(ref.current!.querySelectorAll("span"), { opacity: 1, y: 0 });
        return;
      }

      const spans = ref.current!.querySelectorAll("span");
      gsap.fromTo(
        spans,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    // @ts-expect-error -- dynamic tag
    <Tag ref={ref} className={className}>
      {items}
    </Tag>
  );
}
