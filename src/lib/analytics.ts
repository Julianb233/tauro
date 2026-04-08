/**
 * GA4 analytics event tracking utilities.
 * All functions no-op safely when GA4 is not loaded or consent not given.
 */

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as Record<string, unknown>).gtag as GtagFn | undefined ?? null;
}

function trackEvent(eventName: string, params?: Record<string, unknown>) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", eventName, params);
}

// --- Lead Form Events ---

export function trackFormSubmission(
  formType: "contact" | "tour_booking" | "seller_inquiry" | "callback" | "newsletter" | "agent_contact" | "open_house_rsvp",
  extra?: Record<string, unknown>
) {
  trackEvent("generate_lead", {
    event_category: "form",
    event_label: formType,
    ...extra,
  });
}

// --- Property Events ---

export function trackPropertyView(property: {
  id: string;
  title: string;
  price?: number;
  neighborhood?: string;
}) {
  trackEvent("view_item", {
    event_category: "property",
    item_id: property.id,
    item_name: property.title,
    value: property.price,
    item_category: property.neighborhood,
  });
}

export function trackPropertySearch(query: {
  neighborhood?: string;
  priceRange?: string;
  propertyType?: string;
}) {
  trackEvent("search", {
    event_category: "property",
    search_term: query.neighborhood || "all",
    ...query,
  });
}

export function trackBrochureDownload(propertyId: string, propertyTitle: string) {
  trackEvent("file_download", {
    event_category: "property",
    event_label: "brochure",
    item_id: propertyId,
    item_name: propertyTitle,
  });
}

// --- Agent Events ---

export function trackAgentView(agentSlug: string, agentName: string) {
  trackEvent("view_item", {
    event_category: "agent",
    item_id: agentSlug,
    item_name: agentName,
  });
}

export function trackAgentContact(agentSlug: string, method: "phone" | "email" | "form") {
  trackEvent("contact", {
    event_category: "agent",
    event_label: method,
    item_id: agentSlug,
  });
}

// --- Click-to-Call ---

export function trackClickToCall(phoneNumber: string, location: string) {
  trackEvent("click_to_call", {
    event_category: "engagement",
    event_label: location,
    phone_number: phoneNumber,
  });
}

// --- CTA Clicks ---

export function trackCtaClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    event_category: "engagement",
    event_label: ctaName,
    location,
  });
}

// --- Page Engagement ---

export function trackScrollDepth(depth: number) {
  trackEvent("scroll", {
    event_category: "engagement",
    percent_scrolled: depth,
  });
}

export function trackTimeOnPage(seconds: number, pagePath: string) {
  trackEvent("page_engagement", {
    event_category: "engagement",
    engagement_time_msec: seconds * 1000,
    page_path: pagePath,
  });
}

// --- Favorites ---

export function trackFavoriteToggle(propertyId: string, action: "add" | "remove") {
  trackEvent(action === "add" ? "add_to_wishlist" : "remove_from_wishlist", {
    event_category: "property",
    item_id: propertyId,
  });
}
