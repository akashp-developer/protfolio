import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { WorksShowcase } from "@/components/works-showcase";
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
        accent="work"
        description="Featured prototypes in digital gold, emergency dispatch, compliance monitoring, and academic planning."
      />
      <section className="container page-body" aria-label="Featured work">
        <WorksShowcase projects={portfolio.projects.filter((project) => project.featured)} />
        <div className="page-next">
          <TextLink href="/projects">Open the project archive</TextLink>
        </div>
      </section>
    </>
  );
}
