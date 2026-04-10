"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { MapPin, ExternalLink, ChevronDown, Layers } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";
// mapbox-gl CSS is loaded dynamically in initMap() to avoid bundling ~50KB of unused CSS

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  singleMarker?: boolean;
}

const GOLD = "#C9A96E";
const PHILLY_CENTER: [number, number] = [-75.1652, 39.9526];
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";
const SATELLITE_STYLE = "mapbox://styles/mapbox/satellite-streets-v12";

type MapStyleMode = "street" | "satellite";

function clampZoom(z: number) {
  return Math.min(Math.max(Math.round(z), 1), 19);
}

/* Group properties by neighborhood for side panel */
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

/* Side panel with expandable neighborhood groups */
function ClusterPanel({
  clusters,
  onPropertyClick,
}: {
  clusters: Cluster[];
  onPropertyClick?: (slug: string) => void;
}) {
  const [expandedCluster, setExpandedCluster] = useState<string | null>(null);

  return (
    <div className="absolute left-3 top-3 z-10 max-h-[calc(100%-24px)] w-52 overflow-y-auto rounded-lg border border-[#C9A96E]/20 bg-[#111111]/95 p-2 shadow-xl backdrop-blur-sm">
      <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-[#F5F0E8]/40">
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
  );
}

/* ── Mapbox GL interactive map with clustering ─────────────────────── */
function MapboxClusterMap({
  properties,
  onPropertyClick,
  center,
  zoom,
}: {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center: [number, number];
  zoom: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [popupData, setPopupData] = useState<Property | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [mapStyle, setMapStyle] = useState<MapStyleMode>("street");

  const geojson = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: properties.map((p) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [p.lng, p.lat],
      },
      properties: {
        slug: p.slug,
        address: p.address,
        price: p.price,
        neighborhood: p.neighborhood,
        beds: p.beds,
        baths: p.baths,
        sqft: p.sqft,
        status: p.status,
      },
    })),
  }), [properties]);

  /* Helper: add property source + layers to the map */
  const addPropertyLayers = useCallback((map: mapboxgl.Map, data: typeof geojson) => {
    map.addSource("properties", {
      type: "geojson",
      data,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    });
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "properties",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": GOLD,
        "circle-opacity": 0.85,
        "circle-radius": [
          "step",
          ["get", "point_count"],
          18,
          10, 24,
          30, 32,
        ],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#111111",
      },
    });
    map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "properties",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 13,
      },
      paint: {
        "text-color": "#111111",
      },
    });
    map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "properties",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": GOLD,
        "circle-radius": 7,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#111111",
      },
    });
  }, []);

  /* Helper: bind click/hover handlers for property layers */
  const bindLayerEvents = useCallback((map: mapboxgl.Map) => {
    map.on("click", "clusters", (e) => {
      const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
      if (!features.length) return;
      const clusterId = features[0].properties!.cluster_id;
      (map.getSource("properties") as mapboxgl.GeoJSONSource).getClusterExpansionZoom(
        clusterId,
        (err: Error | null | undefined, expansionZoom: number | null | undefined) => {
          if (err || expansionZoom == null) return;
          const geometry = features[0].geometry;
          if (geometry.type !== "Point") return;
          map.easeTo({
            center: geometry.coordinates as [number, number],
            zoom: expansionZoom,
          });
        },
      );
    });
    map.on("click", "unclustered-point", (e) => {
      if (!e.features?.length) return;
      const props = e.features[0].properties!;
      setPopupData({
        slug: props.slug,
        address: props.address,
        price: props.price,
        neighborhood: props.neighborhood,
        beds: props.beds,
        baths: props.baths,
        sqft: props.sqft,
        status: props.status,
      } as unknown as Property);
      setPopupPos({ x: e.point.x, y: e.point.y });
    });
    map.on("mouseenter", "clusters", () => { map.getCanvas().style.cursor = "pointer"; });
    map.on("mouseleave", "clusters", () => { map.getCanvas().style.cursor = ""; });
    map.on("mouseenter", "unclustered-point", () => { map.getCanvas().style.cursor = "pointer"; });
    map.on("mouseleave", "unclustered-point", () => { map.getCanvas().style.cursor = ""; });
    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters", "unclustered-point"],
      });
      if (!features.length) {
        setPopupData(null);
        setPopupPos(null);
      }
    });
  }, []);

  const initMap = useCallback(async () => {
    if (!containerRef.current || mapRef.current) return;
    const mapboxgl = (await import("mapbox-gl")).default;
    if (!document.getElementById("mapbox-gl-css")) {
      const link = document.createElement("link");
      link.id = "mapbox-gl-css";
      link.rel = "stylesheet";
      link.href = "https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css";
      document.head.appendChild(link);
    }
    mapboxgl.accessToken = MAPBOX_TOKEN!;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: DARK_STYLE,
      center,
      zoom,
      attributionControl: false,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    map.on("load", () => {
      addPropertyLayers(map, geojson);
      bindLayerEvents(map);
    });
    mapRef.current = map;
  }, [center, zoom, geojson, addPropertyLayers, bindLayerEvents]);

  /* Toggle map style between street and satellite */
  const toggleMapStyle = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const nextMode: MapStyleMode = mapStyle === "street" ? "satellite" : "street";
    const nextStyle = nextMode === "satellite" ? SATELLITE_STYLE : DARK_STYLE;
    setMapStyle(nextMode);
    setPopupData(null);
    setPopupPos(null);
    map.once("style.load", () => {
      addPropertyLayers(map, geojson);
      bindLayerEvents(map);
    });
    map.setStyle(nextStyle);
  }, [mapStyle, geojson, addPropertyLayers, bindLayerEvents]);

  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    initMap();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initMap]);

  // Update source data when properties change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const source = map.getSource("properties") as mapboxgl.GeoJSONSource | undefined;
    if (source) {
      source.setData(geojson);
    }
  }, [geojson]);

  return (
    <>
      <div ref={containerRef} className="h-full w-full" style={{ minHeight: "300px" }} />
      {/* Map style toggle button */}
      <button
        onClick={toggleMapStyle}
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-lg border border-[#C9A96E]/20 bg-[#111111]/90 px-2.5 py-2 text-[11px] font-medium text-[#F5F0E8] shadow-lg backdrop-blur-sm transition-colors hover:border-[#C9A96E]/40 hover:bg-[#111111]"
        title={mapStyle === "street" ? "Switch to satellite view" : "Switch to street view"}
      >
        <Layers className="h-3.5 w-3.5" style={{ color: GOLD }} />
        {mapStyle === "street" ? "Satellite" : "Street"}
      </button>
      {popupData && popupPos && (
        <div
          className="absolute z-10 w-56 rounded-lg border border-[#C9A96E]/30 bg-[#111111]/95 p-3 shadow-xl backdrop-blur-sm"
          style={{
            left: Math.min(popupPos.x, (containerRef.current?.offsetWidth ?? 300) - 240),
            top: popupPos.y + 10,
          }}
        >
          <p className="truncate text-xs font-semibold text-[#F5F0E8]">{popupData.address}</p>
          <p className="mt-0.5 text-[10px] text-[#F5F0E8]/60">{popupData.neighborhood}</p>
          <p className="mt-1 text-sm font-bold" style={{ color: GOLD }}>
            {formatPrice(popupData.price)}
          </p>
          <div className="mt-1 flex gap-2 text-[10px] text-[#F5F0E8]/50">
            <span>{popupData.beds} bd</span>
            <span>{popupData.baths} ba</span>
            <span>{popupData.sqft?.toLocaleString()} sqft</span>
          </div>
          {onPropertyClick && (
            <button
              onClick={() => onPropertyClick(popupData.slug)}
              className="mt-2 w-full rounded-md px-2 py-1.5 text-[11px] font-semibold transition-colors"
              style={{ backgroundColor: `${GOLD}20`, color: GOLD }}
            >
              View Property
            </button>
          )}
        </div>
      )}
    </>
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

  /* Cluster properties by neighborhood for side panel */
  const clusters = useMemo(
    () => clusterByNeighborhood(properties),
    [properties],
  );

  /* ── Single marker view (property detail page) ──────────────────── */
  if (singleMarker && properties.length === 1) {
    const property = properties[0];
    const lat = property.lat;
    const lng = property.lng;
    const osmZoom = clampZoom(zoom + 3);
    const singleUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008},${lat - 0.005},${lng + 0.008},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;
    const osmLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${osmZoom}/${lat}/${lng}`;

    if (MAPBOX_TOKEN) {
      return (
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20 bg-[#111111]">
          <MapboxClusterMap
            properties={properties}
            onPropertyClick={onPropertyClick}
            center={[lng, lat]}
            zoom={15}
          />
        </div>
      );
    }

    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20">
        <iframe
          title="Property location map"
          src={singleUrl}
          className="h-full w-full border-0"
          style={{ minHeight: 300 }}
          loading="lazy"
        />
        <a
          href={osmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white/90 backdrop-blur-sm hover:text-white"
        >
          <ExternalLink className="h-3 w-3" />
          Open in Maps
        </a>
      </div>
    );
  }

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-[#C9A96E]/20 bg-[#111111] text-sm text-[#F5F0E8]/40">
        Map unavailable — Mapbox token not configured
      </div>
    );
  }

  /* ── Multi-property view with Mapbox clustering ─────────────────── */
  if (properties.length > 0) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20 bg-[#111111]">
        <MapboxClusterMap
          properties={properties}
          onPropertyClick={onPropertyClick}
          center={[cLng, cLat]}
          zoom={zoom}
        />
        {properties.length > 0 && (
          <ClusterPanel clusters={clusters} onPropertyClick={onPropertyClick} />
        )}
      </div>
    );
  }

  /* ── Fallback: OSM iframe (no Mapbox token) ─────────────────────── */
  const osmZoom = clampZoom(zoom);
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${cLng - 0.02},${cLat - 0.012},${cLng + 0.02},${cLat + 0.012}&layer=mapnik&marker=${cLat},${cLng}`;
  const osmLink = `https://www.openstreetmap.org/#map=${osmZoom}/${cLat}/${cLng}`;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20">
      <iframe
        title="Properties map"
        src={embedUrl}
        className="h-full w-full border-0"
        style={{ minHeight: 300 }}
        loading="lazy"
      />
      <a
        href={osmLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-xs text-white/90 backdrop-blur-sm hover:text-white"
      >
        <ExternalLink className="h-3 w-3" />
        Open in Maps
      </a>
    </div>
  );
}
