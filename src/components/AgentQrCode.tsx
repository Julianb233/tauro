"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface AgentQrCodeProps {
  slug: string;
  agentName: string;
}

export default function AgentQrCode({ slug, agentName }: AgentQrCodeProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    const url =
      (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
        "https://taurorealty.com") +
      `/agents/${slug}`;

    QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: { dark: "#1A1A2E", light: "#FFFFFF" },
      errorCorrectionLevel: "H",
    }).then(setDataUrl);
  }, [slug]);

  if (!dataUrl) return null;

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="rounded-xl border border-gold/20 bg-white p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt={`QR code for ${agentName}'s profile`}
          width={160}
          height={160}
          className="block"
        />
      </div>
      <p className="text-[11px] font-label uppercase tracking-wider text-muted-foreground">
        Scan for digital profile
      </p>
    </div>
  );
}
