import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const LOGO_URL =
  "https://raw.githubusercontent.com/Julianb233/tauro/main/public/tauro-logo.png";

export default async function AppleIcon() {
  const logoResponse = await fetch(LOGO_URL);
  const logoBuffer = await logoResponse.arrayBuffer();
  const logoBase64 = `data:image/png;base64,${Buffer.from(logoBuffer).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A2E",
          borderRadius: 36,
          padding: 24,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt=""
          width={132}
          height={132}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
