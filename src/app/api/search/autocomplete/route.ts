import { NextRequest, NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";
import { neighborhoods } from "@/data/neighborhoods";

export interface AutocompleteResult {
  type: "neighborhood" | "address" | "agent" | "city" | "zip";
  label: string;
  sublabel?: string;
  href: string;
  count?: number;
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const results: AutocompleteResult[] = [];

  // Neighborhoods — match name, show property count
  for (const n of neighborhoods) {
    if (n.name.toLowerCase().includes(q)) {
      const count = properties.filter((p) => p.neighborhood === n.name).length;
      results.push({
        type: "neighborhood",
        label: n.name,
        sublabel: `${count} listing${count !== 1 ? "s" : ""}`,
        href: `/properties?area=${encodeURIComponent(n.name)}`,
        count,
      });
    }
  }

  // Addresses — match property address
  for (const p of properties) {
    if (p.address.toLowerCase().includes(q)) {
      results.push({
        type: "address",
        label: p.address,
        sublabel: `${p.neighborhood} · $${p.price.toLocaleString()}`,
        href: `/properties/${p.slug}`,
      });
    }
  }

  // Agents — match name
  for (const a of agents) {
    if (a.fullName.toLowerCase().includes(q)) {
      results.push({
        type: "agent",
        label: a.fullName,
        sublabel: a.title,
        href: `/agents/${a.slug}`,
      });
    }
  }

  // Cities — match city name
  const cities = [...new Set(properties.map((p) => p.city))];
  for (const city of cities) {
    if (city.toLowerCase().includes(q)) {
      const count = properties.filter((p) => p.city === city).length;
      results.push({
        type: "city",
        label: city,
        sublabel: `${count} listing${count !== 1 ? "s" : ""}`,
        href: `/properties?search=${encodeURIComponent(city)}`,
        count,
      });
    }
  }

  // ZIP codes — match zip
  const zips = [...new Set(properties.map((p) => p.zip))];
  for (const zip of zips) {
    if (zip.includes(q)) {
      const count = properties.filter((p) => p.zip === zip).length;
      results.push({
        type: "zip",
        label: zip,
        sublabel: `${count} listing${count !== 1 ? "s" : ""}`,
        href: `/properties?search=${encodeURIComponent(zip)}`,
        count,
      });
    }
  }

  // Deduplicate by label and limit to 8
  const seen = new Set<string>();
  const deduped = results.filter((r) => {
    const key = `${r.type}:${r.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return NextResponse.json({ results: deduped.slice(0, 8) });
}
