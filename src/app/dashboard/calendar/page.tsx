"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadRow } from "@/types/database";

interface ShowingEvent {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string | null;
  time: string | null;
  propertyAddress: string | null;
  agentId: string | null;
  status: string;
  createdAt: string;
}

function parseShowings(leads: LeadRow[]): ShowingEvent[] {
  return leads.map((lead) => {
    const meta = (lead.metadata ?? {}) as Record<string, unknown>;
    return {
      id: lead.id,
      name: `${lead.first_name} ${lead.last_name}`,
      email: lead.email,
      phone: lead.phone,
      date: (meta.preferredDate as string) ?? null,
      time: (meta.preferredTime as string) ?? null,
      propertyAddress: (meta.propertyAddress as string) ?? null,
      agentId: lead.agent_id,
      status: lead.status,
      createdAt: lead.created_at,
    };
  });
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusColors: Record<string, string> = {
  new: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  qualified: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  closed: "bg-white/10 text-white/50 border-white/20",
};

export default function CalendarPage() {
  const [showings, setShowings] = useState<ShowingEvent[]>([]);
  const [agents, setAgents] = useState<{ id: string; full_name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchShowings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads?type=showing&limit=200");
      const data = await res.json();
      setShowings(parseShowings(data.data ?? []));
    } catch {
      setShowings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAgents = useCallback(async () => {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      setAgents(
        (data.data ?? []).map((a: Record<string, unknown>) => ({
          id: a.id as string,
          full_name: a.full_name as string,
        })),
      );
    } catch {
      setAgents([]);
    }
  }, []);

  useEffect(() => {
    fetchShowings();
    fetchAgents();
  }, [fetchShowings, fetchAgents]);

  const agentMap = useMemo(() => new Map(agents.map((a) => [a.id, a.full_name])), [agents]);

  // Group showings by date
  const showingsByDate = useMemo(() => {
    const map = new Map<string, ShowingEvent[]>();
    for (const s of showings) {
      const dateKey = s.date ?? s.createdAt.split("T")[0];
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(s);
    }
    return map;
  }, [showings]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const todayStr = new Date().toISOString().split("T")[0];

  const selectedShowings = selectedDate ? (showingsByDate.get(selectedDate) ?? []) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-off-white">Tour Calendar</h1>
      <p className="mt-1 text-sm text-off-white/50">
        Showing requests from leads
      </p>

      {loading ? (
        <div className="mt-6 h-96 animate-pulse rounded-xl border border-white/10 bg-[#1E1E32]" />
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Calendar grid */}
          <div className="rounded-xl border border-white/10 bg-[#1E1E32] p-4">
            {/* Month navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="rounded p-1.5 text-off-white/60 hover:bg-white/5 hover:text-off-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold text-off-white">
                {MONTHS[month]} {year}
              </h2>
              <button
                onClick={nextMonth}
                className="rounded p-1.5 text-off-white/60 hover:bg-white/5 hover:text-off-white transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-px">
              {DAYS.map((d) => (
                <div key={d} className="py-2 text-center text-xs font-medium text-off-white/40">
                  {d}
                </div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-px">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="aspect-square" />;
                }

                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayShowings = showingsByDate.get(dateStr) ?? [];
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;

                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-start rounded-lg p-1 text-sm transition-colors",
                      isToday && "ring-1 ring-gold/50",
                      isSelected
                        ? "bg-gold/20 text-gold"
                        : "text-off-white/80 hover:bg-white/5",
                    )}
                  >
                    <span className={cn("text-xs", isToday && "font-bold text-gold")}>
                      {day}
                    </span>
                    {dayShowings.length > 0 && (
                      <div className="mt-0.5 flex gap-0.5">
                        {dayShowings.length <= 3 ? (
                          dayShowings.map((_, i) => (
                            <span key={i} className="h-1.5 w-1.5 rounded-full bg-gold" />
                          ))
                        ) : (
                          <>
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                            <span className="text-[9px] text-gold">{dayShowings.length}</span>
                          </>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sidebar: selected date details or all upcoming */}
          <div className="rounded-xl border border-white/10 bg-[#1E1E32] p-4">
            <h3 className="text-sm font-semibold text-off-white">
              {selectedDate
                ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Upcoming Showings"}
            </h3>

            <div className="mt-3 space-y-3">
              {(selectedDate ? selectedShowings : showings.filter((s) => s.status !== "closed").slice(0, 10)).length === 0 ? (
                <p className="text-xs text-off-white/40">No showings found</p>
              ) : (
                (selectedDate ? selectedShowings : showings.filter((s) => s.status !== "closed").slice(0, 10)).map((showing) => (
                  <div
                    key={showing.id}
                    className={cn(
                      "rounded-lg border p-3",
                      statusColors[showing.status] ?? "border-white/10 bg-white/5",
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-off-white">{showing.name}</span>
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-medium",
                        statusColors[showing.status] ?? "bg-white/10 text-white/50",
                      )}>
                        {showing.status}
                      </span>
                    </div>
                    {showing.time && (
                      <div className="mt-1.5 flex items-center gap-1.5 text-xs text-off-white/50">
                        <Clock className="h-3 w-3" />
                        {showing.time}
                      </div>
                    )}
                    {showing.propertyAddress && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-off-white/50">
                        <MapPin className="h-3 w-3" />
                        {showing.propertyAddress}
                      </div>
                    )}
                    {showing.agentId && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-off-white/50">
                        <User className="h-3 w-3" />
                        {agentMap.get(showing.agentId) ?? "Assigned"}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
