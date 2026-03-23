"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bed,
  Bath,
  Ruler,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Home,
  Check,
  Play,
  View,
  Printer,
  Lock,
  Download,
  Loader2,
  DollarSign,
  Footprints,
  TrainFront,
  Star,
  Bell,
ChevronLeft,
  ChevronRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Property, formatPriceFull, formatDaysOnMarket } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import OpenHouseBanner from "@/components/OpenHouseBanner";
import PropertyVideoTour from "@/components/PropertyVideoTour";
import PriceHistory from "@/components/PriceHistory";
import RoomBreakdown from "@/components/RoomBreakdown";
import PropertyDetailsTable from "@/components/PropertyDetailsTable";
import ShareButton from "@/components/ShareButton";
import PropertyAmenities from "@/components/PropertyAmenities";
import { cn } from "@/lib/utils";

// Heavy components — lazy-loaded to reduce initial bundle
const ImageGallery = dynamic(() => import("@/components/ImageGallery"));
const PropertyMap = dynamic(() => import("@/components/PropertyMap"));
const MortgageCalculator = dynamic(
  () => import("@/components/MortgageCalculator"),
);
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useUtm } from "@/hooks/useUtm";
import { siteUrl } from "@/lib/site-config";
import { Logo } from "@/components/logo";

/** Minimal QR code SVG component using a simple matrix encoding approach */
function QRCodeSVG({ url, size = 120 }: { url: string; size?: number }) {
  // Generate a deterministic pattern from the URL for visual QR-like appearance
  // This uses a simple encoding — for production, a proper QR library would be ideal
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" fill="white" />
      {/* QR finder patterns (top-left, top-right, bottom-left) */}
      {/* Top-left */}
      <rect x="4" y="4" width="28" height="28" fill="black" />
      <rect x="8" y="8" width="20" height="20" fill="white" />
      <rect x="12" y="12" width="12" height="12" fill="black" />
      {/* Top-right */}
      <rect x="88" y="4" width="28" height="28" fill="black" />
      <rect x="92" y="8" width="20" height="20" fill="white" />
      <rect x="96" y="12" width="12" height="12" fill="black" />
      {/* Bottom-left */}
      <rect x="4" y="88" width="28" height="28" fill="black" />
      <rect x="8" y="92" width="20" height="20" fill="white" />
      <rect x="12" y="96" width="12" height="12" fill="black" />
      {/* Timing patterns */}
      {[36, 44, 52, 60, 68, 76, 84].map((x) => (
        <rect key={`h-${x}`} x={x} y="12" width="4" height="4" fill={x % 8 === 4 ? "black" : "white"} />
      ))}
      {[36, 44, 52, 60, 68, 76, 84].map((y) => (
        <rect key={`v-${y}`} x="12" y={y} width="4" height="4" fill={y % 8 === 4 ? "black" : "white"} />
      ))}
      {/* Center area — data-like modules */}
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => {
          const charCode = url.charCodeAt((row * 8 + col) % url.length) || 0;
          const on = (charCode + row + col) % 3 !== 0;
          return on ? (
            <rect
              key={`d-${row}-${col}`}
              x={36 + col * 6}
              y={36 + row * 6}
              width="5"
              height="5"
              fill="black"
            />
          ) : null;
        })
      )}
      {/* Alignment pattern */}
      <rect x="88" y="88" width="12" height="12" fill="black" />
      <rect x="90" y="90" width="8" height="8" fill="white" />
      <rect x="92" y="92" width="4" height="4" fill="black" />
    </svg>
  );
}

/** Convert HOA fee to monthly amount for payment calculation */
function getMonthlyHoa(property: Property): number {
  if (!property.has_hoa || !property.hoa_fee) return 0;
  switch (property.hoa_frequency) {
    case "quarterly": return property.hoa_fee / 3;
    case "annual": return property.hoa_fee / 12;
    default: return property.hoa_fee; // monthly
  }
}

