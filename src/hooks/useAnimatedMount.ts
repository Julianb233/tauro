import { useState, useEffect, useCallback } from "react";

/**
 * Hook that manages mount/unmount lifecycle for animated overlays.
 * Returns `mounted` (whether to render the DOM node) and `visible`
 * (whether to apply the "open" CSS classes). On close, `visible`
 * becomes false first so the exit animation plays, then `mounted`
 * becomes false after `duration` ms to remove the element from the DOM.
 */
export function useAnimatedMount(
  open: boolean,
  duration = 300,
): { mounted: boolean; visible: boolean } {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Delay one frame so the element is in the DOM before we trigger the transition
      const raf = requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration]);

  return { mounted, visible };
}
