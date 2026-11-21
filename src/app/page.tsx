import Link from "next/link";
import { Download, MapPin } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { HeroArt } from "@/components/hero-art";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/layout";
import { Process } from "@/components/process";
import { ProjectGrid } from "@/components/projects";
import { Ticker } from "@/components/ticker";
import {
  BulletList,
  Section,
  ServiceCards,
  SkillCards,
  Tags,
  TextLink,
  Timeline,
} from "@/components/ui";
import { isPublicPortfolio, siteOrigin } from "@/lib/site";
import { contactConfig } from "@/lib/contact-config";

export default function Home() {
  const { profile, services, skills, projects, timeline, principles, strengths } = portfolio;
  const ticker = [...new Set(projects.flatMap((project) => project.technologies))];
  const focus = profile?.focus;
  const person =
    isPublicPortfolio && profile
      ? {
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          url: siteOrigin?.origin,
          sameAs: profile.socials.map((social) => social.href),
          knowsAbout: [...new Set(skills.flatMap((skill) => skill.tools))],
        }
      : null;
  return (
    <>
      {person && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
      )}
      <section className="container hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          {profile?.availability && (
            <p className="availability" data-enter>
              <span aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          <h1 id="hero-title" data-enter>
            {profile?.name ?? "Developer portfolio"}
            <span>.</span>
          </h1>
          {profile?.title && (
            <p className="hero-title" data-enter>
              {profile.title}
            </p>
          )}
          {profile?.introduction && (
            <p className="lede" data-enter>
              {profile.introduction}
            </p>
          )}
          {profile?.location && (
            <p className="location" data-enter>
              <MapPin size={16} />
              {profile.location}
            </p>
          )}
          <div className="button-row" data-enter>
            <Link className="button button-primary" href="#work">
              View my work
            </Link>
            <Link className="button button-outline" href="/contact">
              Contact me
            </Link>
            {profile?.resume && (
              <a className="button button-quiet" href={profile.resume} download>
                <Download size={16} /> Résumé
              </a>
            )}
          </div>
        </div>
        <HeroArt />
      </section>
      <Ticker label="Project technologies" items={ticker} />

      <Section id="about" title="Who I am" side={<TextLink href="/about">About me</TextLink>}>
        <div className="about-split">
          <p className="section-lede">{profile?.summary}</p>
          <dl className="facts">
            {profile?.facts?.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section
        id="services"
        title="What I build"
        side={<TextLink href="/services">Explore services</TextLink>}
      >
        <ServiceCards services={services} />
      </Section>

      <Section id="principles" title="Development philosophy">
        <div className="editorial-grid">
          {principles.map(({ title, description }) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        title="Technology ecosystem"
        side={<TextLink href="/skills">Browse all skills</TextLink>}
      >
        <SkillCards skills={skills} />
        <Ticker
          label="Developer tools"
          items={[
            ...new Set(
              skills
                .filter(({ category }) => category !== "Foundations")
                .flatMap(({ tools }) => tools),
            ),
          ]}
          reverse
        />
      </Section>

      <Section
        id="work"
        title="Selected work"
        side={<TextLink href="/projects">Project archive</TextLink>}
      >
        <ProjectGrid
          projects={projects.filter((project) => project.featured)}
          allProjects={projects}
        />
      </Section>

      <Section
        id="experience"
        title="Education & experience"
        side={<TextLink href="/experience">Full timeline</TextLink>}
      >
        <Timeline items={timeline} />
      </Section>

      <Section id="process" title="How I build products">
        <Process />
      </Section>

      <Section id="focus" title="Current focus">
        {focus && (
          <div className="focus-panel">
            <div>
              <h3>{focus.status}</h3>
              {focus.goals && <BulletList items={focus.goals} />}
            </div>
            <div>
              <h3>Areas I’m exploring</h3>
              <Tags items={[...(focus.exploring ?? []), ...(focus.interests ?? [])]} />
            </div>
          </div>
        )}
      </Section>

      <Section id="strengths" title="What I bring to a team">
        <div className="editorial-grid strengths-grid">
          {strengths.map(({ title, evidence }) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{evidence}</p>
            </article>
          ))}
        </div>
      </Section>

      <section className="contact-banner" id="contact" aria-labelledby="contact-heading">
        <div className="container contact-banner-inner">
          <div>
            <h2 id="contact-heading" data-reveal>
              Let’s talk.
            </h2>
            {profile?.availability && <p className="section-lede">{profile.availability}.</p>}
            <div className="mt-4">
              <SocialLinks />
            </div>
            <TextLink href="/contact">Contact page</TextLink>
          </div>
          <ContactForm enabled={Boolean(contactConfig())} />
        </div>
      </section>
    </>
  );
}
