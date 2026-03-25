"use client";

import { DollarSign, Home, Shield, TrendingUp } from "lucide-react";

interface FinancialSummaryCardProps {
  price: number;
  taxAnnual: number;
  taxYear: number;
  hoaFee?: number;
  hoaFrequency?: "monthly" | "quarterly" | "annual";
  hasHoa?: boolean;
}

function calcMonthlyMortgage(price: number): number {
  const down = price * 0.2;
  const principal = price - down;
  const monthlyRate = 0.075 / 12; // 7.5% annual rate
  const payments = 360; // 30 years
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
}

function getMonthlyHoa(fee: number | undefined, frequency: string | undefined): number {
  if (!fee) return 0;
  if (frequency === "quarterly") return Math.round(fee / 3);
  if (frequency === "annual") return Math.round(fee / 12);
  return fee;
}

export default function FinancialSummaryCard({
  price,
  taxAnnual,
  taxYear,
  hoaFee,
  hoaFrequency,
  hasHoa,
}: FinancialSummaryCardProps) {
  const monthlyMortgage = Math.round(calcMonthlyMortgage(price));
  const monthlyTax = Math.round(taxAnnual / 12);
  const monthlyHoa = hasHoa ? getMonthlyHoa(hoaFee, hoaFrequency) : 0;
  const monthlyInsurance = Math.round(price * 0.005 / 12); // ~0.5% annually
  const totalMonthly = monthlyMortgage + monthlyTax + monthlyHoa + monthlyInsurance;

  const rows = [
    {
      icon: Home,
      label: "Mortgage (est.)",
      sublabel: "20% down, 30yr, 7.5%",
      value: monthlyMortgage,
      period: "/mo",
    },
    {
      icon: TrendingUp,
      label: `Property Tax (${taxYear})`,
      sublabel: `$${taxAnnual.toLocaleString()} annually`,
      value: monthlyTax,
      period: "/mo",
    },
    ...(hasHoa && monthlyHoa > 0
      ? [
          {
            icon: Shield,
            label: "HOA Fee",
            sublabel: hoaFrequency === "monthly" ? "monthly" : `billed ${hoaFrequency}`,
            value: monthlyHoa,
            period: "/mo",
          },
        ]
      : []),
    {
      icon: Shield,
      label: "Insurance (est.)",
      sublabel: "~0.5% of home value",
      value: monthlyInsurance,
      period: "/mo",
    },
  ];

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">Monthly Cost Breakdown</h2>
      <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-gold/5 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gold/10">
              <DollarSign className="size-4 text-gold" strokeWidth={1.5} />
            </div>
            <p className="font-label text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Estimated Monthly Costs
            </p>
          </div>
          <p className="font-label text-xs text-muted-foreground">
            Down: ${(price * 0.2 / 1000).toFixed(0)}k (20%)
          </p>
        </div>

        {/* Line items */}
        <div className="divide-y divide-border">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                  <row.icon className="size-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.sublabel}</p>
                </div>
              </div>
              <p className="font-heading text-base font-bold">
                ${row.value.toLocaleString()}
                <span className="font-normal text-xs text-muted-foreground">{row.period}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t-2 border-gold/30 bg-gold/5 px-6 py-4">
          <p className="font-label text-sm font-semibold uppercase tracking-wide text-gold">
            Total Est. Monthly
          </p>
          <p className="font-heading text-2xl font-bold text-gold">
            ${totalMonthly.toLocaleString()}
            <span className="font-normal text-sm text-gold/70">/mo</span>
          </p>
        </div>

        {/* Disclaimer */}
        <p className="px-6 py-3 text-xs text-muted-foreground/70 border-t border-border">
          Estimates only. Actual costs vary based on lender, credit score, insurance carrier, and HOA changes. Consult a mortgage professional for accurate figures.
        </p>
      </div>
    </div>
  );
}
