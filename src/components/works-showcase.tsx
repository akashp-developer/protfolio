"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { ProjectLinks } from "@/components/projects";
import { Tags, TextLink } from "@/components/ui";

export function WorksShowcase({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("");
  const categories = ["", ...new Set(projects.map((project) => project.category))];
  const visible = category
    ? projects.filter((project) => project.category === category)
    : projects;
  return (
    <>
      <div className="chip-row" role="group" aria-label="Filter works by category">
        {categories.map((value) => (
          <button
            key={value}
            type="button"
            className="chip"
            aria-pressed={value === category}
            onClick={() => setCategory(value)}
          >
            {value || "All"}
          </button>
        ))}
      </div>
      <div className="works-list">
        {visible.map((project) => (
          <article className="works-row" key={project.slug}>
            <span className="eyebrow">
              {String(projects.indexOf(project) + 1).padStart(2, "0")}
            </span>
            <div>
              <h2>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.category}</p>
            </div>
            {project.cover && (
              <div className="works-preview" aria-hidden="true">
                <Image
                  src={project.cover.src}
                  alt=""
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(min-width: 704px) 320px, 88vw"
                />
              </div>
            )}
            <div className="works-meta">
              <p>{project.summary}</p>
              <Tags items={project.technologies} />
              <span className="eyebrow works-status">{project.status}</span>
              <div className="button-row">
                <ProjectLinks project={project} />
                {project.slug === "custom-my-gold" && (
                  <TextLink href={`/projects/${project.slug}`}>Case study</TextLink>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
