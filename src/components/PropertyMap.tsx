"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  singleMarker?: boolean;
}

const GOLD = "#C9A96E";
const PHILLY_CENTER: [number, number] = [-75.1652, 39.9526];

function clampZoom(z: number) {
  return Math.min(Math.max(Math.round(z), 1), 19);
}

export default function PropertyMap({
  properties,
  onPropertyClick,
  center,
  zoom = 12,
  singleMarker = false,
}: PropertyMapProps) {
  const [cLng, cLat] = center ?? PHILLY_CENTER;
  const osmZoom = clampZoom(zoom);

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${cLng - 0.02},${cLat - 0.012},${cLng + 0.02},${cLat + 0.012}&layer=mapnik&marker=${cLat},${cLng}`;

  if (singleMarker && properties.length === 1) {
    const property = properties[0];
    const lat = property.lat;
    const lng = property.lng;
    const singleUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008},${lat - 0.005},${lng + 0.008},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;
    const osmLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${osmZoom}/${lat}/${lng}`;

    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20 bg-[#111111]">
        <iframe
          title={`Map of ${property.address}`}
          src={singleUrl}
          className="h-full w-full border-0"
          style={{
            minHeight: "300px",
            filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3) sepia(0.15)",
          }}
          loading="lazy"
          allowFullScreen
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent px-4 pb-4 pt-10">
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${GOLD}22`, border: `2px solid ${GOLD}` }}
              >
                <MapPin className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F5F0E8]">{property.address}</p>
                <p className="text-xs text-[#F5F0E8]/60">
                  {property.city}, {property.state} {property.zip}
                </p>
              </div>
            </div>
            <a
              href={osmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors"
              style={{ backgroundColor: `${GOLD}18`, color: GOLD }}
            >
              <ExternalLink className="h-3 w-3" />
              Open Map
            </a>
          </div>
        </div>
      </div>
    );
  }

  const osmLink = `https://www.openstreetmap.org/#map=${osmZoom}/${cLat}/${cLng}`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20 bg-[#111111]">
      <iframe
        title="Property map"
        src={embedUrl}
        className="h-full w-full border-0"
        style={{
          minHeight: "300px",
          filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3) sepia(0.15)",
        }}
        loading="lazy"
        allowFullScreen
      />
      {properties.length > 0 && (
        <div className="absolute left-3 top-3 max-h-[60%] w-56 overflow-y-auto rounded-lg border border-[#C9A96E]/20 bg-[#111111]/95 shadow-xl backdrop-blur-sm">
          <div className="p-2.5">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
              {properties.length} {properties.length === 1 ? "Property" : "Properties"}
            </p>
            <div className="space-y-1.5">
              {properties.slice(0, 8).map((property) => (
                <button
                  key={property.id}
                  onClick={() => onPropertyClick?.(property.slug)}
                  className="group flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-[#C9A96E]/10"
                >
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: GOLD }} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-[#F5F0E8] group-hover:text-[#C9A96E]">
                      {property.address}
                    </p>
                    <p className="text-[11px] font-semibold" style={{ color: GOLD }}>
                      {formatPrice(property.price)}
                    </p>
                  </div>
                </button>
              ))}
              {properties.length > 8 && (
                <p className="px-2 text-[10px] text-[#F5F0E8]/40">
                  +{properties.length - 8} more
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <a
        href={osmLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium shadow-lg transition-colors"
        style={{ backgroundColor: "#111111", color: GOLD, border: `1px solid ${GOLD}33` }}
      >
        <ExternalLink className="h-3 w-3" />
        View Larger Map
      </a>
    </div>
  );
}
