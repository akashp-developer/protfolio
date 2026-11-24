import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { Tags } from "./ui";

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.liveUrl && (
        <a className="text-link" href={project.liveUrl}>
          Live demo <ArrowUpRight size={16} />
        </a>
      )}
      {project.repositoryUrl && (
        <a className="text-link" href={project.repositoryUrl}>
          Source code <ArrowUpRight size={16} />
        </a>
      )}
      {project.sourceDownload && (
        <a className="text-link" href={project.sourceDownload} download>
          Source code <Download size={16} aria-hidden="true" />
        </a>
      )}
    </>
  );
}

export function ProjectCard({ project, number }: { project: Project; number: number }) {
  const url = `/projects/${project.slug}`;
  return (
    <article className="project-card">
      {project.cover && (
        <Link
          className="project-cover"
          href={url}
          aria-label={`Read ${project.title} case study`}
          data-image-reveal
        >
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="(min-width: 1150px) 360px, (min-width: 680px) 45vw, 92vw"
          />
        </Link>
      )}
      <div className="project-content">
        <p className="eyebrow">
          <span className="project-index">{String(number).padStart(2, "0")}</span>{" "}
          {project.category} <span className="project-status">{project.status}</span>
        </p>
        <h3>
          <Link href={url}>{project.title}</Link>
        </h3>
        <p>{project.summary}</p>
        <Tags items={project.technologies.slice(0, 4)} />
        <div className="button-row project-actions">
          <Link className="text-link" href={url}>
            Case study <ArrowUpRight size={17} />
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

export function ProjectGrid({
  projects,
  allProjects = projects,
}: {
  projects: Project[];
  allProjects?: Project[];
}) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          number={allProjects.indexOf(project) + 1}
        />
      ))}
    </div>
  );
}
