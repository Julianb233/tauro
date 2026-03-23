"use client";

import {
  Sofa,
  Flame,
  Snowflake,
  Heater,
  Home,
  Building2,
  Trees,
  Waves,
  Car,
  Fence,
  Sun,
  Dumbbell,
  ShieldCheck,
  Users,
  Dog,
  Footprints,
  type LucideIcon,
} from "lucide-react";
import type { Property } from "@/data/properties";

/* ------------------------------------------------------------------ */
/*  Icon mapping for individual amenity keywords                       */
/* ------------------------------------------------------------------ */

const KEYWORD_ICON_MAP: { pattern: RegExp; icon: LucideIcon }[] = [
  { pattern: /pool|swim/i, icon: Waves },
  { pattern: /fireplace/i, icon: Flame },
  { pattern: /garage|parking/i, icon: Car },
  { pattern: /hardwood|flooring|tile|carpet/i, icon: Footprints },
  { pattern: /a\/?c|cool|central air/i, icon: Snowflake },
  { pattern: /heat/i, icon: Heater },
  { pattern: /garden|landscap|tree|yard/i, icon: Trees },
  { pattern: /patio|deck|porch|balcony/i, icon: Sun },
  { pattern: /fence/i, icon: Fence },
  { pattern: /gym|fitness/i, icon: Dumbbell },
  { pattern: /gated|secur|guard/i, icon: ShieldCheck },
  { pattern: /clubhouse|community|hoa/i, icon: Users },
  { pattern: /pet|dog/i, icon: Dog },
];

function getIconForFeature(feature: string): LucideIcon {
  for (const { pattern, icon } of KEYWORD_ICON_MAP) {
    if (pattern.test(feature)) return icon;
  }
  return Home;
}

/* ------------------------------------------------------------------ */
/*  Category config                                                    */
/* ------------------------------------------------------------------ */

interface CategoryConfig {
  key: "interior" | "exterior" | "community";
  label: string;
  icon: LucideIcon;
  description: string;
}

const CATEGORIES: CategoryConfig[] = [
  { key: "interior", label: "Interior", icon: Sofa, description: "Inside the home" },
  { key: "exterior", label: "Exterior", icon: Trees, description: "Outdoor & grounds" },
  { key: "community", label: "Community", icon: Users, description: "Neighborhood & HOA" },
];

/* ------------------------------------------------------------------ */
/*  Derive extra amenities from structured property fields             */
/* ------------------------------------------------------------------ */

interface DerivedAmenity {
  label: string;
  icon: LucideIcon;
  category: "interior" | "exterior" | "community";
}

function derivedAmenities(property: Property): DerivedAmenity[] {
  const items: DerivedAmenity[] = [];

  if (property.garage && property.garage !== "None") {
    items.push({ label: property.garage, icon: Car, category: "exterior" });
  }
  if (property.parkingSpaces && property.parkingSpaces > 0) {
    items.push({ label: `${property.parkingSpaces} Parking Spaces`, icon: Car, category: "exterior" });
  }
  if (property.cooling) {
    items.push({ label: property.cooling, icon: Snowflake, category: "interior" });
  }
  if (property.heating) {
    items.push({ label: property.heating, icon: Heater, category: "interior" });
  }
  if (property.flooring && property.flooring.length > 0) {
    property.flooring.forEach((f) =>
      items.push({ label: f, icon: Footprints, category: "interior" })
    );
  }
  if (property.stories && property.stories > 1) {
    items.push({ label: `${property.stories} Stories`, icon: Building2, category: "interior" });
  }
  if (property.construction) {
    items.push({ label: property.construction, icon: Building2, category: "exterior" });
  }
  if (property.roofType) {
    items.push({ label: `${property.roofType} Roof`, icon: Home, category: "exterior" });
  }
  if (property.has_hoa) {
    items.push({ label: "HOA Community", icon: Users, category: "community" });
  }

  return items;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PropertyAmenities({ property }: { property: Property }) {
  const derived = derivedAmenities(property);

  // Build per-category lists: derived amenities first, then feature strings
  const sections = CATEGORIES.map((cat) => {
    const featureItems = property.features[cat.key].map((f) => ({
      label: f,
      icon: getIconForFeature(f),
    }));

    const derivedItems = derived
      .filter((d) => d.category === cat.key)
      .map((d) => ({ label: d.label, icon: d.icon }));

    // Deduplicate by label (case-insensitive)
    const seen = new Set<string>();
    const all = [...derivedItems, ...featureItems].filter((item) => {
      const key = item.label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    return { ...cat, items: all };
  }).filter((s) => s.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">Property Amenities</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.key}
            className="rounded-xl border border-border bg-card p-5"
          >
            {/* Category header */}
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
                <section.icon className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  {section.label}
                </h3>
                <p className="text-xs text-muted-foreground">{section.description}</p>
              </div>
            </div>

            {/* Amenity items */}
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <item.icon className="h-4 w-4 flex-shrink-0 text-gold/70" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
