import { Room } from "@/data/properties";

export default function RoomBreakdown({ rooms }: { rooms: Room[] }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold">Room Breakdown</h2>
      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        {/* Header */}
        <div className="hidden grid-cols-[1fr_100px_120px_2fr] gap-4 border-b border-border bg-card px-5 py-3 sm:grid">
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            Room
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            Size
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            Level
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-gold">
            Description
          </span>
        </div>

        {/* Rows */}
        {rooms.map((room, i) => (
          <div
            key={`${room.name}-${i}`}
            className={`grid grid-cols-1 gap-1 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-[1fr_100px_120px_2fr] sm:items-center sm:gap-4 ${
              i % 2 === 0 ? "bg-background" : "bg-card"
            }`}
          >
            <span className="font-heading text-sm font-semibold text-foreground">
              {room.name}
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="mr-1 text-xs text-gold sm:hidden">Size:</span>
              {room.size}
            </span>
            <span className="text-sm text-muted-foreground">
              <span className="mr-1 text-xs text-gold sm:hidden">Level:</span>
              {room.level}
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {room.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
