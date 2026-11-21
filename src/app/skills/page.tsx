import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { SkillExplorer } from "@/components/filters";
import { PageIntro, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technologies used for frontend, backend, databases, and development workflows.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        label="Skills"
        title="Technical toolkit."
        description="Languages, frameworks, and tools I use for coursework and web prototypes."
      />
      <section className="container page-body" aria-label="Technical skills">
        <SkillExplorer skills={portfolio.skills} />
        <div className="page-next">
          <TextLink href="/works">See the tools in use</TextLink>
        </div>
      </section>
    </>
  );
}
