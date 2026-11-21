import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Skill, TimelineItem } from "@/data/portfolio";

export function PageIntro({
  label,
  title,
  description,
  accent,
}: {
  label: string;
  title: string;
  description: string;
  accent?: string;
}) {
  const accentAt = accent ? title.lastIndexOf(accent) : -1;
  const routeClass = label
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z-]/g, "");
  return (
    <div className={`container page-intro page-intro-${routeClass}`}>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{label}</span>
      </nav>
      <p className="eyebrow" data-enter>
        {label}
      </p>
      <h1 data-enter>
        {accent && accentAt >= 0 ? (
          <>
            {title.slice(0, accentAt)}
            <em>{accent}</em>
            {title.slice(accentAt + accent.length)}
          </>
        ) : (
          title
        )}
      </h1>
      {description && (
        <p className="lede" data-enter>
          {description}
        </p>
      )}
    </div>
  );
}

export function Section({
  id,
  title,
  side,
  children,
  label,
  variant,
}: {
  id: string;
  title: string;
  side?: ReactNode;
  children: ReactNode;
  label?: string;
  variant?: string;
}) {
  return (
    <section
      id={id}
      className={`section container ${variant ?? ""}`}
      aria-labelledby={`${id}-heading`}
    >
      {label && <p className="section-kicker eyebrow">{label}</p>}
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
