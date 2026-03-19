"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, ExternalLink } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  singleMarker?: boolean;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const GOLD = "#C9A96E";
const PHILLY_CENTER: [number, number] = [-75.1652, 39.9526];

function MapFallback({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl border border-[#C9A96E]/20 bg-[#111111] p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/10">
        <MapPin className="h-7 w-7 text-[#C9A96E]" />
      </div>
      <p className="text-center text-sm text-[#F5F0E8]/60">{message}</p>
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
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes("placeholder")) {
      setMapError(true);
      return;
    }

    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: center ?? PHILLY_CENTER,
        zoom,
        attributionControl: false,
      });

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      map.on("load", () => {
        // Clear existing markers
        markersRef.current.forEach((m) => m.remove());
        markersRef.current = [];

        const bounds = new mapboxgl.LngLatBounds();

        properties.forEach((property) => {
          if (!property.lat || !property.lng) return;

          // Create custom marker element
          const el = document.createElement("div");
          el.style.width = "28px";
          el.style.height = "28px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = GOLD;
          el.style.border = "3px solid #111111";
          el.style.cursor = "pointer";
          el.style.boxShadow = `0 0 8px ${GOLD}66`;
          el.style.transition = "transform 0.2s ease";
          el.addEventListener("mouseenter", () => {
            el.style.transform = "scale(1.3)";
          });
          el.addEventListener("mouseleave", () => {
            el.style.transform = "scale(1)";
          });

          // Create popup content
          const popupHTML = singleMarker
            ? `<div style="background:#1A1A1A;color:#F5F0E8;padding:8px 12px;border-radius:8px;font-family:sans-serif;min-width:160px;">
                <p style="font-weight:600;font-size:13px;margin:0;">${property.address}</p>
                <p style="font-size:12px;color:#F5F0E880;margin:4px 0 0;">${property.city}, ${property.state} ${property.zip}</p>
              </div>`
            : `<div style="background:#1A1A1A;color:#F5F0E8;padding:10px 14px;border-radius:8px;font-family:sans-serif;min-width:180px;">
                <p style="font-weight:600;font-size:13px;margin:0;">${property.address}</p>
                <p style="color:${GOLD};font-weight:700;font-size:14px;margin:6px 0 4px;">${formatPrice(property.price)}</p>
                <p style="font-size:11px;color:#F5F0E880;margin:0 0 8px;">${property.beds} BD | ${property.baths} BA | ${property.sqft.toLocaleString()} SF</p>
                <a href="/properties/${property.slug}" style="display:inline-block;padding:5px 12px;background:${GOLD};color:#1A1A1A;border-radius:6px;text-decoration:none;font-size:12px;font-weight:600;">View Details</a>
              </div>`;

          const popup = new mapboxgl.Popup({
            offset: 20,
            closeButton: false,
            maxWidth: "260px",
          }).setHTML(popupHTML);

          const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([property.lng, property.lat])
            .setPopup(popup)
            .addTo(map);

          // Click marker to navigate (if not single marker mode)
          if (!singleMarker && onPropertyClick) {
            el.addEventListener("click", (e) => {
              e.stopPropagation();
            });
          }

          markersRef.current.push(marker);
          bounds.extend([property.lng, property.lat]);
        });

        // Fit bounds if multiple properties and no explicit center
        if (!singleMarker && properties.length > 1 && !center) {
          map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
        }
      });

      mapRef.current = map;
    } catch {
      setMapError(true);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when properties change (without recreating map)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.loaded()) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();

    properties.forEach((property) => {
      if (!property.lat || !property.lng) return;

      const el = document.createElement("div");
      el.style.width = "28px";
      el.style.height = "28px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = GOLD;
      el.style.border = "3px solid #111111";
      el.style.cursor = "pointer";
      el.style.boxShadow = `0 0 8px ${GOLD}66`;
      el.style.transition = "transform 0.2s ease";
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.3)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
      });

      const popupHTML = singleMarker
        ? `<div style="background:#1A1A1A;color:#F5F0E8;padding:8px 12px;border-radius:8px;font-family:sans-serif;min-width:160px;">
            <p style="font-weight:600;font-size:13px;margin:0;">${property.address}</p>
            <p style="font-size:12px;color:#F5F0E880;margin:4px 0 0;">${property.city}, ${property.state} ${property.zip}</p>
          </div>`
        : `<div style="background:#1A1A1A;color:#F5F0E8;padding:10px 14px;border-radius:8px;font-family:sans-serif;min-width:180px;">
            <p style="font-weight:600;font-size:13px;margin:0;">${property.address}</p>
            <p style="color:${GOLD};font-weight:700;font-size:14px;margin:6px 0 4px;">${formatPrice(property.price)}</p>
            <p style="font-size:11px;color:#F5F0E880;margin:0 0 8px;">${property.beds} BD | ${property.baths} BA | ${property.sqft.toLocaleString()} SF</p>
            <a href="/properties/${property.slug}" style="display:inline-block;padding:5px 12px;background:${GOLD};color:#1A1A1A;border-radius:6px;text-decoration:none;font-size:12px;font-weight:600;">View Details</a>
          </div>`;

      const popup = new mapboxgl.Popup({
        offset: 20,
        closeButton: false,
        maxWidth: "260px",
      }).setHTML(popupHTML);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([property.lng, property.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
      bounds.extend([property.lng, property.lat]);
    });

    if (!singleMarker && properties.length > 1 && !center) {
      map.fitBounds(bounds, { padding: 60, maxZoom: 15 });
    } else if (center) {
      map.flyTo({ center, zoom });
    }
  }, [properties, singleMarker, center, zoom, onPropertyClick]);

  if (mapError) {
    return (
      <MapFallback message="Map unavailable. Please configure your Mapbox token to enable the interactive map." />
    );
  }

  return (
    <div
      ref={mapContainer}
      className="h-full w-full rounded-xl"
      style={{ minHeight: "300px" }}
    />
  );
}
