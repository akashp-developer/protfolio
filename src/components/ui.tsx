import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Skill, Service, TimelineItem } from "@/data/portfolio";

export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="container page-intro">
      <p className="eyebrow" data-enter>
        {label}
      </p>
      <h1 data-enter>{title}</h1>
      <p className="lede" data-enter>
        {description}
      </p>
    </div>
  );
}

export function Section({
  id,
  title,
  side,
  children,
}: {
  id: string;
  title: string;
  side?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section container" aria-labelledby={`${id}-heading`}>
      <div className="section-heading" data-reveal>
        <h2 id={`${id}-heading`}>{title}</h2>
        {side}
      </div>
      {children}
    </section>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function Tags({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ServiceCards({ services }: { services: Service[] }) {
  return (
    <div className="service-grid">
      {services.map((service) => (
        <details className="disclosure service-card" key={service.title}>
          <summary>
            <span>
              <span className="disclosure-title">{service.title}</span>
              <span className="disclosure-description">{service.description}</span>
            </span>
            <Plus size={19} aria-hidden="true" className="disclosure-icon" />
          </summary>
          <div className="disclosure-body">
            <h3>Capabilities</h3>
            <BulletList items={service.capabilities} />
            <h3>Responsibilities</h3>
            <BulletList items={service.responsibilities} />
            <h3>Problems addressed</h3>
            <BulletList items={service.problems} />
            {service.approach && (
              <>
                <h3>Approach</h3>
                <p>{service.approach}</p>
              </>
            )}
            <Tags items={service.technologies} />
          </div>
        </details>
      ))}
    </div>
  );
}

export function SkillCards({ skills }: { skills: Skill[] }) {
  return (
    <div className="skill-grid">
      {skills.map((skill) => (
        <details className="disclosure" key={skill.name}>
          <summary>
            <span>
              <span className="eyebrow">{skill.category}</span>
              <span className="disclosure-title">{skill.name}</span>
            </span>
            <Plus size={19} aria-hidden="true" className="disclosure-icon" />
          </summary>
          <div className="disclosure-body">
            <p>{skill.description}</p>
            <Tags items={skill.tools} />
          </div>
        </details>
      ))}
    </div>
  );
}

export function Timeline({ items, expanded }: { items: TimelineItem[]; expanded?: boolean }) {
  const groups = [
    { name: "Professional experience", kinds: ["Employment", "Internship"] },
    { name: "Education", kinds: ["Education"] },
    { name: "Certifications and achievements", kinds: ["Certification", "Achievement"] },
  ];
  return (
    <div className="timeline-groups">
      {groups.map(({ name, kinds }) => {
        const entries = items.filter((item) => kinds.includes(item.kind));
        if (!entries.length) return null;
        return (
          <div key={name}>
            <h3>{name}</h3>
            <ol className="timeline">
              {entries.map((item) => (
                <li key={`${item.title}-${item.period}`}>
                  <details className="disclosure" open={expanded}>
                    <summary>
                      <span>
                        <span className="eyebrow">
                          {item.kind} · {item.period}
                        </span>
                        <span className="disclosure-title">{item.title}</span>
                        <span className="disclosure-description">{item.organization}</span>
                      </span>
                      <Plus size={19} aria-hidden="true" className="disclosure-icon" />
                    </summary>
                    <div className="disclosure-body">
                      <BulletList items={item.details} />
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
