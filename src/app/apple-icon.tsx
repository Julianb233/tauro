import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            fontSize: 112,
            fontWeight: 700,
            color: "#C9A96E",
            letterSpacing: "-0.02em",
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size },
  );
}