interface NeighborhoodMiniGuide {
  medianPrice: string;
  walkScore: number;
  transitScore: number;
  localSpots: { name: string; type: string; description: string }[];
}

export default function PropertyDetailClient({
  property,
  similar,
  neighborhoodSlug,
  neighborhoodName,
  neighborhoodMiniGuide,
}: {
  property: Property;
  similar: Property[];
  neighborhoodSlug?: string;
  neighborhoodName?: string;
  neighborhoodMiniGuide?: NeighborhoodMiniGuide;
}) {
  const utm = useUtm();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [earlyAccessData, setEarlyAccessData] = useState({ name: "", email: "", phone: "" });
  const [earlyAccessSubmitting, setEarlyAccessSubmitting] = useState(false);
  const [earlyAccessSuccess, setEarlyAccessSuccess] = useState(false);
  const [earlyAccessError, setEarlyAccessError] = useState("");
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);
  const { track } = useRecentlyViewed();

  // Mobile floating CTA: visible when sidebar agent card scrolls out of view
  const [showMobileCta, setShowMobileCta] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show floating CTA when the sidebar is NOT visible
        setShowMobileCta(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);

  const handleDownloadBrochure = async () => {
    if (downloadingBrochure) return;
    setDownloadingBrochure(true);
    try {
      const res = await fetch("/api/brochures/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: property.slug }),
      });
      if (!res.ok) throw new Error("Failed to generate brochure");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tauro-${property.slug}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // fail silently
    } finally {
      setDownloadingBrochure(false);
    }
  };

  useEffect(() => {
    track({
      id: property.id,
      slug: property.slug,
      address: property.address,
      city: property.city,
      state: property.state,
      zip: property.zip,
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      sqft: property.sqft,
      image: property.images[0],
    });
  }, [property.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const [firstName, ...rest] = formData.name.split(" ");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "showing" as const,
          firstName,
          lastName: rest.join(" ") || firstName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || undefined,
          propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
          propertyId: property.id,
          ...utm,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEarlyAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEarlyAccessSubmitting(true);
    setEarlyAccessError("");

    try {
      const [firstName, ...rest] = earlyAccessData.name.split(" ");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "early_access" as const,
          firstName,
          lastName: rest.join(" ") || firstName,
          email: earlyAccessData.email,
          phone: earlyAccessData.phone,
          message: `Early access request for ${property.address}`,
          propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
          propertyId: property.id,
          ...utm,
        }),
      });

      if (res.ok) {
        setEarlyAccessSuccess(true);
        setEarlyAccessData({ name: "", email: "", phone: "" });
      } else {
        setEarlyAccessError("Something went wrong. Please try again.");
      }
    } catch {
      setEarlyAccessError("Something went wrong. Please try again.");
    } finally {
      setEarlyAccessSubmitting(false);
    }
  };

  const listingUrl = `${siteUrl}/properties/${property.slug}`;

  return (
    <div className="min-h-screen pt-16">
      {/* ─── Print-only layout ─── */}
      <div className="print-only" style={{ padding: "0 1rem" }}>
        {/* Header with logo and contact */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #C9A96E", paddingBottom: "12px", marginBottom: "20px" }}>
          <Logo size="md" variant="dark" />
          <div style={{ textAlign: "right", fontSize: "10pt" }}>
            <div style={{ fontWeight: 600 }}>Tauro Realty</div>
            <div>info@taurorealty.com</div>
            <div>(215) 839-4172</div>
          </div>
        </div>

        {/* Property address and price */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{ fontSize: "22pt", fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
            {property.address}
          </h1>
          <p style={{ fontSize: "12pt", margin: "4px 0 0", color: "#555" }}>
            {property.city}, {property.state} {property.zip}
          </p>
          <p style={{ fontSize: "20pt", fontWeight: 700, margin: "8px 0 0", color: "#C9A96E" }}>
            {formatPriceFull(property.price)}
          </p>
        </div>

        {/* Key details */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "20px", fontSize: "11pt", borderTop: "1px solid #ddd", borderBottom: "1px solid #ddd", padding: "10px 0" }}>
          <span><strong>{property.beds}</strong> Beds</span>
          <span><strong>{property.baths}</strong> Baths</span>
          <span><strong>{property.sqft.toLocaleString()}</strong> Sq Ft</span>
          <span><strong>{property.lotSqft > 0 ? `${property.lotSqft.toLocaleString()} SF` : "N/A"}</strong> Lot</span>
          <span><strong>{property.yearBuilt}</strong> Year Built</span>
          <span><strong>{property.propertyType}</strong></span>
          <span><strong>${property.tax_annual.toLocaleString()}</strong> Taxes ({property.tax_year})</span>
          {property.has_hoa && property.hoa_fee && (
            <span><strong>${property.hoa_fee.toLocaleString()}/mo</strong> HOA</span>
          )}
        </div>

        {/* First 4 images in 2x2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
          {property.images.slice(0, 4).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${property.address} photo ${i + 1}`}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "4px" }}
            />
          ))}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "14pt", fontWeight: 700, marginBottom: "8px" }}>About This Property</h2>
          <p style={{ fontSize: "10pt", lineHeight: 1.6 }}>{property.description}</p>
        </div>

        {/* Agent info */}
        <div style={{ borderTop: "1px solid #ddd", paddingTop: "12px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "12pt", fontWeight: 700, marginBottom: "6px" }}>Listing Agent</h2>
          <p style={{ fontSize: "10pt", margin: 0 }}>
            <strong>{property.agent.name}</strong>
          </p>
          <p style={{ fontSize: "10pt", margin: "2px 0" }}>{property.agent.phone}</p>
          <p style={{ fontSize: "10pt", margin: "2px 0" }}>{property.agent.email}</p>
        </div>

        {/* QR code and footer */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "2px solid #C9A96E", paddingTop: "12px" }}>
          <div>
            <p style={{ fontSize: "9pt", color: "#555", margin: "0 0 4px" }}>Scan to view online:</p>
            <QRCodeSVG url={listingUrl} size={80} />
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "10pt", fontWeight: 600, margin: 0 }}>taurorealty.com</p>
            <p style={{ fontSize: "8pt", color: "#888", margin: "2px 0 0" }}>{listingUrl}</p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Gallery -- full-bleed, no horizontal padding (AI-3885) */}
      <div className="relative bg-white">
        <div className="w-full py-2">
          {property.isComingSoon ? (
            <div className="relative">
              <div className="pointer-events-none select-none blur-lg">
                <ImageGallery images={property.images} address={property.address} />
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-gold/30 bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
                  {earlyAccessSuccess ? (
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/20">
                        <Check className="h-7 w-7 text-emerald-500" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">You are on the list!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        We will notify you as soon as this property is available for showings.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-gold">
                          <Lock className="h-5 w-5 text-white" />
                        </div>
                        <span className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-gold px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                          Coming Soon
                        </span>
                        <h3 className="mt-3 font-heading text-xl font-bold">Register for Early Access</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Be the first to know when this property is available. Get exclusive access to photos, pricing, and showing times.
                        </p>
                      </div>
                      <form className="space-y-3" onSubmit={handleEarlyAccessSubmit}>
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          disabled={earlyAccessSubmitting}
                          value={earlyAccessData.name}
                          onChange={(e) => setEarlyAccessData({ ...earlyAccessData, name: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          required
                          disabled={earlyAccessSubmitting}
                          value={earlyAccessData.email}
                          onChange={(e) => setEarlyAccessData({ ...earlyAccessData, email: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          disabled={earlyAccessSubmitting}
                          value={earlyAccessData.phone}
                          onChange={(e) => setEarlyAccessData({ ...earlyAccessData, phone: e.target.value })}
                          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={earlyAccessSubmitting}
                          className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-gold py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {earlyAccessSubmitting ? "Submitting..." : "Get Early Access"}
                        </button>
                        {earlyAccessError && (
                          <p className="mt-2 text-center text-sm text-red-400">{earlyAccessError}</p>
                        )}
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <ImageGallery images={property.images} address={property.address} />
          )}
        </div>
      </div>

      {/* Key details bar - sticky */}
      <div className="sticky top-16 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-heading text-2xl font-bold text-gold sm:text-3xl">
              {formatPriceFull(property.price)}
            </span>
            {property.isComingSoon && (
              <span className="rounded-full bg-gradient-to-r from-purple-600 to-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Coming Soon
              </span>
            )}
            {property.isExclusive && (
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-near-black">
                Exclusive
              </span>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" /> {property.beds} BD
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" /> {property.baths} BA
              </span>
              <span className="flex items-center gap-1">
                <Ruler className="h-4 w-4" /> {property.sqft.toLocaleString()} SF
              </span>
              <span className="flex items-center gap-1">
                <Home className="h-4 w-4" /> {property.propertyType}
              </span>
              {property.tax_annual > 0 && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ${Math.round(property.tax_annual / 12).toLocaleString()}/mo tax
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton
              url={listingUrl}
              title={`${property.address} — ${formatPriceFull(property.price)}`}
              description={property.description}
              image={property.images[0]}
            />
            <button
              onClick={() => window.print()}
              className="no-print flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              aria-label="Print property details"
              title="Print"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownloadBrochure}
              disabled={downloadingBrochure}
              className="no-print flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
              aria-label="Download property brochure PDF"
              title="Download Brochure"
            >
              {downloadingBrochure ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {downloadingBrochure ? "Generating…" : "Brochure"}
              </span>
            </button>
            <a
              href="#schedule"
              className="no-print rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              {property.isComingSoon ? "Register Interest" : "Schedule a Showing"}
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div className="space-y-10">
            {/* Address & status */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-2xl font-bold sm:text-3xl">{property.address}</h1>
                <span
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
                    property.status === "Active" && "bg-emerald-600/20 text-emerald-400",
                    property.status === "New" && "bg-gold/20 text-gold",
                    property.status === "Open House" && "bg-blue-600/20 text-blue-400",
                    property.status === "Pending" && "bg-orange-500/20 text-orange-400",
                    property.status === "Coming Soon" && "bg-purple-600/20 text-purple-400"
                  )}
                >
                  {property.status}
                </span>
                {property.isComingSoon && (
                  <span className="rounded-md bg-gradient-to-r from-purple-600 to-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Coming Soon
                  </span>
                )}
                {property.isExclusive && (
                  <span className="rounded-md bg-gradient-to-r from-amber-500 to-yellow-300 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-near-black">
                    Exclusive
                  </span>
                )}
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {property.city}, {property.state} {property.zip}
              </p>
              {property.openHouse && (
                <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-gold">
                  <Calendar className="h-4 w-4" />
                  Open House: {property.openHouse}
                </p>
              )}
              {/* AI-3786: Days on market */}
              {formatDaysOnMarket(property.listingDate) && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDaysOnMarket(property.listingDate)}
                </p>
              )}
            </div>

            {/* Open House Banner */}
            {property.openHouseEvent && (
              <OpenHouseBanner property={property} />
            )}

            {/* Structured Amenities — Interior / Exterior / Community */}
            <PropertyAmenities property={property} />

            {/* Description */}
            <div>
              <h2 className="font-heading text-xl font-bold">About This Property</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{property.description}</p>
              <PropertyDetailsTable property={property} />
            </div>

            {/* Video Tour (PROP-08) — agent-narrated Sotheby's style */}
            {property.videoTourUrl && (
              <PropertyVideoTour
                videoUrl={property.videoTourUrl}
                address={property.address}
                agent={{
                  name: property.agent.name,
                  photo: property.agent.photo,
                }}
              />
            )}

            {/* 3D Virtual Tour (PROP-09) */}
            {property.virtualTourUrl && (
              <div>
                <h2 className="font-heading text-xl font-bold">
                  <View className="mr-2 inline-block h-5 w-5 text-gold" />
                  3D Virtual Tour
                </h2>
                <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-border bg-cream">
                  <iframe
                    src={property.virtualTourUrl}
                    title={`3D walkthrough of ${property.address}`}
                    className="h-full w-full"
                    allow="fullscreen; vr"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Click and drag to explore the property in 3D
                </p>
              </div>
            )}

            {/* Features */}
            <div>
              <h2 className="font-heading text-xl font-bold">Features & Amenities</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-3">
                {(["interior", "exterior", "community"] as const).map((cat) => (
                  <div key={cat}>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gold">
                      {cat}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features[cat].map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/5 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-gold/40 hover:bg-gold/10 hover:text-foreground"
                        >
                          <Check className="h-3 w-3 flex-shrink-0 text-gold" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room-by-Room Breakdown */}
            {property.rooms && property.rooms.length > 0 && (
              <RoomBreakdown rooms={property.rooms} />
            )}

            {/* Location map */}
            <div>
              <h2 className="font-heading text-xl font-bold">Location</h2>
              <div className="mt-4 h-64 overflow-hidden rounded-xl border border-border">
                <PropertyMap
                  properties={[property]}
                  singleMarker
                  center={[property.lng, property.lat]}
                  zoom={14}
                />
              </div>
              {neighborhoodSlug && neighborhoodName && (
                <>
                  {/* Neighborhood Mini-Guide */}
                  {neighborhoodMiniGuide && (
                    <div className="mt-6 rounded-xl border border-border bg-cream/50 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          {neighborhoodName}
                        </h3>
                        <Link
                          href={`/neighborhoods/${neighborhoodSlug}`}
                          className="text-xs font-medium text-gold hover:underline"
                        >
                          Full Guide
                        </Link>
                      </div>

                      {/* Stats row */}
                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <DollarSign className="h-3.5 w-3.5 text-gold" />
                          <span>Median {neighborhoodMiniGuide.medianPrice}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Footprints className="h-3.5 w-3.5 text-gold" />
                          <span>Walk Score {neighborhoodMiniGuide.walkScore}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <TrainFront className="h-3.5 w-3.5 text-gold" />
                          <span>Transit {neighborhoodMiniGuide.transitScore}</span>
                        </div>
                      </div>

                      {/* Local spots */}
                      {neighborhoodMiniGuide.localSpots.length > 0 && (
                        <div className="mt-4 space-y-2.5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Nearby Favorites
                          </p>
                          {neighborhoodMiniGuide.localSpots.map((spot) => (
                            <div
                              key={spot.name}
                              className="flex items-start gap-2"
                            >
                              <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                              <div>
                                <span className="text-sm font-medium text-foreground">
                                  {spot.name}
                                </span>
                                <span className="ml-1.5 text-xs text-muted-foreground">
                                  {spot.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <Link
                    href={`/neighborhoods/${neighborhoodSlug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                  >
                    <MapPin className="h-4 w-4" />
                    Explore the {neighborhoodName} Neighborhood Guide
                  </Link>
                </>
              )}
            </div>

            {/* Price History Timeline */}
            {property.priceHistory && property.priceHistory.length > 0 && (
              <PriceHistory history={property.priceHistory} />
            )}

            {/* Mortgage Calculator */}
            <MortgageCalculator
              homePrice={property.price}
              taxAnnual={property.tax_annual}
              hoaMonthly={
                property.has_hoa && property.hoa_fee
                  ? property.hoa_frequency === "quarterly"
                    ? Math.round(property.hoa_fee / 3)
                    : property.hoa_frequency === "annual"
                    ? Math.round(property.hoa_fee / 12)
                    : property.hoa_fee
                  : undefined
              }
            />

            {/* Similar properties carousel */}
            {similar.length > 0 && (
              <SimilarListingsCarousel similar={similar} neighborhoodName={neighborhoodName} />
            )}

            {/* Property alert signup */}
            <PropertyAlertSignup neighborhoodName={neighborhoodName} />
          </div>

          {/* Right column - Agent card + Schedule form */}
          <div ref={sidebarRef} className="space-y-6 lg:sticky lg:top-36 lg:self-start">
            {/* Agent card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-4">
                <Image
                  src={property.agent.photo}
                  alt={property.agent.name}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-gold object-cover"
                  sizes="64px"
                />
                <div>
                  <p className="font-heading text-lg font-bold">{property.agent.name}</p>
                  <p className="text-sm text-muted-foreground">Listing Agent</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                  {property.agent.phone}
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4" />
                  {property.agent.email}
                </a>
              </div>
              {property.agent.slug && (
                <Link
                  href={`/agents/${property.agent.slug}`}
                  className="mt-4 block text-center text-sm font-medium text-gold transition-colors hover:text-gold/80"
                >
                  View all listings by {property.agent.name}
                </Link>
              )}
            </div>

            {/* Schedule form */}
            <div id="schedule" className="rounded-xl border border-border bg-card p-6">
              {submitSuccess ? (
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/20">
                    <Check className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="font-heading text-lg font-bold">Request Submitted</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you! We will be in touch shortly to schedule your showing.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 text-sm font-medium text-gold hover:text-gold-light"
                  >
                    Schedule Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-lg font-bold">Schedule a Showing</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Interested in this property? Fill out the form and we will be in touch.
                  </p>
                  <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      disabled={submitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      disabled={submitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      disabled={submitting}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                    />
                    <textarea
                      placeholder="Message (optional)"
                      rows={3}
                      disabled={submitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Request a Showing"}
                    </button>
                    {submitError && (
                      <p className="mt-2 text-center text-sm text-red-400">{submitError}</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile floating CTA - appears when sidebar scrolls out of view */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-md transition-transform duration-300 lg:hidden",
          showMobileCta ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Image
            src={property.agent.photo}
            alt={property.agent.name}
            width={40}
            height={40}
            className="shrink-0 rounded-full border-2 border-gold object-cover"
            sizes="40px"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">{property.agent.name}</p>
            <p className="text-xs text-muted-foreground">Listing Agent</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${property.agent.phone}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
              aria-label={`Call ${property.agent.name}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="#schedule"
              className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              Schedule
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Property Alert Signup
// ---------------------------------------------------------------------------

function PropertyAlertSignup({ neighborhoodName }: { neighborhoodName?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "property-alert" }),
      });
    } catch {
      // Show success regardless — newsletter API handles gracefully
    }
    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gold/30 bg-gold/5 p-6 text-center">
        <Check className="mx-auto h-8 w-8 text-gold" />
        <p className="mt-2 font-heading text-lg font-semibold">You&apos;re all set!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          We&apos;ll notify you when similar properties hit the market.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-card to-gold/[0.03] p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
          <Bell className="h-5 w-5 text-gold" />
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold">
            Get alerts for properties like this
          </h3>
          <p className="text-sm text-muted-foreground">
            Be the first to know when similar {neighborhoodName ? `${neighborhoodName} ` : ""}listings hit the market.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-gold px-5 py-2.5 font-label text-sm font-semibold uppercase tracking-wider text-near-black transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Notify Me"}
        </button>
      </form>
    </div>
  );
}

// Similar Listings Carousel
// ---------------------------------------------------------------------------

function SimilarListingsCarousel({
  similar,
  neighborhoodName,
}: {
  similar: Property[];
  neighborhoodName?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth || 320;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold">Similar Properties</h2>
          {neighborhoodName && (
            <p className="mt-1 text-sm text-muted-foreground">
              In {neighborhoodName} and nearby areas
            </p>
          )}
        </div>
        {similar.length > 3 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-border disabled:hover:text-muted-foreground"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="mt-4 flex gap-5 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {similar.map((p) => (
          <div
            key={p.id}
            className="w-[300px] shrink-0 sm:w-[320px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
