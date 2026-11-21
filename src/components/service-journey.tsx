"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { Service } from "@/data/portfolio";
import { BulletList, Tags } from "@/components/ui";

export function ServiceJourney({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const entries = panel.current?.querySelectorAll("[data-service]");
    if (!entries?.length) return;
    const observer = new IntersectionObserver(
      (events) => {
        const visible = events.find((entry) => entry.isIntersecting);
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.service));
      },
      { rootMargin: "-22% 0px -55%" },
    );
    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-journey">
      <div className="service-index">
        <div className="service-index-number" aria-hidden="true">
          <motion.span
            key={active}
            initial={reduce ? false : { opacity: 0.25 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24 }}
          >
            {String(active + 1).padStart(2, "0")}
          </motion.span>
        </div>
        <nav aria-label="Jump to a service">
          {services.map(({ title }, index) => (
            <a
              key={title}
              href={`#service-${index + 1}`}
              aria-current={active === index ? "location" : undefined}
            >
              {title}
            </a>
          ))}
        </nav>
      </div>
      <div ref={panel}>
        {services.map((service, index) => (
          <article
            key={service.title}
            id={`service-${index + 1}`}
            className="journey-service"
            data-service={index}
          >
            <span className="journey-mobile-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <h4 className="eyebrow">What I build</h4>
            <BulletList items={service.capabilities} />
            <details className="journey-detail">
              <summary>
                The technical detail <Plus size={17} aria-hidden="true" />
              </summary>
              <div>
                <p>{service.approach}</p>
                <BulletList items={service.responsibilities} />
                <Tags items={service.technologies} />
              </div>
            </details>
          </article>
        ))}
      </div>
    </div>
  );
}
