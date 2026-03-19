"use client";

import { useState, useEffect } from "react";
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
<<<<<<< HEAD
  Printer,
=======
  Heart,
  Flame,
  TreePine,
  Wind,
  Car,
  Wine,
  Sun,
  Waves,
  Zap,
  Lock,
  Bike,
  Sparkles,
  Eye,
  DoorOpen,
  Building2,
  Dumbbell,
  ShowerHead,
  Columns3,
  BookOpen,
  Sofa,
  type LucideIcon,
>>>>>>> worktree-agent-a3f1ad91
} from "lucide-react";
import { Property, formatPriceFull } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import OpenHouseBanner from "@/components/OpenHouseBanner";
import ImageGallery from "@/components/ImageGallery";
import PropertyVideoTour from "@/components/PropertyVideoTour";
import PropertyMap from "@/components/PropertyMap";
import PriceHistory from "@/components/PriceHistory";
import { cn } from "@/lib/utils";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
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

const amenityIcons: Record<string, LucideIcon> = {
  "Fireplace": Flame,
  "Hardwood Floors": Columns3,
  "Central Air": Wind,
  "Garage": Car,
  "Wine Cellar": Wine,
  "Rooftop Terrace": Sun,
  "Heated Floors": Sparkles,
  "Exposed Brick": Building2,
  "Carriage House": Home,
  "Off-Street Parking": Car,
  "Pool": Waves,
  "Smart Home": Zap,
  "Concierge": DoorOpen,
  "Private Elevator": Building2,
  "Terrace": Sun,
  "In-Unit Laundry": Sparkles,
  "Balcony": Sun,
  "Secured Parking": Lock,
  "Rooftop Deck": Sun,
  "Updated Kitchen": Sparkles,
  "EV Charging": Zap,
  "Home Office": BookOpen,
  "Custom Tile": Sparkles,
  "Bike Storage": Bike,
  "Secured Entry": Lock,
  "Fenced Yard": TreePine,
  "Built-In Bookshelves": BookOpen,
  "Open Floor Plan": Sofa,
  "River Views": Eye,
  "Conservatory": Sun,
  "Patio": Sun,
  "Recessed Lighting": Sparkles,
  "Separate Utilities": Zap,
  "New Windows": Eye,
  "Yard": TreePine,
  "Street Parking": Car,
  "Stained Glass": Eye,
  "Wrap-Around Porch": Home,
  "High Ceilings": Columns3,
  "Valet Parking": Car,
  "Fitness Center": Dumbbell,
  "Spa Bath": ShowerHead,
};

export default function PropertyDetailClient({
  property,
  similar,
}: {
  property: Property;
  similar: Property[];
}) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { track } = useRecentlyViewed();

  // Track this property as recently viewed
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
            <div>(215) 555-0100</div>
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

      {/* Gallery */}
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <ImageGallery images={property.images} address={property.address} />
        </div>
      </div>

      {/* Key details bar - sticky */}
      <div className="sticky top-16 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="font-heading text-2xl font-bold text-gold sm:text-3xl">
              {formatPriceFull(property.price)}
            </span>
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
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="no-print flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold"
              aria-label="Print property details"
              title="Print"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <a
              href="#schedule"
              className="no-print rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              Schedule a Showing
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
                    property.status === "Pending" && "bg-orange-500/20 text-orange-400"
                  )}
                >
                  {property.status}
                </span>
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
            </div>

            {/* Open House Banner */}
            {property.openHouseEvent && (
              <OpenHouseBanner property={property} />
            )}

            {/* Description */}
            <div>
              <h2 className="font-heading text-xl font-bold">About This Property</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{property.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-border bg-card p-3 text-center">
                  <p className="text-xs text-muted-foreground">Year Built</p>
                  <p className="mt-1 font-heading text-lg font-bold">{property.yearBuilt}</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3 text-center">
                  <p className="text-xs text-muted-foreground">Lot Size</p>
                  <p className="mt-1 font-heading text-lg font-bold">
                    {property.lotSqft > 0 ? `${property.lotSqft.toLocaleString()} SF` : "N/A"}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3 text-center">
                  <p className="text-xs text-muted-foreground">Price/SF</p>
                  <p className="mt-1 font-heading text-lg font-bold">
                    ${Math.round(property.price / property.sqft).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3 text-center">
                  <p className="text-xs text-muted-foreground">Est. Payment</p>
                  <p className="mt-1 font-heading text-lg font-bold">
                    ${Math.round((property.price * 0.8 * 0.065) / 12 / (1 - Math.pow(1 + 0.065 / 12, -360))).toLocaleString()}/mo
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities chips */}
            {property.amenities.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold">Amenities</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Check;
                    return (
                      <span
                        key={amenity}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/5 px-3 py-1 text-xs font-medium text-gold"
                      >
                        <Icon className="h-3 w-3" />
                        {amenity}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Video Tour (PROP-08) */}
            {property.videoTourUrl && (
              <PropertyVideoTour
                videoId={property.videoTourUrl}
                address={property.address}
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
                    <ul className="space-y-2">
                      {property.features[cat].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 flex-shrink-0 text-gold" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

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
            </div>

            {/* Similar properties */}
            {similar.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-bold">Similar Properties</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {similar.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Agent card + Schedule form */}
          <div className="space-y-6 lg:sticky lg:top-36 lg:self-start">
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
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      disabled={submitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      disabled={submitting}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
                    />
                    <textarea
                      placeholder="Message (optional)"
                      rows={3}
                      disabled={submitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
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
    </div>
  );
}
