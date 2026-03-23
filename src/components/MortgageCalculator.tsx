"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Calculator,
  DollarSign,
  Home,
  Shield,
  TrendingDown,
  ChevronDown,
  PieChart,
  Info,
} from "lucide-react";

interface MortgageCalculatorProps {
  homePrice: number;
  taxAnnual?: number;
  hoaMonthly?: number;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString();
}

/* ── Animated number display ── */
function AnimatedNumber({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);
  const startRef = useRef(display);
  const startTime = useRef(0);

  useEffect(() => {
    startRef.current = display;
    startTime.current = performance.now();
    const duration = 400;

    const animate = (now: number) => {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startRef.current + (value - startRef.current) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {fmt(display)}
    </span>
  );
}

/* ── Pie chart (pure SVG) ── */
function PaymentPieChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total === 0) return null;

  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;

  let cumulative = 0;
  const paths = segments.map((seg) => {
    const fraction = seg.value / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += fraction;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;

    const largeArc = fraction > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    // For very small segments, render a tiny wedge
    if (fraction < 0.001) return null;

    const d =
      fraction >= 0.9999
        ? // Full circle
          `M ${cx - r},${cy} A ${r},${r} 0 1,1 ${cx + r},${cy} A ${r},${r} 0 1,1 ${cx - r},${cy}`
        : `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;

    return <path key={seg.label} d={d} fill={seg.color} className="transition-all duration-300" />;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto h-44 w-44">
      {paths}
      {/* Center hole for donut effect */}
      <circle cx={cx} cy={cy} r={40} className="fill-card" />
    </svg>
  );
}

/* ── Loan term type ── */
type LoanTerm = 15 | 20 | 30;

export default function MortgageCalculator({
  homePrice,
  taxAnnual,
  hoaMonthly: initialHoa,
}: MortgageCalculatorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [downPercent, setDownPercent] = useState(20);
  const [downDollars, setDownDollars] = useState(Math.round(homePrice * 0.2));
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState<LoanTerm>(30);

  // Property tax: pre-fill from listing or default 1.4%
  const defaultTaxMonthly = taxAnnual ? Math.round(taxAnnual / 12) : Math.round((homePrice * 0.014) / 12);
  const [propertyTax, setPropertyTax] = useState(defaultTaxMonthly);

  // HOA: pre-fill from listing or 0
  const [hoaFees, setHoaFees] = useState(initialHoa ?? 0);

  // Insurance: auto-calculated, editable
  const defaultInsurance = 150;
  const [insurance, setInsurance] = useState(defaultInsurance);

  // Sync down payment slider ↔ dollar input
  const syncFromPercent = useCallback(
    (pct: number) => {
      setDownPercent(pct);
      setDownDollars(Math.round(homePrice * (pct / 100)));
    },
    [homePrice]
  );

  const syncFromDollars = useCallback(
    (dollars: number) => {
      setDownDollars(dollars);
      setDownPercent(Math.round((dollars / homePrice) * 100));
    },
    [homePrice]
  );

  const breakdown = useMemo(() => {
    const downPayment = homePrice * (downPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    let principalAndInterest: number;
    if (monthlyRate === 0) {
      principalAndInterest = loanAmount / numPayments;
    } else {
      principalAndInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    // PMI: ~0.5% of loan amount / 12, only if < 20% down
    const pmi = downPercent < 20 ? (loanAmount * 0.005) / 12 : 0;

    const total = principalAndInterest + propertyTax + insurance + hoaFees + pmi;

    // Amortization: total interest over life of loan
    const totalPaid = principalAndInterest * numPayments;
    const totalInterest = totalPaid - loanAmount;

    return {
      principalAndInterest,
      propertyTax,
      insurance,
      hoaFees,
      pmi,
      total,
      downPayment,
      loanAmount,
      totalInterest,
      totalPaid,
    };
  }, [homePrice, downPercent, interestRate, loanTerm, propertyTax, insurance, hoaFees]);

  // Pie chart segments
  const pieColors = {
    pi: "#C9A96E",       // gold
    tax: "#B08D4C",      // gold-dark
    ins: "#D4C4A0",      // gold-light
    hoa: "#8B7355",      // warm brown
    pmi: "#f59e0b",      // amber
  };

  const segments = [
    { label: "Principal & Interest", value: breakdown.principalAndInterest, color: pieColors.pi },
    { label: "Property Tax", value: breakdown.propertyTax, color: pieColors.tax },
    { label: "Insurance", value: breakdown.insurance, color: pieColors.ins },
    ...(breakdown.hoaFees > 0
      ? [{ label: "HOA Fees", value: breakdown.hoaFees, color: pieColors.hoa }]
      : []),
    ...(breakdown.pmi > 0
      ? [{ label: "PMI", value: breakdown.pmi, color: pieColors.pmi }]
      : []),
  ];

  // Tailwind-mapped segments for the breakdown legend
  const legendSegments = [
    { label: "Principal & Interest", value: breakdown.principalAndInterest, colorClass: "bg-gold" },
    { label: "Property Tax", value: breakdown.propertyTax, colorClass: "bg-gold-dark" },
    { label: "Insurance", value: breakdown.insurance, colorClass: "bg-gold-light" },
    ...(breakdown.hoaFees > 0
      ? [{ label: "HOA Fees", value: breakdown.hoaFees, colorClass: "bg-[#8B7355]" }]
      : []),
    ...(breakdown.pmi > 0
      ? [{ label: "PMI", value: breakdown.pmi, colorClass: "bg-amber-400" }]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-border bg-card/80 shadow-lg backdrop-blur-sm">
      {/* Header — always visible, toggles expansion */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-6 sm:p-8"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15">
            <Calculator className="h-5 w-5 text-gold" />
          </div>
          <div className="text-left">
            <h2 className="font-heading text-xl font-bold">Mortgage Calculator</h2>
            <p className="text-sm text-muted-foreground">Estimate your monthly payment</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isExpanded && (
            <span className="font-heading text-2xl font-bold text-gold">
              <AnimatedNumber value={breakdown.total} />/mo
            </span>
          )}
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
          {/* Total monthly + Pie chart */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            {/* Pie chart */}
            <div className="flex-shrink-0">
              <PaymentPieChart segments={segments} />
            </div>

            {/* Total + legend */}
            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
              <p className="mt-1 font-heading text-4xl font-bold text-gold sm:text-5xl">
                <AnimatedNumber value={breakdown.total} />
                <span className="text-lg font-normal text-muted-foreground">/mo</span>
              </p>

              {/* Breakdown legend */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {legendSegments.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${seg.colorClass}`}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted-foreground">{seg.label}</p>
                      <p className="text-sm font-semibold">${fmt(seg.value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* ── Down Payment ── */}
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-sm font-medium">
                <DollarSign className="h-3.5 w-3.5 text-gold" />
                Down Payment
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gold">{downPercent}%</span>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={fmt(downDollars)}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(val) && val <= homePrice) syncFromDollars(val);
                    }}
                    className="w-28 rounded-md border border-border bg-background px-2 py-1 pl-5 text-right text-sm font-semibold focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={downPercent}
              onChange={(e) => syncFromPercent(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-gold"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
            {downPercent < 20 && (
              <p className="mt-2 flex items-center gap-1 text-xs text-amber-400">
                <Shield className="h-3 w-3" />
                PMI required when down payment is below 20%
              </p>
            )}
          </div>

          {/* ── Interest Rate ── */}
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-1.5 text-sm font-medium">
                <TrendingDown className="h-3.5 w-3.5 text-gold" />
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={interestRate.toFixed(1)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && val >= 0 && val <= 15) setInterestRate(val);
                  }}
                  className="w-20 rounded-md border border-border bg-background px-2 py-1 text-right text-sm font-bold text-gold focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  %
                </span>
              </div>
            </div>
            <input
              type="range"
              min={2}
              max={12}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-gold"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
              <span>2%</span>
              <span>7%</span>
              <span>12%</span>
            </div>
          </div>

          {/* ── Loan Term ── */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium">
              <Home className="h-3.5 w-3.5 text-gold" />
              Loan Term
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {([15, 20, 30] as const).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTerm(term)}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                    loanTerm === term
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                  }`}
                >
                  {term} Years
                </button>
              ))}
            </div>
          </div>

          {/* ── Additional Costs ── */}
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-sm font-medium">
              <PieChart className="h-3.5 w-3.5 text-gold" />
              Monthly Costs
            </p>
            <div className="space-y-3">
              {/* Property Tax */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Property Tax
                  {taxAnnual && (
                    <span className="ml-1 text-[10px] text-gold/60">
                      (${fmt(taxAnnual)}/yr)
                    </span>
                  )}
                </span>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={fmt(propertyTax)}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(val)) setPropertyTax(val);
                    }}
                    className="w-24 rounded-md border border-border bg-background px-2 py-1 pl-5 text-right text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                    /mo
                  </span>
                </div>
              </div>

              {/* HOA Fees */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">HOA Fees</span>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={fmt(hoaFees)}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(val)) setHoaFees(val);
                    }}
                    className="w-24 rounded-md border border-border bg-background px-2 py-1 pl-5 text-right text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                    /mo
                  </span>
                </div>
              </div>

              {/* Insurance */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Insurance</span>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    $
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={fmt(insurance)}
                    onChange={(e) => {
                      const val = Number(e.target.value.replace(/[^0-9]/g, ""));
                      if (!isNaN(val)) setInsurance(val);
                    }}
                    className="w-24 rounded-md border border-border bg-background px-2 py-1 pl-5 text-right text-sm focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                    /mo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Summary ── */}
          <div className="rounded-lg border border-border bg-background/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Home Price</span>
              <span className="font-semibold">${fmt(homePrice)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Loan Amount</span>
              <span className="font-semibold">${fmt(breakdown.loanAmount)}</span>
            </div>
            <div className="my-2 border-t border-border/50" />
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Info className="h-3 w-3" />
                Total Interest ({loanTerm} yrs)
              </span>
              <span className="font-semibold text-gold-dark">
                ${fmt(breakdown.totalInterest)}
              </span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Total Cost of Loan</span>
              <span className="font-semibold">${fmt(breakdown.totalPaid)}</span>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#schedule"
            className="block w-full rounded-lg bg-gold py-3 text-center text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
          >
            Get Pre-Approved
          </a>
        </div>
      </div>
    </div>
  );
}
