"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tauro_favorites";

// ---------- shared external store so every component stays in sync ----------
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function getServerSnapshot(): string[] {
  return [];
}

// ---------- helper to persist ----------
function persist(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  emitChange();
}

// ---------- hook ----------
export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const current = getSnapshot();
    const next = current.includes(id)
      ? current.filter((i) => i !== id)
      : [...current, id];
    persist(next);
  }, []);

  const isFavorite = useCallback(
    (id: string) => ids.includes(id),
    [ids],
  );

  const getAll = useCallback(() => ids, [ids]);

  return {
    toggle,
    isFavorite,
    getAll,
    count: ids.length,
  };
}
