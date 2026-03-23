"use client";

import { useState, useEffect } from "react";
import { MessageSquare, X } from "lucide-react";
import { ContactForm } from "./contact-form";

export function ContactFAB() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* FAB trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open quick contact form"
        className="fixed bottom-24 right-6 z-[9996] flex h-14 w-14 items-center justify-center rounded-full bg-gold text-near-black shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gold-light hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 no-print"
      >
        <MessageSquare className="size-6" strokeWidth={2} />
        {/* Pulse ring */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-20 duration-1000" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Quick contact form"
          className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center p-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-scale-in">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close contact form"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-1"
            >
              <X className="size-4" />
            </button>

            {/* Form content */}
            <div className="max-h-[85vh] overflow-y-auto px-6 pb-6 pt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
