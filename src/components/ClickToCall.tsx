"use client";

import { trackClickToCall } from "@/lib/analytics";

interface ClickToCallProps {
  phone: string;
  location: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a phone link with GA4 click-to-call tracking.
 */
export function ClickToCall({
  phone,
  location,
  children,
  className,
}: ClickToCallProps) {
  return (
    <a
      href={`tel:${phone}`}
      className={className}
      onClick={() => trackClickToCall(phone, location)}
    >
      {children}
    </a>
  );
}
