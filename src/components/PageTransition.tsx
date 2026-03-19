"use client";

import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

/**
 * Wraps page content with a fade + slide transition on route changes.
 * CSS-only transitions, respects prefers-reduced-motion via the global
 * media query in globals.css (which collapses transition-duration to 0).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const prevPath = useRef(pathname);

  // When pathname changes: fade out, swap content, fade in
  useEffect(() => {
    if (pathname === prevPath.current) {
      // Same path (initial render or hash change) -- just show content
      setDisplayedChildren(children);
      return;
    }

    prevPath.current = pathname;

    // Phase 1: fade out
    setVisible(false);

    const timeout = setTimeout(() => {
      // Phase 2: swap content and fade in
      setDisplayedChildren(children);
      setVisible(true);
    }, 200); // match CSS transition duration

    return () => clearTimeout(timeout);
  }, [pathname, children]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 250ms ease-out, transform 250ms ease-out",
      }}
    >
      {displayedChildren}
    </div>
  );
}
