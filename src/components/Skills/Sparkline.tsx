'use client';

import React from 'react';

interface SparklineProps {
  data: number[];
  color?: string;
}

export default function Sparkline({ data }: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 110;
  const height = 32;
  const padX = 4;
  const padY = 4;
  const tailLength = 10; // Extra white straight horizontal tail at the end

  const effectiveWidth = width - tailLength;

  // Calculate coordinates for data points
  const points = data.map((val, i) => {
    const x = padX + (i / (data.length - 1)) * (effectiveWidth - 2 * padX);
    const y = (height - padY) - ((val - min) / range) * (height - 2 * padY);
    return { x, y, val };
  });

  // Build directional segments: GREEN for rising, RED for falling, WHITE for flat
  const segments = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    
    const isRising = p2.val > p1.val + 0.5;
    const isFalling = p2.val < p1.val - 0.5;
    const segColor = isRising ? '#00E676' : isFalling ? '#FF3D57' : '#FFFFFF';

    segments.push({
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
      color: segColor,
    });
  }

  // Final straight horizontal segment extending at the tail
  const lastPoint = points[points.length - 1];
  const tailX = Math.min(width - padX, lastPoint.x + tailLength);

  return (
    <div className="w-[110px] h-[32px] flex items-center justify-center shrink-0 pointer-events-none">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Main directional line segments */}
        {segments.map((seg, idx) => (
          <line
            key={idx}
            x1={seg.x1}
            y1={seg.y1}
            x2={seg.x2}
            y2={seg.y2}
            stroke={seg.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Final straight horizontal segment in WHITE */}
        <line
          x1={lastPoint.x}
          y1={lastPoint.y}
          x2={tailX}
          y2={lastPoint.y}
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Terminal dot in WHITE */}
        <circle
          cx={tailX}
          cy={lastPoint.y}
          r="2.5"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}
