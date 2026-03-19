"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ShowingEvent {
  id: string;
  leadName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyId?: string;
  agentName?: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM" or "TBD"
  status: string;
}

interface CalendarViewProps {
  events: ShowingEvent[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function dateToStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_COLORS: Record<string, string> = {
  new: "border-l-gold",
  contacted: "border-l-blue-400",
  qualified: "border-l-emerald-400",
  closed: "border-l-white/20",
};

const STATUS_DOTS: Record<string, string> = {
  new: "bg-gold",
  contacted: "bg-blue-400",
  qualified: "bg-emerald-400",
  closed: "bg-white/20",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function CalendarView({
  events,
  currentDate,
  onDateChange,
}: CalendarViewProps) {
  const today = useMemo(() => new Date(), []);

  // Build the calendar grid cells for the month
  const calendarDays = useMemo(() => {
    const first = startOfMonth(currentDate);
    const last = endOfMonth(currentDate);

    const leadingBlanks = first.getDay();
    const trailingBlanks = 6 - last.getDay();

    const days: (Date | null)[] = [];

    for (let i = 0; i < leadingBlanks; i++) days.push(null);
    for (let d = 1; d <= last.getDate(); d++) {
      days.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), d),
      );
    }
    for (let i = 0; i < trailingBlanks; i++) days.push(null);

    return days;
  }, [currentDate]);

  // Group events by date string
  const eventsByDate = useMemo(() => {
    const map = new Map<string, ShowingEvent[]>();
    for (const ev of events) {
      const key = ev.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [events]);

  // Selected day for detail view
  const selectedDateStr = dateToStr(currentDate);
  const selectedDayEvents = eventsByDate.get(selectedDateStr) ?? [];

  function prevMonth() {
    onDateChange(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  }

  function nextMonth() {
    onDateChange(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  }

  function goToday() {
    onDateChange(new Date());
  }

  function selectDay(day: Date) {
    onDateChange(day);
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="rounded-lg border border-white/10 p-2 text-off-white/60 hover:bg-white/5 hover:text-off-white transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="min-w-[180px] text-center text-lg font-semibold text-off-white">
            {formatMonthYear(currentDate)}
          </h2>
          <button
            onClick={nextMonth}
            className="rounded-lg border border-white/10 p-2 text-off-white/60 hover:bg-white/5 hover:text-off-white transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={goToday}
          className="rounded-lg border border-gold/30 px-4 py-2 text-sm font-medium text-gold hover:bg-gold/10 transition-colors"
        >
          Today
        </button>
      </div>

      {/* Calendar grid */}
      <div className="rounded-xl border border-white/10 bg-[#1E1E32] overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 border-b border-white/5">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="px-2 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-off-white/40"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, idx) => {
            if (!day) {
              return (
                <div
                  key={`blank-${idx}`}
                  className="min-h-[80px] border-b border-r border-white/5 bg-[#171728] sm:min-h-[100px]"
                />
              );
            }

            const dayStr = dateToStr(day);
            const dayEvents = eventsByDate.get(dayStr) ?? [];
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, currentDate);

            return (
              <button
                key={dayStr}
                onClick={() => selectDay(day)}
                className={`relative min-h-[80px] border-b border-r border-white/5 p-1.5 text-left transition-colors hover:bg-white/5 sm:min-h-[100px] sm:p-2 ${
                  isSelected ? "bg-gold/5 ring-1 ring-inset ring-gold/30" : ""
                } ${isToday ? "border-t-2 border-t-gold" : ""}`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                    isToday
                      ? "bg-gold text-near-black font-bold"
                      : "text-off-white/70"
                  }`}
                >
                  {day.getDate()}
                </span>

                {/* Event indicators */}
                {dayEvents.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {dayEvents.length <= 2 ? (
                      dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className={`truncate rounded border-l-2 bg-white/5 px-1.5 py-0.5 text-[10px] text-off-white/60 ${STATUS_COLORS[ev.status] ?? "border-l-white/20"}`}
                        >
                          <span className="hidden sm:inline">
                            {ev.time !== "TBD" ? ev.time + " " : ""}
                          </span>
                          {ev.leadName}
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-1 px-1">
                        <div className="flex -space-x-0.5">
                          {dayEvents.slice(0, 3).map((ev) => (
                            <span
                              key={ev.id}
                              className={`inline-block h-2 w-2 rounded-full ${STATUS_DOTS[ev.status] ?? "bg-white/20"}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-off-white/40">
                          {dayEvents.length} showings
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day detail */}
      <div className="rounded-xl border border-white/10 bg-[#1E1E32]">
        <div className="border-b border-white/5 px-5 py-4">
          <h3 className="font-heading text-lg font-semibold text-off-white">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
          <p className="mt-0.5 text-xs text-off-white/40">
            {selectedDayEvents.length} showing
            {selectedDayEvents.length !== 1 ? "s" : ""} scheduled
          </p>
        </div>

        {selectedDayEvents.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-off-white/40">
            No showings scheduled for this day.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {selectedDayEvents
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((ev) => (
                <div key={ev.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block h-2.5 w-2.5 rounded-full ${STATUS_DOTS[ev.status] ?? "bg-white/20"}`}
                        />
                        <span className="font-semibold text-off-white">
                          {ev.time !== "TBD" ? ev.time : "Time TBD"}
                        </span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-off-white/40">
                          {ev.status}
                        </span>
                      </div>
                      <p className="text-sm text-off-white/70">
                        <span className="text-off-white">{ev.leadName}</span>
                        {ev.propertyAddress && (
                          <>
                            {" "}
                            &mdash;{" "}
                            <span className="text-off-white/50">
                              {ev.propertyAddress}
                            </span>
                          </>
                        )}
                      </p>
                      {ev.agentName && (
                        <p className="text-xs text-off-white/40">
                          Agent: {ev.agentName}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right text-xs text-off-white/40">
                      {ev.email && <p>{ev.email}</p>}
                      {ev.phone && <p>{ev.phone}</p>}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
