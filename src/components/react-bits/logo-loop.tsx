"use client";

import { memo, type ReactNode } from "react";

// Application adaptation of the React Bits LogoLoop pattern.
// The two identical bands let CSS repeat the same sequence without measuring layout in JavaScript.
type LogoItem = { node: ReactNode };

type LogoLoopProps = {
  logos: LogoItem[];
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  paused?: boolean;
  ariaLabel: string;
};

const LogoLoop = memo(function LogoLoop({
  logos,
  direction = "left",
  pauseOnHover,
  paused,
  ariaLabel,
}: LogoLoopProps) {
  return (
    <div
      className="logo-loop"
      role="region"
      aria-label={ariaLabel}
      data-direction={direction}
      data-paused={paused || undefined}
      data-pause-on-hover={pauseOnHover || undefined}
    >
      <div className="logo-loop-track">
        {[0, 1].map((copy) => (
          <ul className="logo-loop-band" key={copy} aria-hidden={copy === 1 || undefined}>
            {logos.map(({ node }, index) => (
              <li key={index}>{node}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
});

export default LogoLoop;
