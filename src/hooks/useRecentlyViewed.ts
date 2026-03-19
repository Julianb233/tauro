"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tauro_recently_viewed";
const MAX_ITEMS = 8;

export interface RecentlyViewedItem {
  id: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  viewedAt: number;
}

// ---------- shared external store so every component stays in sync ----------
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentlyViewedItem[]) : [];
  } catch {
    return [];
  }
}

function getServerSnapshot(): RecentlyViewedItem[] {
  return [];
}

// ---------- helper to persist ----------
function persist(items: RecentlyViewedItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emitChange();
}

// ---------- hook ----------
export function useRecentlyViewed() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const track = useCallback(
    (item: Omit<RecentlyViewedItem, "viewedAt">) => {
      const current = getSnapshot();
      // Remove existing entry for this property (to re-add at front)
      const filtered = current.filter((i) => i.id !== item.id);
      const next = [{ ...item, viewedAt: Date.now() }, ...filtered].slice(
        0,
        MAX_ITEMS,
      );
      persist(next);
    },
    [],
  );

  return { items, track };
}
