"use client";

import { useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
  center?: [number, number]; // [lng, lat]
  zoom?: number;
  singleMarker?: boolean; // For detail page (single property, no popup)
}

export default function PropertyMap({
  properties,
  onPropertyClick,
  center = [-117.16, 32.78],
  zoom = 10,
  singleMarker = false,
}: PropertyMapProps) {
  const [popupInfo, setPopupInfo] = useState<Property | null>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token || token === "pk.placeholder_token_replace_me") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl bg-near-black/80 text-off-white">
        <MapPin className="h-10 w-10 text-gold" />
        <p className="text-sm font-medium text-gold">
          Map unavailable &mdash; configure Mapbox token
        </p>
      </div>
    );
  }

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={{
        longitude: center[0],
        latitude: center[1],
        zoom,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      <NavigationControl position="top-right" />

      {properties.map((p) => (
        <Marker key={p.id} longitude={p.lng} latitude={p.lat} anchor="bottom">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (singleMarker) return;
              setPopupInfo(p);
            }}
            className="rounded-full bg-midnight px-2 py-1 text-xs font-bold text-gold shadow-md transition-colors hover:bg-gold hover:text-near-black"
          >
            {formatPrice(p.price)}
          </button>
        </Marker>
      ))}

      {popupInfo && !singleMarker && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          anchor="bottom"
          offset={25}
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
        >
          <div className="max-w-[200px] p-2">
            <p className="font-heading text-sm font-bold text-near-black">
              {popupInfo.address}
            </p>
            <p className="text-xs text-gray-600">
              {popupInfo.city}, {popupInfo.state}
            </p>
            <p className="mt-1 font-bold text-near-black">
              {formatPrice(popupInfo.price)}
            </p>
            <p className="text-xs text-gray-500">
              {popupInfo.beds} BD | {popupInfo.baths} BA |{" "}
              {popupInfo.sqft.toLocaleString()} SF
            </p>
            {onPropertyClick && (
              <button
                onClick={() => onPropertyClick(popupInfo.slug)}
                className="mt-2 w-full rounded bg-near-black px-2 py-1 text-xs font-semibold text-gold hover:bg-midnight"
              >
                View Details
              </button>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
