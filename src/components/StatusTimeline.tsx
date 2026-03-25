import { CheckCircle2, Circle, Clock } from "lucide-react";

type PropertyStatus = "Active" | "Pending" | "Open House" | "New" | "Coming Soon";

interface PriceHistoryEntry {
  date: string;
  price: number;
  event: string;
}

interface StatusTimelineProps {
  status: PropertyStatus;
  listingDate?: string;
  priceHistory?: PriceHistoryEntry[];
}

interface TimelineStep {
  label: string;
  sublabel?: string;
  date?: string;
  state: "completed" | "current" | "upcoming";
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildTimeline(
  status: PropertyStatus,
  listingDate: string | undefined,
  priceHistory: PriceHistoryEntry[] | undefined
): TimelineStep[] {
  const sorted = [...(priceHistory ?? [])].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstListed = sorted.find((e) => e.event === "Listed") ?? (listingDate ? { date: listingDate, price: 0, event: "Listed" } : null);
  const priceChanges = sorted.filter((e) => e.event === "Price Reduced" || e.event === "Price Increased");
  const pendingEntry = sorted.find((e) => e.event === "Pending" || e.event === "Under Contract");
  const soldEntry = sorted.find((e) => e.event === "Sold");

  const isPending = status === "Pending" || !!pendingEntry;
  const isSold = !!soldEntry;

  const steps: TimelineStep[] = [];

  // Step 1: Listed
  steps.push({
    label: "Listed",
    sublabel: firstListed ? undefined : "Active on market",
    date: firstListed?.date,
    state: "completed",
  });

  // Step 2: Price changes (if any, collapsed to one step)
  if (priceChanges.length > 0) {
    const lastChange = priceChanges[priceChanges.length - 1];
    steps.push({
      label: priceChanges.length === 1 ? "Price Changed" : `${priceChanges.length} Price Changes`,
      sublabel: "Market adjustment",
      date: lastChange.date,
      state: "completed",
    });
  }

  // Step 3: Under Contract / Pending
  if (isSold || isPending) {
    steps.push({
      label: "Under Contract",
      sublabel: "Accepted offer",
      date: pendingEntry?.date,
      state: isSold ? "completed" : "current",
    });
  } else {
    steps.push({
      label: "Under Contract",
      sublabel: "Awaiting offer",
      state: "upcoming",
    });
  }

  // Step 4: Sold / Active
  if (isSold) {
    steps.push({
      label: "Sold",
      sublabel: "Transaction closed",
      date: soldEntry?.date,
      state: "current",
    });
  } else if (!isPending) {
    steps.push({
      label: "Active",
      sublabel: "Available for showing",
      state: "current",
    });
  } else {
    steps.push({
      label: "Sold",
      sublabel: "Awaiting closing",
      state: "upcoming",
    });
  }

  return steps;
}

export default function StatusTimeline({ status, listingDate, priceHistory }: StatusTimelineProps) {
  const steps = buildTimeline(status, listingDate, priceHistory);

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">Listing Status</h2>
      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        <div className="flex items-start justify-between gap-2">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={step.label} className="relative flex flex-1 flex-col items-center">
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={`absolute left-1/2 top-4 h-0.5 w-full translate-x-1/2 ${
                      step.state === "completed" ? "bg-gold/60" : "bg-border"
                    }`}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  {step.state === "completed" ? (
                    <div className="flex size-8 items-center justify-center rounded-full bg-gold text-near-black">
                      <CheckCircle2 className="size-4" strokeWidth={2} />
                    </div>
                  ) : step.state === "current" ? (
                    <div className="flex size-8 items-center justify-center rounded-full border-2 border-gold bg-gold/15">
                      <div className="size-2.5 rounded-full bg-gold" />
                    </div>
                  ) : (
                    <div className="flex size-8 items-center justify-center rounded-full border-2 border-border bg-card">
                      <Circle className="size-4 text-muted-foreground/40" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-semibold leading-tight ${
                      step.state === "upcoming"
                        ? "text-muted-foreground/40"
                        : step.state === "current"
                          ? "text-gold"
                          : "text-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.date ? (
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {formatDate(step.date)}
                    </p>
                  ) : step.sublabel ? (
                    <p className="mt-0.5 text-[10px] text-muted-foreground/60">{step.sublabel}</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
