"use client";

import { useEffect, useState, useCallback } from "react";
import { CalendarDays } from "lucide-react";
import {
  CalendarView,
  type ShowingEvent,
} from "@/components/dashboard/calendar-view";

// ---------------------------------------------------------------------------
// Types for lead data from API
// ---------------------------------------------------------------------------

interface LeadRow {
  id: string;
  type: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  property_id: string | null;
  agent_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CalendarPage() {
  const [events, setEvents] = useState<ShowingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchShowings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/leads?type=showing&limit=200");
      if (!res.ok) throw new Error("Failed to fetch showings");
      const json = await res.json();
      const leads: LeadRow[] = json.data ?? [];

      const showingEvents: ShowingEvent[] = leads.map((lead) => {
        const meta = lead.metadata ?? {};

        // Extract date: prefer metadata.preferredDate, fall back to created_at
        let dateStr: string;
        if (meta.preferredDate && typeof meta.preferredDate === "string") {
          const parsed = new Date(meta.preferredDate as string);
          if (!isNaN(parsed.getTime())) {
            dateStr = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
          } else {
            dateStr = (meta.preferredDate as string).slice(0, 10);
          }
        } else {
          const created = new Date(lead.created_at);
          dateStr = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}-${String(created.getDate()).padStart(2, "0")}`;
        }

        const time =
          meta.preferredTime && typeof meta.preferredTime === "string"
            ? (meta.preferredTime as string)
            : "TBD";

        const propertyAddress =
          meta.propertyAddress && typeof meta.propertyAddress === "string"
            ? (meta.propertyAddress as string)
            : "Not specified";

        const agentName =
          meta.agentName && typeof meta.agentName === "string"
            ? (meta.agentName as string)
            : undefined;

        return {
          id: lead.id,
          leadName: `${lead.first_name} ${lead.last_name}`,
          email: lead.email,
          phone: lead.phone,
          propertyAddress,
          propertyId: lead.property_id ?? undefined,
          agentName,
          date: dateStr,
          time,
          status: lead.status,
        };
      });

      setEvents(showingEvents);
    } catch (err) {
      console.error("Failed to load showings:", err);
      setError("Failed to load showing data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShowings();
  }, [fetchShowings]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        <div className="h-[400px] animate-pulse rounded-xl bg-white/5" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-off-white lg:text-3xl">
          Tour Calendar
        </h1>
        <p className="mt-1 text-sm text-off-white/50">
          Booked property showings from leads
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!error && events.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#1E1E32] px-6 py-16 text-center">
          <CalendarDays className="mx-auto mb-4 h-12 w-12 text-off-white/20" />
          <p className="text-off-white/40">No showings scheduled</p>
          <a
            href="/dashboard/leads"
            className="mt-4 inline-block text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            View all leads &rarr;
          </a>
        </div>
      ) : (
        <CalendarView
          events={events}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
      )}
    </div>
  );
}
