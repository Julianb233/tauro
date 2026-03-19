"use client";

import { useState } from "react";
import type { PropertyRow } from "@/types/database";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["Active", "Pending", "Sold", "Open House", "New"] as const;

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Sold: "bg-red-500/20 text-red-400",
  "Open House": "bg-blue-500/20 text-blue-400",
  New: "bg-purple-500/20 text-purple-400",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

interface PropertyTableProps {
  properties: PropertyRow[];
  onEdit: (property: PropertyRow) => void;
  onDelete: (slug: string) => void;
  onStatusChange: (slug: string, status: string) => void;
}

export function PropertyTable({
  properties,
  onEdit,
  onDelete,
  onStatusChange,
}: PropertyTableProps) {
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E1E32]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-off-white/50">
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Address</th>
            <th className="hidden px-4 py-3 md:table-cell">Price</th>
            <th className="hidden px-4 py-3 lg:table-cell">Beds/Baths</th>
            <th className="px-4 py-3">Status</th>
            <th className="hidden px-4 py-3 lg:table-cell">Type</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {properties.map((prop) => (
            <tr
              key={prop.id}
              className="transition-colors hover:bg-white/[0.03]"
            >
              {/* Thumbnail */}
              <td className="px-4 py-3">
                {prop.images && prop.images.length > 0 ? (
                  <img
                    src={prop.images[0]}
                    alt={prop.address}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/5 text-xs text-off-white/30">
                    No img
                  </div>
                )}
              </td>

              {/* Address */}
              <td className="px-4 py-3">
                <div className="font-medium text-off-white">{prop.address}</div>
                <div className="text-xs text-off-white/40">
                  {prop.city}, {prop.state} {prop.zip}
                </div>
                {/* Show price on mobile */}
                <div className="mt-1 text-xs font-medium text-gold md:hidden">
                  {formatPrice(prop.price)}
                </div>
              </td>

              {/* Price */}
              <td className="hidden px-4 py-3 font-medium text-gold md:table-cell">
                {formatPrice(prop.price)}
              </td>

              {/* Beds/Baths */}
              <td className="hidden px-4 py-3 text-off-white/70 lg:table-cell">
                {prop.beds} bd / {prop.baths} ba
              </td>

              {/* Status badge with dropdown */}
              <td className="relative px-4 py-3">
                <button
                  onClick={() =>
                    setStatusDropdownOpen(
                      statusDropdownOpen === prop.slug ? null : prop.slug,
                    )
                  }
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider transition-opacity hover:opacity-80",
                    statusColors[prop.status] ?? "bg-white/10 text-off-white/60",
                  )}
                >
                  {prop.status}
                  <ChevronDown className="h-3 w-3" />
                </button>

                {statusDropdownOpen === prop.slug && (
                  <div className="absolute left-4 top-full z-20 mt-1 w-36 rounded-lg border border-white/10 bg-[#111111] py-1 shadow-xl">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          onStatusChange(prop.slug, s);
                          setStatusDropdownOpen(null);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-1.5 text-xs transition-colors hover:bg-white/5",
                          s === prop.status
                            ? "text-gold font-medium"
                            : "text-off-white/70",
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 rounded-full",
                            statusColors[s]?.split(" ")[0] ?? "bg-white/10",
                          )}
                        />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </td>

              {/* Type */}
              <td className="hidden px-4 py-3 text-off-white/50 lg:table-cell">
                {prop.property_type}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                {confirmDelete === prop.slug ? (
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-red-400">Delete?</span>
                    <button
                      onClick={() => {
                        onDelete(prop.slug);
                        setConfirmDelete(null);
                      }}
                      className="font-medium text-red-400 hover:text-red-300"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="text-off-white/50 hover:text-off-white"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(prop)}
                      className="rounded p-1.5 text-off-white/50 transition-colors hover:bg-white/5 hover:text-gold"
                      aria-label={`Edit ${prop.address}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(prop.slug)}
                      className="rounded p-1.5 text-off-white/50 transition-colors hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Delete ${prop.address}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
