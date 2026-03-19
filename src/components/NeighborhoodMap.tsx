"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

interface NeighborhoodMapProps {
  name: string;
  center: { lat: number; lng: number };
  zoom?: number;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const GOLD = "#C9A96E";

export default function NeighborhoodMap({
  name,
  center,
  zoom = 14,
}: NeighborhoodMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!MAPBOX_TOKEN || MAPBOX_TOKEN.includes("placeholder")) {
      setError(true);
      return;
    }

    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    try {
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [center.lng, center.lat],
        zoom,
        attributionControl: false,
      });

      map.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        "top-right"
      );

      map.on("load", () => {
        // Add neighborhood center marker
        const el = document.createElement("div");
        el.style.width = "36px";
        el.style.height = "36px";
        el.style.borderRadius = "50%";
        el.style.backgroundColor = GOLD;
        el.style.border = "4px solid #111111";
        el.style.boxShadow = `0 0 12px ${GOLD}88`;

        const popup = new mapboxgl.Popup({
          offset: 24,
          closeButton: false,
        }).setHTML(
          `<div style="background:#1A1A1A;color:#F5F0E8;padding:8px 14px;border-radius:8px;font-family:sans-serif;">
            <p style="font-weight:600;font-size:14px;margin:0;">${name}</p>
            <p style="font-size:12px;color:${GOLD};margin:4px 0 0;">Philadelphia, PA</p>
          </div>`
        );

        new mapboxgl.Marker({ element: el })
          .setLngLat([center.lng, center.lat])
          .setPopup(popup)
          .addTo(map);
      });

      mapRef.current = map;
    } catch {
      setError(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-card">
        <div className="text-center">
          <MapPin className="mx-auto size-12 text-gold/30" />
          <p className="mt-4 font-heading text-lg font-bold text-foreground">
            Map of {name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Map unavailable. Please configure your Mapbox token.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="aspect-video w-full rounded-xl"
      style={{ minHeight: "300px" }}
    />
  );
}
