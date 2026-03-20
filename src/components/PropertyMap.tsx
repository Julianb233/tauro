"use client";

import { useState, useMemo } from "react";
import { MapPin, ExternalLink, ChevronDown } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";

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

/* AI-3877: Group properties by neighborhood for cluster-style display */
interface Cluster {
  neighborhood: string;
  properties: Property[];
  avgLat: number;
  avgLng: number;
}

function clusterByNeighborhood(properties: Property[]): Cluster[] {
  const map = new Map<string, Property[]>();
  for (const p of properties) {
    const existing = map.get(p.neighborhood) ?? [];
    existing.push(p);
    map.set(p.neighborhood, existing);
  }
  return Array.from(map.entries()).map(([neighborhood, props]) => ({
    neighborhood,
    properties: props,
    avgLat: props.reduce((s, p) => s + p.lat, 0) / props.length,
    avgLng: props.reduce((s, p) => s + p.lng, 0) / props.length,
  }));
}

/* AI-3877: Cluster panel with expandable neighborhood groups */
function ClusterPanel({
  clusters,
  onPropertyClick,
}: {
  clusters: Cluster[];
  onPropertyClick?: (slug: string) => void;
}) {
  const [expandedCluster, setExpandedCluster] = useState<string | null>(
    clusters.length === 1 ? clusters[0].neighborhood : null
  );

  return (
    <div className="absolute left-3 top-3 max-h-[60%] w-60 overflow-y-auto rounded-lg border border-[#C9A96E]/20 bg-[#111111]/95 shadow-xl backdrop-blur-sm">
      <div className="p-2.5">
        <p
          className="mb-2 text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: GOLD }}
        >
          {clusters.reduce((s, c) => s + c.properties.length, 0)} Properties in{" "}
          {clusters.length} Areas
        </p>
        <div className="space-y-1">
          {clusters.map((cluster) => {
            const isExpanded = expandedCluster === cluster.neighborhood;
            return (
              <div key={cluster.neighborhood}>
                <button
                  onClick={() =>
                    setExpandedCluster(isExpanded ? null : cluster.neighborhood)
                  }
                  className="flex w-full items-center gap-2 rounded-md p-2 text-left transition-colors hover:bg-[#C9A96E]/10"
                >
                  {/* Cluster count badge */}
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: `${GOLD}30`,
                      color: GOLD,
                      border: `1.5px solid ${GOLD}`,
                    }}
                  >
                    {cluster.properties.length}
                  </span>
                  <span className="flex-1 truncate text-xs font-medium text-[#F5F0E8]">
                    {cluster.neighborhood}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 text-[#F5F0E8]/30 transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-8 space-y-0.5 pb-1">
                    {cluster.properties.map((property) => (
                      <button
                        key={property.id}
                        onClick={() => onPropertyClick?.(property.slug)}
                        className="group flex w-full items-start gap-1.5 rounded-md p-1.5 text-left transition-colors hover:bg-[#C9A96E]/10"
                      >
                        <MapPin
                          className="mt-0.5 h-3 w-3 shrink-0"
                          style={{ color: GOLD }}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium text-[#F5F0E8] group-hover:text-[#C9A96E]">
                            {property.address}
                          </p>
                          <p
                            className="text-[10px] font-semibold"
                            style={{ color: GOLD }}
                          >
                            {formatPrice(property.price)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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

  /* AI-3877: Cluster properties by neighborhood */
  const clusters = useMemo(
    () => clusterByNeighborhood(properties),
    [properties]
  );

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
            filter:
              "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3) sepia(0.15)",
          }}
          loading="lazy"
          allowFullScreen
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] via-[#111111]/90 to-transparent px-4 pb-4 pt-10">
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${GOLD}22`,
                  border: `2px solid ${GOLD}`,
                }}
              >
                <MapPin className="h-4 w-4" style={{ color: GOLD }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F5F0E8]">
                  {property.address}
                </p>
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
          filter:
            "invert(1) hue-rotate(180deg) brightness(0.95) contrast(1.1) saturate(0.3) sepia(0.15)",
        }}
        loading="lazy"
        allowFullScreen
      />
      {properties.length > 0 && (
        <ClusterPanel clusters={clusters} onPropertyClick={onPropertyClick} />
      )}
      <a
        href={osmLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium shadow-lg transition-colors"
        style={{
          backgroundColor: "#111111",
          color: GOLD,
          border: `1px solid ${GOLD}33`,
        }}
      >
        <ExternalLink className="h-3 w-3" />
        View Larger Map
      </a>
    </div>
  );
}
