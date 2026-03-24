import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendShareProperty } from "@/lib/email";
import { sanitize } from "@/lib/sanitize";

const ShareSchema = z.object({
  senderName: z.string().min(1).max(100),
  recipientEmail: z.string().email(),
  recipientName: z.string().max(100).optional(),
  personalMessage: z.string().max(500).optional(),
  propertyTitle: z.string().min(1).max(200),
  propertyUrl: z.string().url(),
  propertyImage: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ShareSchema.parse(body);

    const result = await sendShareProperty(parsed.recipientEmail, {
      senderName: sanitize(parsed.senderName),
      recipientName: parsed.recipientName ? sanitize(parsed.recipientName) : undefined,
      propertyTitle: sanitize(parsed.propertyTitle),
      propertyUrl: parsed.propertyUrl,
      propertyImage: parsed.propertyImage,
      personalMessage: parsed.personalMessage ? sanitize(parsed.personalMessage) : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request", details: err.errors },
        { status: 400 },
      );
    }
    console.error("[api/share-property] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
