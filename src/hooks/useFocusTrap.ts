"use client";

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

/**
 * Traps focus within a container element while active.
 * Returns a ref to attach to the container and restores focus on cleanup.
 *
 * @param active - Whether the focus trap is active (e.g. modal is open)
 * @param options.onEscape - Optional callback when Escape key is pressed
 * @param options.initialFocusRef - Optional ref to element that should receive initial focus
 */
export function useFocusTrap(
  active: boolean,
  options?: {
    onEscape?: () => void;
    initialFocusRef?: React.RefObject<HTMLElement | null>;
  },
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && options?.onEscape) {
        e.stopPropagation();
        options.onEscape();
        return;
      }

      if (e.key !== "Tab" || !containerRef.current) return;

      const focusable = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [options],
  );

  useEffect(() => {
    if (!active) return;

    // Store the element that had focus before the trap activated
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Set initial focus
    const timer = requestAnimationFrame(() => {
      if (options?.initialFocusRef?.current) {
        options.initialFocusRef.current.focus();
      } else if (containerRef.current) {
        const firstFocusable =
          containerRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          // If no focusable elements, focus the container itself
          containerRef.current.setAttribute("tabindex", "-1");
          containerRef.current.focus();
        }
      }
    });

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(timer);
      document.removeEventListener("keydown", handleKeyDown);

      // Restore focus to the element that had it before the trap
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [active, handleKeyDown, options]);

  return containerRef;
}
