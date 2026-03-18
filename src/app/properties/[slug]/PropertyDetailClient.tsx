"use client";

import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Check,
} from "lucide-react";
import { Property, formatPriceFull } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import { cn } from "@/lib/utils";

export default function PropertyDetailClient({
  property,
  similar,
}: {
  property: Property;
  similar: Property[];
}) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const prev = () =>
    setGalleryIndex((i) => (i === 0 ? property.images.length - 1 : i - 1));
  const next = () =>
    setGalleryIndex((i) => (i === property.images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen pt-16">
      {/* Back link */}
      <div className="border-b border-border bg-near-black">
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
      <div className="relative bg-near-black">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          {/* Main image */}
          <div
            className="relative aspect-[16/9] max-h-[500px] cursor-pointer overflow-hidden rounded-xl lg:aspect-[21/9]"
            onClick={() => setLightboxOpen(true)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.images[galleryIndex]}
              alt={`${property.address} - Photo ${galleryIndex + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Counter */}
            <span className="absolute right-3 bottom-3 rounded-md bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
              {galleryIndex + 1} / {property.images.length}
            </span>
          </div>

          {/* Thumbnails */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setGalleryIndex(i)}
                className={cn(
                  "h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                  i === galleryIndex ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            onClick={prev}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.images[galleryIndex]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />
          <button
            onClick={next}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md bg-white/10 px-4 py-2 text-sm text-white">
            {galleryIndex + 1} / {property.images.length}
          </span>
        </div>
      )}

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
          <a
            href="#schedule"
            className="rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
          >
            Schedule a Showing
          </a>
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

            {/* Map placeholder */}
            <div>
              <h2 className="font-heading text-xl font-bold">Location</h2>
              <div className="mt-4 h-64 overflow-hidden rounded-xl border border-border bg-midnight/30">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="mx-auto h-8 w-8 text-gold" />
                    <p className="mt-2 text-sm">
                      {property.address}, {property.city}, {property.state} {property.zip}
                    </p>
                    <p className="mt-1 text-xs">Interactive map coming soon</p>
                  </div>
                </div>
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.agent.photo}
                  alt={property.agent.name}
                  className="h-16 w-16 rounded-full border-2 border-gold object-cover"
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
              <h3 className="font-heading text-lg font-bold">Schedule a Showing</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Interested in this property? Fill out the form and we will be in touch.
              </p>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Showing request submitted! We will contact you shortly.");
                  setFormData({ name: "", email: "", phone: "", message: "" });
                }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <textarea
                  placeholder="Message (optional)"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gold py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
                >
                  Request a Showing
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
