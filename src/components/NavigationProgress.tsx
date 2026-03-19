"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Thin gold loading bar at the very top of the viewport.
 * Animates from 0 -> ~80% on navigation start, then 100% + fade on load.
 * Respects prefers-reduced-motion via globals.css blanket rule.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const prevPath = useRef(pathname);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;

    // Clear any pending completion
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Start: jump to ~15% instantly, then animate to ~80%
    setProgress(15);
    setOpacity(1);

    // Quickly ramp to ~80%
    requestAnimationFrame(() => {
      setProgress(80);
    });

    // Complete: go to 100% then fade
    timeoutRef.current = setTimeout(() => {
      setProgress(100);
      timeoutRef.current = setTimeout(() => {
        setOpacity(0);
        // Reset after fade
        timeoutRef.current = setTimeout(() => {
          setProgress(0);
        }, 300);
      }, 200);
    }, 250);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        height: "3px",
        width: `${progress}%`,
        opacity,
        background:
          "linear-gradient(90deg, #C9A96E, #D4C4A0, #C9A96E)",
        transition:
          progress === 15
            ? "none"
            : progress === 100
              ? "width 200ms ease-out, opacity 300ms ease-out"
              : "width 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease-out",
        pointerEvents: "none",
      }}
    />
  );
}
