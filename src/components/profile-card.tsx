"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import styles from "./profile-card.module.css";

type ProfileCardProps = {
  name: string;
  title: string;
  avatarUrl: string;
  tiltStrength?: number;
};

export default function ProfileCard({
  name,
  title,
  avatarUrl,
  tiltStrength = 12,
}: ProfileCardProps) {
  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--glare-x", `${x * 100}%`);
    card.style.setProperty("--glare-y", `${y * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * tiltStrength}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * tiltStrength}deg`);
    card.style.setProperty("--portrait-x", `${(x - 0.5) * 16}px`);
    card.style.setProperty("--portrait-y", `${(y - 0.5) * 16}px`);
  }

  return (
    <div className={styles.entrance} data-enter>
      <div className={styles.pointerArea} onPointerMove={trackPointer}>
        <figure className={styles.card}>
          <div className={styles.surface}>
            <Image
              className={styles.portrait}
              src={avatarUrl}
              alt={`Portrait of ${name}`}
              fill
              quality={95}
              loading="eager"
              sizes="(max-width: 44rem) calc(150vw - 3.75rem), (max-width: 48rem) calc(150vw - 7.5rem), (max-width: 90rem) 70vw, 950px"
            />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.name}>{name}</span>
            <span className={styles.role}>{title}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
