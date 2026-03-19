import { ImageResponse } from "next/og";
import { LOGO_BASE64 } from "@/lib/logo-data";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 4,
          padding: 4,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO_BASE64}
          alt=""
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size },
  );
}
