"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import { MapPin, Bed, Bath, Maximize, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
      >
        {formatPrice(property.price)}
      </div>
      {/* Pin stem */}
      <div
        className="h-2 w-0.5"
        style={{ backgroundColor: GOLD }}
      />
      {/* Pin dot */}
      <div
        className="h-2 w-2 rounded-full shadow"
        style={{
          backgroundColor: isSelected ? GOLD : "#111111",
          border: `2px solid ${GOLD}`,
        }}
      />
    </button>
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
  );

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
