/**
 * Philadelphia real estate market data — Jan 2025 through Mar 2026.
 * Approximate values based on publicly available MLS trends.
 */

export interface MonthlyDataPoint {
  month: string;        // e.g. "Jan 2025"
  medianPrice: number;  // dollars
  activeInventory: number;
  daysOnMarket: number;
  pricePerSqft: number;
}

export interface NeighborhoodData {
  name: string;
  medianPrice: number;
  activeInventory: number;
  daysOnMarket: number;
  pricePerSqft: number;
  yoyPriceChange: number; // percent
}

/* ------------------------------------------------------------------ */
/*  City-wide monthly trend (Jan 2025 – Mar 2026)                     */
/* ------------------------------------------------------------------ */

export const monthlyTrend: MonthlyDataPoint[] = [
  { month: "Jan 2025",  medianPrice: 270000, activeInventory: 3800, daysOnMarket: 34, pricePerSqft: 195 },
  { month: "Feb 2025",  medianPrice: 272000, activeInventory: 3650, daysOnMarket: 33, pricePerSqft: 197 },
  { month: "Mar 2025",  medianPrice: 278000, activeInventory: 3500, daysOnMarket: 30, pricePerSqft: 200 },
  { month: "Apr 2025",  medianPrice: 285000, activeInventory: 3400, daysOnMarket: 27, pricePerSqft: 204 },
  { month: "May 2025",  medianPrice: 292000, activeInventory: 3300, daysOnMarket: 25, pricePerSqft: 208 },
  { month: "Jun 2025",  medianPrice: 298000, activeInventory: 3200, daysOnMarket: 24, pricePerSqft: 212 },
  { month: "Jul 2025",  medianPrice: 295000, activeInventory: 3250, daysOnMarket: 25, pricePerSqft: 210 },
  { month: "Aug 2025",  medianPrice: 290000, activeInventory: 3350, daysOnMarket: 26, pricePerSqft: 207 },
  { month: "Sep 2025",  medianPrice: 287000, activeInventory: 3400, daysOnMarket: 27, pricePerSqft: 205 },
  { month: "Oct 2025",  medianPrice: 284000, activeInventory: 3500, daysOnMarket: 29, pricePerSqft: 203 },
  { month: "Nov 2025",  medianPrice: 280000, activeInventory: 3600, daysOnMarket: 31, pricePerSqft: 200 },
  { month: "Dec 2025",  medianPrice: 276000, activeInventory: 3700, daysOnMarket: 33, pricePerSqft: 198 },
  { month: "Jan 2026",  medianPrice: 279000, activeInventory: 3650, daysOnMarket: 32, pricePerSqft: 200 },
  { month: "Feb 2026",  medianPrice: 282000, activeInventory: 3550, daysOnMarket: 31, pricePerSqft: 202 },
  { month: "Mar 2026",  medianPrice: 288000, activeInventory: 3450, daysOnMarket: 28, pricePerSqft: 206 },
];

/* ------------------------------------------------------------------ */
/*  Neighborhood breakdown (latest quarter)                           */
/* ------------------------------------------------------------------ */

export const neighborhoods: NeighborhoodData[] = [
  { name: "Center City",        medianPrice: 425000, activeInventory: 310, daysOnMarket: 22, pricePerSqft: 320, yoyPriceChange: 3.8 },
  { name: "Rittenhouse",        medianPrice: 520000, activeInventory: 180, daysOnMarket: 18, pricePerSqft: 385, yoyPriceChange: 2.5 },
  { name: "Fishtown",           medianPrice: 385000, activeInventory: 140, daysOnMarket: 15, pricePerSqft: 290, yoyPriceChange: 6.1 },
  { name: "Northern Liberties", medianPrice: 395000, activeInventory: 120, daysOnMarket: 17, pricePerSqft: 295, yoyPriceChange: 5.2 },
  { name: "Old City",           medianPrice: 445000, activeInventory: 95,  daysOnMarket: 26, pricePerSqft: 340, yoyPriceChange: 2.8 },
  { name: "South Philly",       medianPrice: 295000, activeInventory: 260, daysOnMarket: 24, pricePerSqft: 215, yoyPriceChange: 4.5 },
];

/* ------------------------------------------------------------------ */
/*  Summary helpers                                                    */
/* ------------------------------------------------------------------ */

const latest = monthlyTrend[monthlyTrend.length - 1];
const oneYearAgo = monthlyTrend[0]; // Jan 2025

export const summaryStats = {
  medianPrice: latest.medianPrice,
  medianPriceFormatted: `$${(latest.medianPrice / 1000).toFixed(0)}K`,
  activeListings: latest.activeInventory,
  avgDaysOnMarket: latest.daysOnMarket,
  yoyPriceChange: +(
    ((latest.medianPrice - oneYearAgo.medianPrice) / oneYearAgo.medianPrice) *
    100
  ).toFixed(1),
};
