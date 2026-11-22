import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { PrintButton } from "@/components/process";
import { PageIntro, Tags, Timeline } from "@/components/ui";

export const metadata: Metadata = {
  title: "Resume",
  description: "View or download Akash P’s resume.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  const { profile, timeline, skills, projects } = portfolio;
  return (
    <>
      <PageIntro label="Resume" title="The digital resume." description="" />
      <div className="container page-body resume-page">
        <div className="button-row resume-actions">
          {profile?.resume && (
            <>
              <a className="button button-primary" href={profile.resume} download>
                <Download size={17} /> Download PDF
              </a>
              <a className="button button-outline" href={profile.resume}>
                Open PDF
              </a>
            </>
          )}
          <PrintButton />
        </div>
        <div className="resume-sheet">
          {profile && (
            <header className="resume-identity">
              <div>
                <h2>{profile.name}</h2>
                <p>{profile.title}</p>
                <p>{profile.location}</p>
                {profile.email && <a href={`mailto:${profile.email}`}>{profile.email}</a>}
              </div>
              <span className="brand-mark" aria-hidden="true">
                {profile.initials}
              </span>
            </header>
          )}
          <article className="resume-summary">
            <h2>Professional summary</h2>
            <p>{profile?.introduction}</p>
            <h2>Education &amp; experience</h2>
            <Timeline items={timeline} expanded />
            <h2>Skills</h2>
            {skills.map(({ name, tools }) => (
              <div key={name}>
                <h3>{name}</h3>
                <Tags items={tools} />
              </div>
            ))}
            <h2>Projects</h2>
            {projects.map((project) => (
              <div key={project.slug}>
                <h3>
                  <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                </h3>
                <p>{project.summary}</p>
              </div>
            ))}
          </article>
        </div>
        {profile?.resume && (
          <details className="resume-pdf">
            <summary>Preview the original PDF</summary>
            <iframe
              className="resume-viewer"
              title={`${profile.name} resume PDF`}
              src={profile.resume}
              loading="lazy"
            />
          </details>
        )}
      </div>
    </>
  );
}
