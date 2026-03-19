"use client";

import { MapPin, ExternalLink } from "lucide-react";

interface NeighborhoodMapProps {
  name: string;
  center: { lat: number; lng: number };
  zoom?: number;
}

const GOLD = "#C9A96E";

export default function NeighborhoodMap({
  name,
  center,
  zoom = 14,
}: NeighborhoodMapProps) {
  const { lat, lng } = center;
  const osmZoom = Math.min(Math.max(Math.round(zoom), 1), 19);

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015},${lat - 0.009},${lng + 0.015},${lat + 0.009}&layer=mapnik&marker=${lat},${lng}`;
  const osmLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${osmZoom}/${lat}/${lng}`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-card">
      <iframe
        title={`Map of ${name} neighborhood`}
        src={embedUrl}
        className="h-full w-full border-0"
        style={{
          minHeight: "300px",
          filter: "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3) sepia(0.15)",
        }}
        loading="lazy"
        allowFullScreen
      />
      <div
        className="absolute left-4 top-4 flex items-center gap-2.5 rounded-lg border px-4 py-2.5 shadow-xl backdrop-blur-sm"
        style={{
          backgroundColor: "rgba(17, 17, 17, 0.92)",
          borderColor: `${GOLD}33`,
        }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${GOLD}18`, border: `2px solid ${GOLD}` }}
        >
          <MapPin className="h-4 w-4" style={{ color: GOLD }} />
        </div>
        <div>
          <p className="font-heading text-sm font-bold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">Philadelphia, PA</p>
        </div>
      </div>
      <a
        href={osmLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium shadow-lg transition-colors hover:brightness-110"
        style={{
          backgroundColor: "rgba(17, 17, 17, 0.92)",
          color: GOLD,
          borderColor: `${GOLD}33`,
        }}
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Open in OpenStreetMap
      </a>
    </div>
  );
}
