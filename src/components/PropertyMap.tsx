"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  singleMarker?: boolean; // For detail page (single property, no popup)
}

function googleMapsUrl(property: Property): string {
  const query = encodeURIComponent(
    `${property.address}, ${property.city}, ${property.state} ${property.zip}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export default function PropertyMap({
  properties,
  onPropertyClick,
  singleMarker = false,
}: PropertyMapProps) {
  // Single property view (detail page)
  if (singleMarker && properties.length === 1) {
    const property = properties[0];
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-[#C9A84C]/20 bg-[#111111] p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10">
          <MapPin className="h-7 w-7 text-[#C9A84C]" />
        </div>
        <div className="text-center">
          <p className="font-heading text-lg font-semibold text-[#F5F0E8]">
            {property.address}
          </p>
          <p className="mt-1 text-sm text-[#F5F0E8]/60">
            {property.city}, {property.state} {property.zip}
          </p>
        </div>
        <a
          href={googleMapsUrl(property)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-5 py-2.5 text-sm font-semibold text-[#C9A84C] transition-colors hover:bg-[#C9A84C]/20"
        >
          View on Google Maps
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    );
  }

  // Multi-property list view (listings page)
  return (
    <div className="flex h-full w-full flex-col rounded-xl border border-[#C9A84C]/20 bg-[#111111]">
      <div className="flex items-center gap-2 border-b border-[#C9A84C]/10 px-5 py-4">
        <MapPin className="h-5 w-5 text-[#C9A84C]" />
        <span className="text-sm font-semibold text-[#F5F0E8]">
          {properties.length} {properties.length === 1 ? "Property" : "Properties"}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-2">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group flex items-center justify-between rounded-lg border border-[#C9A84C]/10 bg-[#111111] p-3 transition-colors hover:border-[#C9A84C]/30 hover:bg-[#C9A84C]/5"
            >
              <button
                type="button"
                onClick={() => onPropertyClick?.(property.slug)}
                className="flex-1 text-left"
              >
                <p className="text-sm font-semibold text-[#F5F0E8]">
                  {property.address}
                </p>
                <p className="mt-0.5 text-xs text-[#F5F0E8]/50">
                  {property.city}, {property.state} &middot;{" "}
                  {property.beds} BD | {property.baths} BA |{" "}
                  {property.sqft.toLocaleString()} SF
                </p>
                <p className="mt-1 text-sm font-bold text-[#C9A84C]">
                  {formatPrice(property.price)}
                </p>
              </button>
              <a
                href={googleMapsUrl(property)}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-[#C9A84C]/20 text-[#C9A84C]/60 transition-colors hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
                title="View on Google Maps"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
