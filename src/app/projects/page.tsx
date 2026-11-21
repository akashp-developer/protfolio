import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { ProjectArchive } from "@/components/filters";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Project archive",
  description: "Find projects by category, technology, or keyword.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        label="Projects"
        title="Project archive."
        description="Browse prototypes by their category or the technologies used to build them."
      />
      <section className="container page-body" aria-label="Project search and results">
        <ProjectArchive projects={portfolio.projects} />
      </section>
    </>
  );
}
