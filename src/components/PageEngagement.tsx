"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth, trackTimeOnPage } from "@/lib/analytics";

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 100%) and time on page.
 * Drop this into any layout to enable engagement tracking globally.
 */
export function PageEngagement() {
  const pathname = usePathname();
  const milestones = useRef(new Set<number>());
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Reset on navigation
    milestones.current = new Set();
    startTime.current = Date.now();

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const milestone of [25, 50, 75, 100]) {
        if (percent >= milestone && !milestones.current.has(milestone)) {
          milestones.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    function handleBeforeUnload() {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds > 5) {
        trackTimeOnPage(seconds, pathname);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pathname]);

  return null;
}
