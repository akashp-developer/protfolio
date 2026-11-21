"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    async function enhance() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-enter]", {
          y: 16,
          opacity: 0.5,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform,opacity",
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 18,
            opacity: 0.55,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((element) => {
          gsap.from(element, {
            clipPath: "inset(8% 5% 8% 5% round 12px)",
            duration: 0.6,
            clearProps: "clipPath",
            scrollTrigger: { trigger: element, start: "top 93%", once: true },
          });
        });
      });
      cleanup = () => media.revert();
    }
    void enhance().catch(() => undefined);
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);
  return null;
}
