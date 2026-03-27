import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 40;

/**
 * Lightweight touch-swipe hook for carousels.
 * Returns handlers to spread onto the swipeable element.
 */
export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = useRef(0);
  const deltaX = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (Math.abs(deltaX.current) > SWIPE_THRESHOLD) {
      if (deltaX.current < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
