"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import { MapPin, Bed, Bath, Maximize, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { MapPin, ExternalLink, ChevronDown } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import "mapbox-gl/dist/mapbox-gl.css";

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

/* ─── Mini property card shown on pin click ─── */
function PropertyPopup({
  property,
  onClose,
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";
function clampZoom(z: number) {
  return Math.min(Math.max(Math.round(z), 1), 19);
}
/* Group properties by neighborhood for side panel */
interface Cluster {
  neighborhood: string;
  properties: Property[];
  avgLat: number;
  avgLng: number;
function clusterByNeighborhood(properties: Property[]): Cluster[] {
  const map = new Map<string, Property[]>();
  for (const p of properties) {
    const existing = map.get(p.neighborhood) ?? [];
    existing.push(p);
    map.set(p.neighborhood, existing);
  return Array.from(map.entries()).map(([neighborhood, props]) => ({
    neighborhood,
    properties: props,
    avgLat: props.reduce((s, p) => s + p.lat, 0) / props.length,
    avgLng: props.reduce((s, p) => s + p.lng, 0) / props.length,
  }));
/* Side panel with expandable neighborhood groups */
function ClusterPanel({
  clusters,
  onPropertyClick,
}: {
  property: Property;
  onClose: () => void;
}) {
  return (
    <div className="w-64 overflow-hidden rounded-lg bg-[#111111] text-[#F5F0E8] shadow-2xl">
      {/* Image */}
      <div className="relative h-36 w-full">
        {property.images[0] ? (
          <Image
            src={property.images[0]}
            alt={property.address}
            fill
            className="object-cover"
            sizes="256px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a]">
            <MapPin className="h-8 w-8 text-[#C9A96E]/30" />
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full bg-black/60 p-1 backdrop-blur-sm transition-colors hover:bg-black/80"
        >
<X className="h-3 w-3 text-white" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111] to-transparent p-3 pt-8">
          <p className="text-lg font-bold" style={{ color: GOLD }}>
            {formatPrice(property.price)}
          </p>
{clusters.reduce((s, c) => s + c.properties.length, 0)} Properties in{" "}
          {clusters.length} Areas
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
                    {cluster.properties.length}
                  </span>
                  <span className="flex-1 truncate text-xs font-medium text-[#F5F0E8]">
                    {cluster.neighborhood}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 text-[#F5F0E8]/30 transition-transform",
                      isExpanded && "rotate-180"
                    )}
                  />
                {isExpanded && (
                  <div className="ml-8 space-y-0.5 pb-1">
                    {cluster.properties.map((property) => (
                        key={property.id}
                        onClick={() => onPropertyClick?.(property.slug)}
                        className="group flex w-full items-start gap-1.5 rounded-md p-1.5 text-left transition-colors hover:bg-[#C9A96E]/10"
                        <MapPin
                          className="mt-0.5 h-3 w-3 shrink-0"
                          style={{ color: GOLD }}
                        <div className="min-w-0">
                          <p className="truncate text-[11px] font-medium text-[#F5F0E8] group-hover:text-[#C9A96E]">
                            {property.address}
                          <p
                            className="text-[10px] font-semibold"
                        </div>
                    ))}
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="p-3 pt-1">
        <p className="text-sm font-semibold leading-tight">{property.address}</p>
        <p className="mb-2 text-xs text-[#F5F0E8]/60">
          {property.city}, {property.state} {property.zip}
        </p>
        <div className="mb-3 flex items-center gap-3 text-xs text-[#F5F0E8]/70">
          <span className="flex items-center gap-1">
            <Bed className="h-3.5 w-3.5" style={{ color: GOLD }} />
            {property.beds} bd
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-3.5 w-3.5" style={{ color: GOLD }} />
            {property.baths} ba
          </span>
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" style={{ color: GOLD }} />
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>
        <Link
          href={`/properties/${property.slug}`}
          className="block rounded-md py-2 text-center text-xs font-semibold transition-colors"
          style={{
            backgroundColor: `${GOLD}18`,
            color: GOLD,
            border: `1px solid ${GOLD}33`,
          }}
        >
          View Property
        </Link>
      </div>
    </div>
  );
}

/* ─── Custom pin marker ─── */
function PinMarker({
  property,
  isSelected,
  onClick,
}: {
  property: Property;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center transition-transform hover:z-10"
      style={{ transform: isSelected ? "scale(1.2)" : "scale(1)" }}
    >
      {/* Price tag */}
      <div
        className="whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold shadow-lg transition-all"
        style={{
          backgroundColor: isSelected ? GOLD : "#111111",
          color: isSelected ? "#111111" : GOLD,
          border: `1.5px solid ${GOLD}`,
        }}
        {formatPrice(property.price)}
      </div>
      {/* Pin stem */}
        className="h-2 w-0.5"
        style={{ backgroundColor: GOLD }}
      />
      {/* Pin dot */}
        className="h-2 w-2 rounded-full shadow"
          border: `2px solid ${GOLD}`,
    </button>
/* ── Mapbox GL interactive map with clustering ─────────────────────── */
function MapboxClusterMap({
  properties,
  onPropertyClick,
  center,
  zoom,
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center: [number, number];
  zoom: number;
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [popupData, setPopupData] = useState<Property | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

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
    })),
  }), [properties]);
  const initMap = useCallback(async () => {
    if (!containerRef.current || mapRef.current) return;
    const mapboxgl = (await import("mapbox-gl")).default;
    // Inject Mapbox GL CSS if not already present
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
      attributionControl: false,
    });
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    map.on("load", () => {
      /* ── Source with clustering ─────────────────────────── */
      map.addSource("properties", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      /* ── Cluster circles ────────────────────────────────── */
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
            18,  // radius for count < 10
            10, 24, // radius for count < 30
            30, 32, // radius for count >= 30
          ],
          "circle-stroke-width": 2,
          "circle-stroke-color": "#111111",
      /* ── Cluster count labels ───────────────────────────── */
        id: "cluster-count",
        type: "symbol",
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 13,
          "text-color": "#111111",
      /* ── Individual property pins ──────────────────────── */
        id: "unclustered-point",
        filter: ["!", ["has", "point_count"]],
          "circle-radius": 7,
      /* ── Click cluster → zoom in ───────────────────────── */
      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ["clusters"] });
        if (!features.length) return;
        const clusterId = features[0].properties!.cluster_id;
        (map.getSource("properties") as mapboxgl.GeoJSONSource).getClusterExpansionZoom(
          clusterId,
          (err, expansionZoom) => {
            if (err || expansionZoom == null) return;
            const geometry = features[0].geometry;
            if (geometry.type !== "Point") return;
            map.easeTo({
              center: geometry.coordinates as [number, number],
              zoom: expansionZoom,
        );
      /* ── Click individual pin → show popup ─────────────── */
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
      /* ── Cursor changes ─────────────────────────────────── */
      map.on("mouseenter", "clusters", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "clusters", () => { map.getCanvas().style.cursor = ""; });
      map.on("mouseenter", "unclustered-point", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "unclustered-point", () => { map.getCanvas().style.cursor = ""; });
      /* ── Close popup on map click ──────────────────────── */
      map.on("click", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters", "unclustered-point"],
        if (!features.length) {
          setPopupData(null);
          setPopupPos(null);
    mapRef.current = map;
  }, [center, zoom, geojson]);
  useEffect(() => {
    if (!MAPBOX_TOKEN) return;
    initMap();
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initMap]);
  // Update source data when properties change
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    const source = map.getSource("properties") as mapboxgl.GeoJSONSource | undefined;
    if (source) {
      source.setData(geojson);
  }, [geojson]);
    <>
      <div ref={containerRef} className="h-full w-full" style={{ minHeight: "300px" }} />
      {popupData && popupPos && (
          className="absolute z-10 w-56 rounded-lg border border-[#C9A96E]/30 bg-[#111111]/95 p-3 shadow-xl backdrop-blur-sm"
            left: Math.min(popupPos.x, (containerRef.current?.offsetWidth ?? 300) - 240),
            top: popupPos.y + 10,
          <p className="truncate text-xs font-semibold text-[#F5F0E8]">{popupData.address}</p>
          <p className="mt-0.5 text-[10px] text-[#F5F0E8]/60">{popupData.neighborhood}</p>
          <p className="mt-1 text-sm font-bold" style={{ color: GOLD }}>
            {formatPrice(popupData.price)}
          </p>
          <div className="mt-1 flex gap-2 text-[10px] text-[#F5F0E8]/50">
            <span>{popupData.beds} bd</span>
            <span>{popupData.baths} ba</span>
            <span>{popupData.sqft?.toLocaleString()} sqft</span>
          {onPropertyClick && (
              onClick={() => onPropertyClick(popupData.slug)}
              className="mt-2 w-full rounded-md px-2 py-1.5 text-[11px] font-semibold transition-colors"
              style={{ backgroundColor: `${GOLD}20`, color: GOLD }}
              View Property
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapRef = useRef<any>(null);

  const [cLng, cLat] = center ?? PHILLY_CENTER;

const selectedProperty = useMemo(
    () => properties.find((p) => p.id === selectedId) ?? null,
    [properties, selectedId]
  );

  const handlePinClick = useCallback(
    (property: Property) => {
      setSelectedId(property.id);
      // Smoothly fly to the pin
      mapRef.current?.flyTo({
        center: [property.lng, property.lat],
        zoom: Math.max(zoom, 14),
        duration: 600,
      });
    },
    [zoom]
/* Cluster properties by neighborhood for side panel */
  const clusters = useMemo(
    () => clusterByNeighborhood(properties),
    [properties]
  /* ── Single marker view (property detail page) ──────────────────── */
  if (singleMarker && properties.length === 1) {
    const property = properties[0];
    const lat = property.lat;
    const lng = property.lng;
    const singleUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008},${lat - 0.005},${lng + 0.008},${lat + 0.005}&layer=mapnik&marker=${lat},${lng}`;
    const osmLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${osmZoom}/${lat}/${lng}`;

  const handlePopupClose = useCallback(() => {
    setSelectedId(null);
  }, []);

  // Compute bounds to fit all properties
  const bounds = useMemo(() => {
    if (properties.length === 0) return null;
    let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const p of properties) {
      if (p.lng < minLng) minLng = p.lng;
      if (p.lng > maxLng) maxLng = p.lng;
      if (p.lat < minLat) minLat = p.lat;
      if (p.lat > maxLat) maxLat = p.lat;
    }
    // Add padding
    const lngPad = Math.max((maxLng - minLng) * 0.1, 0.005);
    const latPad = Math.max((maxLat - minLat) * 0.1, 0.005);
    return [
      [minLng - lngPad, minLat - latPad],
      [maxLng + lngPad, maxLat + latPad],
    ] as [[number, number], [number, number]];
  }, [properties]);

  // Fit bounds on mount when showing multiple properties
  useEffect(() => {
    if (bounds && !singleMarker && properties.length > 1) {
      setTimeout(() => {
        mapRef.current?.fitBounds(bounds, { padding: 50, duration: 0 });
      }, 100);
    }
  }, [bounds, singleMarker, properties.length]);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-[#C9A96E]/20 bg-[#111111] text-sm text-[#F5F0E8]/40">
        Map unavailable — Mapbox token not configured
      </div>
    );
  }


/* ── Multi-property view with Mapbox clustering ─────────────────── */
  if (MAPBOX_TOKEN && properties.length > 0) {
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
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${cLng - 0.02},${cLat - 0.012},${cLng + 0.02},${cLat + 0.012}&layer=mapnik&marker=${cLat},${cLng}`;
  const osmLink = `https://www.openstreetmap.org/#map=${osmZoom}/${cLat}/${cLng}`;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-[#C9A96E]/20">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: cLng,
          latitude: cLat,
          zoom: singleMarker ? 15 : zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        attributionControl={false}
      >
        <NavigationControl position="top-right" />

        {properties.map((property) => (
          <Marker
            key={property.id}
            longitude={property.lng}
            latitude={property.lat}
            anchor="bottom"
          >
            <PinMarker
              property={property}
              isSelected={selectedId === property.id}
              onClick={() => handlePinClick(property)}
            />
          </Marker>
        ))}

        {selectedProperty && (
          <Popup
            longitude={selectedProperty.lng}
            latitude={selectedProperty.lat}
            anchor="bottom"
            offset={40}
            onClose={handlePopupClose}
            closeButton={false}
            className="property-map-popup"
            maxWidth="none"
          >
            <PropertyPopup
              property={selectedProperty}
              onClose={handlePopupClose}
            />
          </Popup>
        )}
      </Map>
    </div>
  );
}
