import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { ProjectGrid } from "@/components/projects";
import { PageIntro, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Selected work",
  description: "Featured web development prototypes by Akash P.",
  alternates: { canonical: "/works" },
};

export default function WorksPage() {
  return (
    <>
      <PageIntro
        label="Works"
        title="Selected work."
        description="Three prototypes spanning a mobile-first interface, an operations dashboard, and a full-stack application."
      />
      <section className="container page-body" aria-label="Featured work">
        <ProjectGrid
          projects={portfolio.projects.filter((project) => project.featured)}
          allProjects={portfolio.projects}
        />
        <div className="page-next">
          <TextLink href="/projects">Search the project archive</TextLink>
        </div>
      </section>
    </>
  );
}
