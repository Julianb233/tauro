import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";
import { createElement } from "react";
import { loadPropertyBySlug } from "@/lib/data";
import { siteUrl } from "@/lib/site-config";
import BrochurePDF from "@/lib/brochure/BrochurePDF";

/**
 * POST /api/brochures/generate
 * Body: { slug: string }
 *
 * Returns a PDF binary for the given property slug.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body as { slug?: string };

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "slug is required" },
        { status: 400 }
      );
    }

    // Load property data
    const property = await loadPropertyBySlug(slug);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Generate QR code pointing to the online listing
    const listingUrl = `${siteUrl}/properties/${property.slug}`;
    const qrCodeDataUrl = await QRCode.toDataURL(listingUrl, {
      width: 200,
      margin: 1,
      color: { dark: "#1A1A2E", light: "#FFFFFF" },
    });

    // Build Mapbox static image URL (requires NEXT_PUBLIC_MAPBOX_TOKEN)
    let mapImageUrl: string | null = null;
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (mapboxToken && property.lat && property.lng) {
      mapImageUrl = [
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static`,
        `/${property.lng},${property.lat},14,0`,
        `/532x260`,
        `?access_token=${mapboxToken}`,
        `&attribution=false&logo=false`,
      ].join("");
    }

    // Render PDF — cast required: renderToBuffer expects DocumentProps but BrochurePDF wraps Document internally
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(
      createElement(BrochurePDF, { property, qrCodeDataUrl, mapImageUrl }) as any
    );

    // Track download (best-effort, non-blocking)
    trackBrochureDownload(property.slug).catch(() => {});

    const filename = `tauro-${property.slug}.pdf`;
    // Slice to exact bounds — Buffer may share a larger ArrayBuffer
    const arrayBuffer = pdfBuffer.buffer.slice(pdfBuffer.byteOffset, pdfBuffer.byteOffset + pdfBuffer.byteLength) as ArrayBuffer;
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString(),
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (err) {
    console.error("POST /api/brochures/generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate brochure" },
      { status: 500 }
    );
  }
}

/**
 * Track brochure downloads.
 * Uses Supabase if available; silently skips otherwise.
 */
async function trackBrochureDownload(slug: string): Promise<void> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey);
    await supabase.from("brochure_downloads").insert({
      property_slug: slug,
      downloaded_at: new Date().toISOString(),
    });
  } catch {
    // Table may not exist yet — fail silently
  }
}
