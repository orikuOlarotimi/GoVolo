"use client";

import { useEffect, useState } from "react";

type LoadingBarProps = {
  to?: number; // percent the bar fills to
  durationMs?: number; // how long the fill takes
  className?: string;
};

export default function LoadingBar({
  to = 90,
  durationMs = 8000,
  className = "",
}: LoadingBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setWidth(to));
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <div
      role="progressbar"
      aria-busy="true"
      aria-label="Loading"
      className={`h-1 w-full overflow-hidden bg-[rgb(14,168,230)]/15 ${className}`}
    >
      <div
        className="h-full bg-[linear-gradient(90deg,rgb(13,165,231),rgb(33,196,93))]"
        style={{
          width: `${width}%`,
          transition: `width ${durationMs}ms ease-out`,
        }}
      />
    </div>
  );
}
