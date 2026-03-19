"use client";

import { useState } from "react";

export interface BarChartDataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDataPoint[];
  /** Format function for values */
  formatValue?: (v: number) => string;
  /** Primary bar color (default gold) */
  color?: string;
  /** Bar height per item in px (default 36) */
  barHeight?: number;
}

const GOLD = "#C9A96E";
const MIDNIGHT = "#1A1A2E";
const MUTED = "#6B7280";

export function BarChart({
  data,
  formatValue = (v) => v.toLocaleString(),
  color = GOLD,
  barHeight = 36,
}: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((d) => d.value));
  const labelWidth = 160;
  const valueWidth = 80;
  const chartPaddingRight = 16;
  const viewBoxWidth = 800;
  const barGap = 8;
  const viewBoxHeight = data.length * (barHeight + barGap) + 8;
  const barAreaWidth = viewBoxWidth - labelWidth - valueWidth - chartPaddingRight;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Horizontal bar chart comparing values"
      >
        {data.map((d, i) => {
          const y = i * (barHeight + barGap) + 4;
          const barWidth = (d.value / maxValue) * barAreaWidth;
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={d.label}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: "default" }}
            >
              {/* Label */}
              <text
                x={labelWidth - 12}
                y={y + barHeight / 2 + 4}
                textAnchor="end"
                fill={MIDNIGHT}
                fontSize={13}
                fontWeight={isHovered ? "bold" : "normal"}
                fontFamily="system-ui, sans-serif"
                style={{ transition: "font-weight 0.15s" }}
              >
                {d.label}
              </text>

              {/* Background track */}
              <rect
                x={labelWidth}
                y={y + 2}
                width={barAreaWidth}
                height={barHeight - 4}
                rx={4}
                fill="#F0EDE6"
              />

              {/* Bar */}
              <rect
                x={labelWidth}
                y={y + 2}
                width={barWidth}
                height={barHeight - 4}
                rx={4}
                fill={color}
                opacity={isHovered ? 1 : 0.85}
                style={{ transition: "opacity 0.15s, width 0.3s ease" }}
              />

              {/* Value label */}
              <text
                x={labelWidth + barWidth + 10}
                y={y + barHeight / 2 + 4}
                textAnchor="start"
                fill={isHovered ? MIDNIGHT : MUTED}
                fontSize={12}
                fontWeight={isHovered ? "bold" : "600"}
                fontFamily="system-ui, sans-serif"
              >
                {formatValue(d.value)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
