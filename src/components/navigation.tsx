"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
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

export function Navigation({ items }: { items: LinkItem[] }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <>
      <nav className="desktop-nav" aria-label="Main navigation">
        {[{ href: "/", label: "Home" }, ...items].map(({ href, label }) => {
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
