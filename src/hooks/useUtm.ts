"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Reads UTM parameters from the current URL query string.
 * Returns only the params that are present (non-empty).
 */
export function useUtm(): UtmParams {
  const searchParams = useSearchParams();

  return useMemo(() => {
    const utm: UtmParams = {};
    const source = searchParams.get("utm_source");
    const medium = searchParams.get("utm_medium");
    const campaign = searchParams.get("utm_campaign");

    if (source) utm.utm_source = source;
    if (medium) utm.utm_medium = medium;
    if (campaign) utm.utm_campaign = campaign;

    return utm;
  }, [searchParams]);
}
