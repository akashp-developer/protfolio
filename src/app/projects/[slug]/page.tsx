import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import { ProjectGrid, ProjectLinks } from "@/components/projects";
import { BulletList, PageIntro, Section, Tags, TextLink } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const embeddedDemo = project.embedDemo ? project.liveUrl : undefined;

  const sections = [
    { title: "Problem", text: project.problem },
    { title: "Objectives", items: project.objectives },
    { title: "My contribution", items: project.contributions },
    { title: "Technical architecture", text: project.architecture },
    { title: "Features", items: project.features },
    { title: "Challenges", items: project.challenges },
    { title: "Solutions", items: project.solutions },
    { title: "Results", items: project.results },
  ];
  const related = portfolio.projects.filter((item) =>
    project.relatedSlugs?.includes(item.slug),
  );
  return (
    <>
      <PageIntro
        label={`${project.category} · ${project.status}`}
        title={project.title}
        description={project.summary}
      />
      <div className="container case-body">
        <div className="button-row">
          <TextLink href="/projects">Project archive</TextLink>
          <ProjectLinks project={project} />
        </div>
        {embeddedDemo && (
          <section className="case-demo" aria-labelledby="live-demo-heading">
            <h2 id="live-demo-heading">Interactive demo</h2>
            <p>Explore with sample data. Changes stay in your browser.</p>
            <iframe src={embeddedDemo} title={`${project.title} interactive demo`} />
          </section>
        )}
        {!embeddedDemo && project.cover && (
          <figure className="case-cover">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={project.cover.width}
              height={project.cover.height}
              sizes="(min-width: 1180px) 1140px, 94vw"
              preload
            />
            <figcaption>{project.cover.caption ?? "Concept mockup"}</figcaption>
          </figure>
        )}
        <div className="case-content">
          <div className="case-sections">
            {sections
              .filter((section) => section.text || section.items?.length)
              .map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.text && <p>{section.text}</p>}
                  {section.items && <BulletList items={section.items} />}
                </section>
              ))}
          </div>
          <aside className="case-aside" aria-label="Project information">
            <h2>Technology stack</h2>
            <Tags items={project.technologies} />
          </aside>
        </div>
        {!!project.screenshots?.length && (
          <div className="case-screenshots">
            <h2>Screenshots</h2>
            {project.screenshots.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1180px) 1140px, 94vw"
              />
            ))}
          </div>
        )}
      </div>
      {!!related.length && (
        <Section id="related" title="Related projects">
          <ProjectGrid projects={related} allProjects={portfolio.projects} />
        </Section>
      )}
    </>
  );
}
