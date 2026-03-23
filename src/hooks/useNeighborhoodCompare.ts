"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "tauro_neighborhood_compare";
const MAX_ITEMS = 3;

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function emit() {
  listeners.forEach((cb) => cb());
}

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  emit();
}

let cachedSnapshot: string[] = [];
function getSnapshot(): string[] {
  const next = readIds();
  if (
    next.length === cachedSnapshot.length &&
    next.every((id, i) => id === cachedSnapshot[i])
  ) {
    return cachedSnapshot;
  }
  cachedSnapshot = next;
  return cachedSnapshot;
}

function getServerSnapshot(): string[] {
  return [];
}

export function useNeighborhoodCompare() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((id: string) => {
    const current = readIds();
    if (current.includes(id) || current.length >= MAX_ITEMS) return;
    writeIds([...current, id]);
  }, []);

  const remove = useCallback((id: string) => {
    writeIds(readIds().filter((x) => x !== id));
  }, []);

  const toggle = useCallback((id: string) => {
    const current = readIds();
    if (current.includes(id)) {
      writeIds(current.filter((x) => x !== id));
    } else if (current.length < MAX_ITEMS) {
      writeIds([...current, id]);
    }
  }, []);

  const isComparing = useCallback(
    (id: string) => ids.includes(id),
    [ids],
  );

  const clear = useCallback(() => {
    writeIds([]);
  }, []);

  return {
    ids,
    count: ids.length,
    add,
    remove,
    toggle,
    isComparing,
    clear,
  } as const;
}
