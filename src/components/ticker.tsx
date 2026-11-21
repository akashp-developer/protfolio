"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import LogoLoop from "./react-bits/logo-loop";

export function Ticker({
  label,
  items,
  reverse,
}: {
  label: string;
  items: string[];
  reverse?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  if (!items.length) return null;
  return (
    <div className="ticker">
      <div className="ticker-track">
        <LogoLoop
          logos={items.map((item) => ({ node: <span className="ticker-item">{item}</span> }))}
          ariaLabel={label}
          direction={reverse ? "right" : "left"}
          speed={paused ? 0 : 28}
          gap={36}
          logoHeight={23}
          pauseOnHover
        />
      </div>
      <button
        type="button"
        onClick={() => setPaused(!paused)}
        className="ticker-button"
        aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      >
        {paused ? <Play size={16} /> : <Pause size={16} />}
      </button>
    </div>
  );
}
