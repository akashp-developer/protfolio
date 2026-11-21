"use client";

import { useEffect, useRef } from "react";

export function RecordingCursor() {
  const cursor = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const target = cursor.current;
    const media = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    function position(event: PointerEvent) {
      if (!target || !media.matches || event.pointerType !== "mouse") return;
      target.style.setProperty("--cursor-x", `${event.clientX}px`);
      target.style.setProperty("--cursor-y", `${event.clientY}px`);
      target.dataset.visible = "true";
    }
    function hide() {
      if (target) delete target.dataset.visible;
    }
    window.addEventListener("pointermove", position, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", position);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <span ref={cursor} className="recording-cursor" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
