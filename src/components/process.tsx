"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { stages } from "@/data/portfolio";

export function Process() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  return (
    <div className="process" data-reveal>
      <div className="process-controls" role="group" aria-label="Development stages">
        {stages.map(({ title }, index) => (
          <button
            key={title}
            aria-label={title}
            aria-pressed={active === index}
            aria-controls="process-description"
            onClick={() => setActive(index)}
          >
            <span className="step-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            {title}
            <span className="stage-description">{stages[index].description}</span>
          </button>
        ))}
      </div>
      <div className="process-description" id="process-description" aria-live="polite">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h3>{stages[active].title}</h3>
          <p>{stages[active].description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export function PrintButton() {
  return (
    <button className="button button-outline" type="button" onClick={() => window.print()}>
      Print resume summary
    </button>
  );
}
