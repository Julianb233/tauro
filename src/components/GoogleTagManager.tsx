"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Google Tag Manager integration.
 * Injects the GTM container script only when NEXT_PUBLIC_GTM_ID is set
 * AND the user has accepted analytics cookies.
 */
export function GoogleTagManager() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());

    function handleConsentChange() {
      setConsented(hasAnalyticsConsent());
    }

    window.addEventListener("cookie-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("cookie-consent-change", handleConsentChange);
    };
  }, []);

  if (!GTM_ID || !consented) return null;

  return (
    <>
      <Script id="gtm-script" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    </>
  );
}

/**
 * GTM noscript fallback — must be placed immediately after the opening <body> tag.
 * This is a server component.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
