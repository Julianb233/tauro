"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A2E",
          color: "#F8F6F1",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        {/* Gold decorative line */}
        <div
          style={{
            width: "6rem",
            height: "1px",
            backgroundColor: "#C9A96E",
            marginBottom: "2rem",
          }}
        />

        {/* Error label */}
        <p
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "#C9A96E",
            margin: 0,
          }}
        >
          Something Went Wrong
        </p>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            marginTop: "1rem",
            marginBottom: "1.5rem",
            lineHeight: 1.1,
            color: "#F8F6F1",
            fontFamily: "Georgia, serif",
          }}
        >
          Unexpected Error
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "1.125rem",
            color: "rgba(212, 196, 160, 0.7)",
            maxWidth: "28rem",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          We apologize for the inconvenience. An unexpected error has occurred.
          Please try again or return to the homepage.
        </p>

        {/* Error digest for debugging */}
        {error.digest && (
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(201, 169, 110, 0.4)",
              marginTop: "1rem",
              fontFamily: "monospace",
            }}
          >
            Error ID: {error.digest}
          </p>
        )}

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              backgroundColor: "transparent",
              color: "#C9A96E",
              border: "1px solid #C9A96E",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 2rem",
              backgroundColor: "#C9A96E",
              color: "#1A1A2E",
              border: "none",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Go Home
          </a>
        </div>

        {/* Bottom decorative line */}
        <div
          style={{
            width: "6rem",
            height: "1px",
            backgroundColor: "rgba(201, 169, 110, 0.3)",
            marginTop: "3rem",
          }}
        />
      </body>
    </html>
  );
}
