"use client";

import { useEffect, useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Toast context                                                       */
/* ------------------------------------------------------------------ */

type ToastVariant = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Toast item                                                          */
/* ------------------------------------------------------------------ */

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const icon = toast.variant === "success" ? (
    <Check className="size-4 text-emerald-400" />
  ) : toast.variant === "error" ? (
    <X className="size-4 text-red-400" />
  ) : null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto flex items-center gap-2.5 rounded-xl border border-white/10 bg-foreground/95 px-4 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-xl transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      {icon}
      {toast.message}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Toast provider                                                      */
/* ------------------------------------------------------------------ */

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const addToast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, message, variant }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {mounted &&
        createPortal(
          <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[9999] flex flex-col items-center gap-2">
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
