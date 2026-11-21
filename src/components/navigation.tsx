"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Menu } from "lucide-react";
import { useRef } from "react";
import type { LinkItem } from "@/data/portfolio";

function isActive(href: string, pathname: string) {
  return href === pathname || (href === "/works" && pathname.startsWith("/projects"));
}

function MobileNavigation({ items, pathname }: { items: LinkItem[]; pathname: string }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
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
        <Menu size={20} /> Menu
      </summary>
      <nav aria-label="Mobile navigation">
        <Link
          href="/"
          onClick={() => {
            if (disclosure.current) disclosure.current.open = false;
          }}
        >
          Home
        </Link>
        {items.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href, pathname) ? "page" : undefined}
            onClick={() => {
              if (disclosure.current) disclosure.current.open = false;
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}

export function Navigation({ items }: { items: LinkItem[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <>
      <nav className="desktop-nav" aria-label="Main navigation">
        {items.map(({ href, label }) => {
          const active = isActive(href, pathname);
          return (
            <Link key={href} href={href} aria-current={active ? "page" : undefined}>
              {label}
              {active && (
                <motion.span
                  aria-hidden="true"
                  className="nav-indicator"
                  layoutId={reduce ? undefined : "desktop-nav-indicator"}
                  transition={{ duration: 0.22 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
      <MobileNavigation key={pathname} pathname={pathname} items={items} />
    </>
  );
}
