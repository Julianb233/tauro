import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Tauro Realty — Premium Philadelphia Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Fetch the logo from the public directory via absolute URL
  const logoUrl = new URL("/tauro-logo.png", "https://taurorealty.com");
  const logoResponse = await fetch(logoUrl);
  const logoBuffer = await logoResponse.arrayBuffer();
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoBuffer).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A2E",
          position: "relative",
        }}
      >
        {/* Top gold border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          }}
        />

        {/* Corner accent frame */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: "1px solid rgba(201, 169, 110, 0.15)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
          }}
        >
          {/* Logo image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt=""
            width={160}
            height={160}
            style={{ objectFit: "contain", marginBottom: 24 }}
          />

          {/* Brand name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#F8F6F1",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              marginBottom: 16,
            }}
          >
            TAURO
          </div>

          {/* Divider with diamond */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 60,
                height: 1,
                backgroundColor: "rgba(201, 169, 110, 0.5)",
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: "#C9A96E",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                width: 60,
                height: 1,
                backgroundColor: "rgba(201, 169, 110, 0.5)",
              }}
            />
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 24,
              color: "#C9A96E",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
            }}
          >
            Premium Philadelphia Real Estate
          </div>
        </div>

        {/* Bottom gold border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
