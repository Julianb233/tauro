import Link from "next/link";

interface MlsDisclaimerProps {
  /** Optional agent name for listing courtesy attribution */
  agentName?: string;
  /** Optional MLS number */
  mlsNumber?: string;
  /** Optional listing date for last-updated display */
  listingDate?: string;
  /** Compact variant for tighter spaces */
  compact?: boolean;
}

/**
 * MLS/IDX Attribution & Fair Housing Compliance Disclaimer.
 *
 * Required on all pages that display property listing data per
 * Bright MLS IDX compliance rules and Fair Housing Act.
 */
export function MlsDisclaimer({
  agentName,
  mlsNumber,
  listingDate,
  compact = false,
}: MlsDisclaimerProps) {
  return (
    <div className={compact ? "rounded-lg border border-border/50 bg-muted/30 p-3" : "rounded-lg border border-border/50 bg-muted/30 p-4 sm:p-5"}>
      <div className="flex items-start gap-3">
        <Link href="/fair-housing" className="shrink-0" aria-label="Equal Housing Opportunity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={compact ? "mt-0.5 h-6 w-6" : "mt-0.5 h-8 w-8"}
            aria-hidden="true"
            role="img"
          >
            <rect width="48" height="48" rx="4" fill="#1a1a1a" />
            <path d="M24 8L8 20h4v16h24V20h4L24 8z" fill="none" stroke="#fff" strokeWidth="1.5" />
            <rect x="16" y="24" width="16" height="2" fill="#fff" />
            <rect x="16" y="28" width="16" height="2" fill="#fff" />
            <rect x="16" y="32" width="16" height="2" fill="#fff" />
            <text x="24" y="22" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="bold" fontFamily="sans-serif">EQUAL</text>
          </svg>
        </Link>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground/80">Listing data provided by Bright MLS.</span>{" "}
            Information is deemed reliable but not guaranteed. All measurements are approximate.
            Data is provided exclusively for consumers&apos; personal, non-commercial use and may not
            be used for any purpose other than to identify prospective properties consumers may be
            interested in purchasing.
          </p>
          {!compact && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              Copyright &copy; {new Date().getFullYear()} Bright MLS, Inc. All rights reserved.
              {agentName && <> Listing courtesy of {agentName}, Tauro Realty.</>}
              {mlsNumber && <> MLS# {mlsNumber}.</>}
              {listingDate && (
                <> Last updated: {new Date(listingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.</>
              )}
              {" "}IDX information is provided exclusively for personal, non-commercial use.
              REALTOR<sup>&reg;</sup> is a federally registered mark of the National Association
              of REALTORS<sup>&reg;</sup>.
            </p>
          )}
          <p className="text-[10px] leading-relaxed text-muted-foreground/70">
            <Link href="/fair-housing" className="underline hover:text-gold">Equal Housing Opportunity</Link>.
            Tauro Realty does not discriminate on the basis of race, color,
            religion, sex, handicap, familial status, national origin, sexual orientation, gender
            identity, or any other protected class.
          </p>
        </div>
      </div>
    </div>
  );
}
