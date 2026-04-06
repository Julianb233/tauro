/**
 * GA4 event tracking utilities.
 * All tracking functions are no-ops when GA is not loaded or consent not given.
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

// ---------------------------------------------------------------------------
// Custom events
// ---------------------------------------------------------------------------

/** Track a lead form submission (contact, showing request, etc.) */
export function trackLeadSubmission(formName: string, agentSlug?: string) {
  gtag("event", "generate_lead", {
    event_category: "lead",
    event_label: formName,
    agent: agentSlug ?? "none",
  });
}

/** Track a property detail page view */
export function trackPropertyView(propertySlug: string, price?: number) {
  gtag("event", "view_item", {
    event_category: "property",
    event_label: propertySlug,
    value: price,
    currency: "USD",
  });
}

/** Track clicking an agent's contact info (phone, email) */
export function trackAgentContact(
  agentSlug: string,
  contactType: "phone" | "email" | "form",
) {
  gtag("event", "contact_agent", {
    event_category: "engagement",
    event_label: `${agentSlug}:${contactType}`,
  });
}

/** Track CTA button clicks */
export function trackCTAClick(ctaName: string, location: string) {
  gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: ctaName,
    event_location: location,
  });
}

/** Track property search / filter usage */
export function trackPropertySearch(filters: Record<string, unknown>) {
  gtag("event", "search", {
    event_category: "property",
    search_term: JSON.stringify(filters),
  });
}

/** Track newsletter signup */
export function trackNewsletterSignup() {
  gtag("event", "sign_up", {
    event_category: "newsletter",
    method: "email",
  });
}

/** Track phone number clicks (click-to-call) */
export function trackPhoneClick(phoneNumber: string, context: string) {
  gtag("event", "click_to_call", {
    event_category: "engagement",
    event_label: phoneNumber,
    event_location: context,
  });
}

/** Track showing/tour request */
export function trackShowingRequest(propertySlug?: string) {
  gtag("event", "schedule_showing", {
    event_category: "conversion",
    event_label: propertySlug ?? "general",
  });
}

/** Track page engagement milestones (scroll depth, time on page) */
export function trackPageEngagement(milestone: string, pagePath: string) {
  gtag("event", "page_engagement", {
    event_category: "engagement",
    event_label: milestone,
    page_path: pagePath,
  });
}
