"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

export function HeroArt() {
  function highlight(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div className="hero-art" aria-hidden="true" onPointerMove={highlight} data-enter>
      <Image
        src="/images/hero-field.webp"
        alt=""
        fill
        preload
        sizes="(min-width: 980px) 52vw, 96vw"
      />
      <span className="hero-corner one" />
      <span className="hero-corner two" />
      <span className="hero-corner three" />
      <span className="hero-corner four" />
    </div>
  );
}
