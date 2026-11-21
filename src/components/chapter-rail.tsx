"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const chapters = [
  ["intro", "Intro"],
  ["about", "Who I am"],
  ["services", "What I do"],
  ["principles", "Philosophy"],
  ["skills", "Ecosystem"],
  ["work", "Selected work"],
  ["experience", "Experience"],
  ["process", "Process"],
  ["focus", "Current focus"],
  ["strengths", "Why me"],
  ["contact", "Let’s talk"],
  ["footer", "Footer"],
];

export function ChapterRail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = chapters.map(([id]) => document.getElementById(id));
    let frame = 0;
    function measure() {
      frame = 0;
      const readingLine = window.innerHeight * 0.42;
      let current = 0;
      elements.forEach((item, index) => {
        if (item && item.getBoundingClientRect().top <= readingLine) current = index;
      });
      setActive(current);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav className="chapter-rail" aria-label="Homepage chapters">
      {chapters.map(([id, label], index) => (
        <a
          key={id}
          href={`#${id}`}
          title={label}
          aria-label={label}
          aria-current={active === index ? "location" : undefined}
        >
          <span className="chapter-label" aria-hidden="true">
            <span>{String(index + 1).padStart(2, "0")}</span> {label}
          </span>
          <span className="chapter-dot" aria-hidden="true" />
        </a>
      ))}
      <a
        className="chapter-next"
        href={`#${chapters[(active + 1) % chapters.length][0]}`}
        aria-label={active === chapters.length - 1 ? "Back to intro" : "Next chapter"}
      >
        <ChevronDown size={17} aria-hidden="true" />
      </a>
    </nav>
  );
}
