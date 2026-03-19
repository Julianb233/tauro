"use client";

import { useState, useMemo } from "react";

export interface LineChartDataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartDataPoint[];
  /** Format function for Y-axis and tooltip values */
  formatValue?: (v: number) => string;
  /** Chart height in px (default 320) */
  height?: number;
  /** Primary line color (default gold) */
  color?: string;
}

const GOLD = "#C9A96E";
const MIDNIGHT = "#1A1A2E";
const MUTED = "#6B7280";

export function LineChart({
  data,
  formatValue = (v) => v.toLocaleString(),
  height = 320,
  color = GOLD,
}: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Layout constants
  const paddingLeft = 64;
  const paddingRight = 24;
  const paddingTop = 24;
  const paddingBottom = 48;

  const { minVal, maxVal, yTicks, points, pathD, areaD } = useMemo(() => {
    const values = data.map((d) => d.value);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    // Add 5% padding to Y range
    const range = rawMax - rawMin || 1;
    const min = rawMin - range * 0.05;
    const max = rawMax + range * 0.05;

    // Generate ~5 Y-axis ticks
    const step = range / 4;
    const ticks: number[] = [];
    for (let i = 0; i <= 4; i++) {
      ticks.push(rawMin + step * i);
    }

    return {
      minVal: min,
      maxVal: max,
      yTicks: ticks,
      points: data.map((d, i) => ({
        x: paddingLeft + (i / (data.length - 1)) * (100 - ((paddingLeft + paddingRight) / 100) * 100),
        y: 0, // computed in SVG coordinates below
      })),
      pathD: "",
      areaD: "",
    };
  }, [data]);

  // We need actual SVG viewBox width to compute coordinates
  const viewBoxWidth = 800;
  const viewBoxHeight = height;
  const chartWidth = viewBoxWidth - paddingLeft - paddingRight;
  const chartHeight = viewBoxHeight - paddingTop - paddingBottom;

  const computedPoints = data.map((d, i) => ({
    x: paddingLeft + (i / Math.max(data.length - 1, 1)) * chartWidth,
    y: paddingTop + chartHeight - ((d.value - minVal) / (maxVal - minVal)) * chartHeight,
  }));

  const linePath = computedPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath =
    linePath +
    ` L ${computedPoints[computedPoints.length - 1].x} ${paddingTop + chartHeight}` +
    ` L ${computedPoints[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Line chart showing trend over time"
      >
        {/* Grid lines */}
        {yTicks.map((tick) => {
          const y =
            paddingTop +
            chartHeight -
            ((tick - minVal) / (maxVal - minVal)) * chartHeight;
          return (
            <g key={tick}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={viewBoxWidth - paddingRight}
                y2={y}
                stroke="#E8E4DC"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 4}
                textAnchor="end"
                fill={MUTED}
                fontSize={11}
                fontFamily="system-ui, sans-serif"
              >
                {formatValue(tick)}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#areaGrad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points and X-axis labels */}
        {computedPoints.map((p, i) => {
          const isHovered = hoveredIndex === i;
          // Show every other label on smaller datasets, every 3rd for larger
          const showLabel = data.length <= 8 || i % Math.ceil(data.length / 8) === 0 || i === data.length - 1;

          return (
            <g key={i}>
              {/* Invisible wider hit area */}
              <rect
                x={p.x - (chartWidth / data.length) / 2}
                y={paddingTop}
                width={chartWidth / data.length}
                height={chartHeight}
                fill="transparent"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: "crosshair" }}
              />

              {/* Dot */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 5 : 3}
                fill={isHovered ? color : "white"}
                stroke={color}
                strokeWidth={2}
                style={{ transition: "r 0.15s ease" }}
              />

              {/* X-axis label */}
              {showLabel && (
                <text
                  x={p.x}
                  y={viewBoxHeight - 8}
                  textAnchor="middle"
                  fill={MUTED}
                  fontSize={10}
                  fontFamily="system-ui, sans-serif"
                >
                  {data[i].label}
                </text>
              )}

              {/* Tooltip */}
              {isHovered && (
                <g>
                  {/* Vertical guide line */}
                  <line
                    x1={p.x}
                    y1={paddingTop}
                    x2={p.x}
                    y2={paddingTop + chartHeight}
                    stroke={color}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  {/* Tooltip background */}
                  <rect
                    x={p.x - 52}
                    y={p.y - 38}
                    width={104}
                    height={28}
                    rx={6}
                    fill={MIDNIGHT}
                    opacity={0.95}
                  />
                  {/* Tooltip text */}
                  <text
                    x={p.x}
                    y={p.y - 20}
                    textAnchor="middle"
                    fill="white"
                    fontSize={12}
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                  >
                    {formatValue(data[i].value)}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
