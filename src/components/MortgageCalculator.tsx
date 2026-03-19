"use client";

import { useState, useMemo } from "react";
import { Calculator, DollarSign, Home, Shield, TrendingDown } from "lucide-react";

interface MortgageCalculatorProps {
  homePrice: number;
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString();
}

export default function MortgageCalculator({ homePrice }: MortgageCalculatorProps) {
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState<15 | 30>(30);

  const breakdown = useMemo(() => {
    const downPayment = homePrice * (downPercent / 100);
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTerm * 12;

    // Principal & Interest (standard amortization formula)
    let principalAndInterest: number;
    if (monthlyRate === 0) {
      principalAndInterest = loanAmount / numPayments;
    } else {
      principalAndInterest =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    // Property Tax estimate: 1.4% of home price / 12
    const propertyTax = (homePrice * 0.014) / 12;

    // Homeowner's Insurance: flat $150/mo estimate
    const insurance = 150;

    // PMI: ~0.5% of loan amount / 12, only if < 20% down
    const pmi = downPercent < 20 ? (loanAmount * 0.005) / 12 : 0;

    const total = principalAndInterest + propertyTax + insurance + pmi;

    return {
      principalAndInterest,
      propertyTax,
      insurance,
      pmi,
      total,
      downPayment,
      loanAmount,
    };
  }, [homePrice, downPercent, interestRate, loanTerm]);

  // Proportional bar segments
  const segments = [
    { label: "Principal & Interest", value: breakdown.principalAndInterest, color: "bg-gold" },
    { label: "Property Tax", value: breakdown.propertyTax, color: "bg-gold-dark" },
    { label: "Insurance", value: breakdown.insurance, color: "bg-gold-light" },
    ...(breakdown.pmi > 0
      ? [{ label: "PMI", value: breakdown.pmi, color: "bg-amber-400" }]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-lg backdrop-blur-sm sm:p-8">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15">
          <Calculator className="h-5 w-5 text-gold" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-bold">Mortgage Calculator</h2>
          <p className="text-sm text-muted-foreground">Estimate your monthly payment</p>
        </div>
      </div>

      {/* Total monthly */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
        <p className="mt-1 font-heading text-4xl font-bold text-gold sm:text-5xl">
          ${fmt(breakdown.total)}
          <span className="text-lg font-normal text-muted-foreground">/mo</span>
        </p>
      </div>

      {/* Proportional bar */}
      <div className="mt-6 flex h-3 overflow-hidden rounded-full">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={`${seg.color} transition-all duration-300`}
            style={{ width: `${(seg.value / breakdown.total) * 100}%` }}
          />
        ))}
      </div>

      {/* Breakdown legend */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${seg.color}`} />
            <div className="min-w-0">
              <p className="truncate text-xs text-muted-foreground">{seg.label}</p>
              <p className="text-sm font-semibold">${fmt(seg.value)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-border" />

      {/* Down Payment Slider */}
      <div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-sm font-medium">
            <DollarSign className="h-3.5 w-3.5 text-gold" />
            Down Payment
          </label>
          <div className="text-right">
            <span className="text-sm font-bold text-gold">{downPercent}%</span>
            <span className="ml-1 text-xs text-muted-foreground">
              (${fmt(breakdown.downPayment)})
            </span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={downPercent}
          onChange={(e) => setDownPercent(Number(e.target.value))}
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

      {/* Interest Rate */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-sm font-medium">
            <TrendingDown className="h-3.5 w-3.5 text-gold" />
            Interest Rate
          </label>
          <span className="text-sm font-bold text-gold">{interestRate.toFixed(1)}%</span>
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

      {/* Loan Term Toggle */}
      <div className="mt-5">
        <label className="flex items-center gap-1.5 text-sm font-medium">
          <Home className="h-3.5 w-3.5 text-gold" />
          Loan Term
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {([30, 15] as const).map((term) => (
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

      {/* Summary row */}
      <div className="mt-6 rounded-lg border border-border bg-background/50 p-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Home Price</span>
          <span className="font-semibold">${fmt(homePrice)}</span>
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Loan Amount</span>
          <span className="font-semibold">${fmt(breakdown.loanAmount)}</span>
        </div>
      </div>

      {/* CTA */}
      <a
        href="#schedule"
        className="mt-6 block w-full rounded-lg bg-gold py-3 text-center text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
      >
        Get Pre-Approved
      </a>
    </div>
  );
}
