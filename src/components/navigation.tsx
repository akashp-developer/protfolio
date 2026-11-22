"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { portfolio, type LinkItem } from "@/data/portfolio";

function isActive(href: string, pathname: string) {
  return href === pathname || (href === "/works" && pathname.startsWith("/projects"));
}

function MobileNavigation({ items, pathname }: { items: LinkItem[]; pathname: string }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const profile = portfolio.profile;
  function close() {
    if (disclosure.current) disclosure.current.open = false;
  }
  useEffect(() => {
    const menu = disclosure.current;
    const background = document.querySelectorAll<HTMLElement>("#main, #footer");
    const desktop = window.matchMedia("(min-width: 993px)");
    function lock() {
      for (const element of background) element.inert = Boolean(menu?.open);
    }
    function resize() {
      if (desktop.matches && menu?.open) menu.open = false;
    }
    menu?.addEventListener("toggle", lock);
    desktop.addEventListener("change", resize);
    return () => {
      menu?.removeEventListener("toggle", lock);
      desktop.removeEventListener("change", resize);
      for (const element of background) element.inert = false;
    };
  }, []);
  return (
    <details
      className="mobile-nav"
      ref={disclosure}
      onKeyDown={(event) => {
        if (event.key === "Escape" && disclosure.current?.open) {
          disclosure.current.open = false;
          disclosure.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        <span className="menu-open-label">
          Menu <Menu size={17} aria-hidden="true" />
        </span>
        <span className="menu-close-label">
          Close <X size={17} aria-hidden="true" />
        </span>
      </summary>
      <nav aria-label="Mobile navigation">
        <ol className="mobile-nav-links">
          {[{ href: "/", label: "Home" }, ...items].map(({ href, label }, index) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href, pathname) ? "page" : undefined}
                onClick={close}
              >
                {label}
                <sup aria-hidden="true">{String(index + 1).padStart(2, "0")}</sup>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mobile-socials">
          <p className="eyebrow">Elsewhere</p>
          <div className="button-row">
            {profile?.socials.map(({ href, label }) => (
              <a key={href} href={href} onClick={close}>
                {label}
              </a>
            ))}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} onClick={close}>
                Email
              </a>
            )}
          </div>
        </div>
      </nav>
    </details>
  );
}

function RubberSegment({ items, pathname }: { items: LinkItem[]; pathname: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const gesture = useRef<{ pointerId: number; startX: number; dragging: boolean } | null>(null);
  const suppressClick = useRef(false);
  const currentIndex = items.findIndex(({ href }) => isActive(href, pathname));
  const selectedIndex = dragIndex ?? currentIndex;

  function indexAt(event: PointerEvent<HTMLElement>) {
    const slots = event.currentTarget.querySelectorAll("a");
    return items.findIndex(
      (_, index) => event.clientX < slots[index].getBoundingClientRect().right,
    );
  }

  return (
    <nav
      className="desktop-nav"
      aria-label="Main navigation"
      data-dragging={dragIndex !== null || undefined}
      style={{ "--nav-slots": items.length } as CSSProperties}
      onPointerDown={(event) => {
        suppressClick.current = false;
        if (
          event.pointerType === "mouse" &&
          event.button === 0 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          gesture.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            dragging: false,
          };
        }
      }}
      onPointerMove={(event) => {
        const start = gesture.current;
        if (start?.pointerId !== event.pointerId || !(event.buttons & 1)) return;
        if (!start.dragging) {
          if (Math.abs(event.clientX - start.startX) < 7) return;
          start.dragging = true;
          event.currentTarget.setPointerCapture(event.pointerId);
        }
        const index = indexAt(event);
        setDragIndex(index < 0 ? items.length - 1 : index);
      }}
      onPointerUp={(event) => {
        const start = gesture.current;
        gesture.current = null;
        if (start?.pointerId !== event.pointerId || !start.dragging) return;
        suppressClick.current = true;
        setDragIndex(null);
        const index = indexAt(event);
        const href = items[index < 0 ? items.length - 1 : index].href;
        if (href !== items[currentIndex]?.href) router.push(href);
      }}
      onPointerCancel={() => {
        gesture.current = null;
        setDragIndex(null);
      }}
      onClickCapture={(event) => {
        if (suppressClick.current && event.detail > 0) {
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      <motion.span
        aria-hidden="true"
        className="nav-indicator"
        initial={false}
        animate={{
          x: `${Math.max(selectedIndex, 0) * 100}%`,
          opacity: selectedIndex < 0 ? 0 : 1,
        }}
        transition={
          reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 23, mass: 0.75 }
        }
      >
        <motion.span
          className="nav-indicator-fill"
          initial={false}
          animate={{
            scaleX: !reduce && dragIndex !== null ? 1.14 : 1,
            scaleY: !reduce && dragIndex !== null ? 0.9 : 1,
          }}
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 20 }
          }
        />
      </motion.span>
      {items.map(({ href, label }, index) => (
        <Link
          key={href}
          href={href}
          draggable={false}
          aria-current={index === currentIndex ? "page" : undefined}
          data-selected={index === selectedIndex || undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function Navigation({ items }: { items: LinkItem[] }) {
  const pathname = usePathname();
  return (
    <>
      <RubberSegment items={[{ href: "/", label: "Home" }, ...items]} pathname={pathname} />
      <MobileNavigation key={pathname} pathname={pathname} items={items} />
    </>
  );
}
