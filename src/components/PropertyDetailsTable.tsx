"use client";

import type { Property } from "@/data/properties";

interface Props {
  property: Property;
}

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex flex-col border-b border-border py-2 sm:flex-row sm:items-baseline sm:gap-4">
      <dt className="min-w-[160px] text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

export default function PropertyDetailsTable({ property }: Props) {
  const pricePerSqft = Math.round(property.price / property.sqft);
  const monthlyPayment = Math.round(
    (property.price * 0.8 * 0.065) / 12 /
      (1 - Math.pow(1 + 0.065 / 12, -360)) +
      property.tax_annual / 12 +
      (property.has_hoa && property.hoa_fee ? property.hoa_fee : 0)
  );

  return (
    <section className="mt-6">
      <h2 className="font-heading text-xl font-bold">Property Details</h2>

      {/* Overview */}
      <div className="mt-4">
        <h3 className="mb-2 flex items-center gap-2 font-heading text-base font-semibold text-gold">
          Overview
        </h3>
        <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-8">
          <DetailRow label="Property Type" value={property.propertyType} />
          {property.yearBuilt > 0 && (
            <DetailRow label="Year Built" value={property.yearBuilt} />
          )}
          {property.stories && (
            <DetailRow label="Stories" value={property.stories} />
          )}
          {property.lotSqft > 0 && (
            <DetailRow
              label="Lot Size"
              value={`${property.lotSqft.toLocaleString()} SF`}
            />
          )}
          <DetailRow label="Status" value={property.status} />
          {property.mlsNumber && (
            <DetailRow label="MLS #" value={property.mlsNumber} />
          )}
        </dl>
      </div>

      {/* Interior */}
      <div className="mt-6">
        <h3 className="mb-2 flex items-center gap-2 font-heading text-base font-semibold text-gold">
          Interior
        </h3>
        <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-8">
          <DetailRow label="Bedrooms" value={property.beds} />
          <DetailRow label="Bathrooms" value={property.baths} />
          <DetailRow
            label="Living Area"
            value={`${property.sqft.toLocaleString()} SF`}
          />
          {property.flooring && property.flooring.length > 0 && (
            <DetailRow label="Flooring" value={property.flooring.join(", ")} />
          )}
          {property.heating && (
            <DetailRow label="Heating" value={property.heating} />
          )}
          {property.cooling && (
            <DetailRow label="Cooling" value={property.cooling} />
          )}
        </dl>

        {/* Rooms sub-table */}
        {property.rooms && property.rooms.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold text-muted-foreground">
              Room Details
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground">
                      Room
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground">
                      Size
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground">
                      Level
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {property.rooms.map((room, i) => (
                    <tr key={i} className="bg-background">
                      <td className="px-4 py-2 font-medium">{room.name}</td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {room.size ?? "—"}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        {room.level ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Financial */}
      <div className="mt-6">
        <h3 className="mb-2 flex items-center gap-2 font-heading text-base font-semibold text-gold">
          Financial
        </h3>
        <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-8">
          <DetailRow
            label="List Price"
            value={`$${property.price.toLocaleString()}`}
          />
          <DetailRow
            label="Price / SF"
            value={`$${pricePerSqft.toLocaleString()}`}
          />
          {property.tax_annual > 0 && (
            <DetailRow
              label={`Annual Taxes (${property.tax_year})`}
              value={`$${property.tax_annual.toLocaleString()}`}
            />
          )}
          {property.has_hoa && property.hoa_fee && (
            <DetailRow
              label="HOA Fee"
              value={`$${property.hoa_fee.toLocaleString()}/${
                property.hoa_frequency === "quarterly"
                  ? "qtr"
                  : property.hoa_frequency === "annual"
                  ? "yr"
                  : "mo"
              }`}
            />
          )}
          <DetailRow
            label="Est. Monthly Payment"
            value={`$${monthlyPayment.toLocaleString()}/mo${
              property.has_hoa ? " (incl. taxes & HOA)" : " (incl. taxes)"
            }`}
          />
        </dl>
      </div>

      {/* Construction & Parking */}
      <div className="mt-6">
        <h3 className="mb-2 flex items-center gap-2 font-heading text-base font-semibold text-gold">
          Construction &amp; Parking
        </h3>
        <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-8">
          {property.construction && (
            <DetailRow label="Construction" value={property.construction} />
          )}
          {property.roofType && (
            <DetailRow label="Roof" value={property.roofType} />
          )}
          {property.garage && (
            <DetailRow label="Garage" value={property.garage} />
          )}
          {property.parkingSpaces !== undefined && (
            <DetailRow label="Parking Spaces" value={property.parkingSpaces} />
          )}
        </dl>
      </div>
    </section>
  );
}
