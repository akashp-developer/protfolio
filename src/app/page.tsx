import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ChapterRail } from "@/components/chapter-rail";
import { Process } from "@/components/process";
import { ServiceJourney } from "@/components/service-journey";
import { Ticker } from "@/components/ticker";
import { BulletList, Section, SkillCards, Tags, TextLink } from "@/components/ui";
import { isPublicPortfolio, siteOrigin } from "@/lib/site";
import { ContactForm } from "@/components/contact-form";
import { contactConfig } from "@/lib/contact-config";

export default function Home() {
  const { profile, services, skills, projects, timeline, principles, strengths } = portfolio;
  const featured = projects.filter((project) => project.featured);
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
      <ChapterRail />
      <section id="intro" className="recorded-hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-meta" data-enter>
            {profile?.availability && (
              <p className="availability">
                <span aria-hidden="true" />
                {profile.availability}
              </p>
            )}
            {profile?.location && <p className="location">{profile.location}</p>}
          </div>
          <div className="hero-content">
            <h1 id="hero-title" data-enter>
              {profile?.name ?? "Developer portfolio"}
            </h1>
            {profile?.title && (
              <p className="hero-title" data-enter>
                {profile.title}
              </p>
            )}
            <div className="hero-bottom" data-enter>
              <p className="lede">{profile?.introduction}</p>
              <div className="button-row">
                <Link className="button button-primary" href="#work">
                  View my work <ArrowRight size={18} aria-hidden="true" />
                </Link>
                <Link className="button button-outline" href="/contact">
                  Contact me
                </Link>
                {profile?.resume && (
                  <a className="button button-quiet" href={profile.resume} download>
                    Résumé
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        <Ticker label="Project technologies" items={ticker} />
      </section>

      <Section id="about" title="Who I am" label="02 · Who I am" variant="intro-section">
        <p className="intro-statement" data-reveal>
          {profile?.summary}
        </p>
        <dl className="facts">
          {profile?.facts?.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="services" title="Three ways I build for the web." label="03 · What I do">
        <ServiceJourney services={services} />
        <TextLink href="/services">See the services in detail</TextLink>
      </Section>

      <Section
        id="principles"
        title="How I think about building for the web."
        label="04 · Development philosophy"
      >
        <ol className="principle-rows">
          {principles.map(({ title, description }, index) => (
            <li key={title} data-reveal>
              <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="skills"
        title="The tools I reach for, and what they let me build."
        label="05 · Technology ecosystem"
      >
        <div className="ecosystem-tickers">
          <Ticker label="Frontend technologies" items={ticker.slice(0, 8)} />
          <Ticker
            label="Developer tools"
            items={[
              ...new Set(
                skills
                  .filter(({ category }) =>
                    ["Backend", "Tools", "Databases"].includes(category),
                  )
                  .flatMap(({ tools }) => tools),
              ),
            ]}
            reverse
          />
        </div>
        <SkillCards skills={skills} />
        <TextLink href="/skills">Browse all skills</TextLink>
      </Section>

      <Section id="work" title="Featured projects and prototypes." label="06 · Selected work">
        <ol className="home-work-titles">
          {featured.map((project) => (
            <li key={project.slug}>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </li>
          ))}
        </ol>
        <div className="home-work-notes">
          {featured.map((project, index) => (
            <article key={project.slug}>
              <h3 className="eyebrow">
                {String(index + 1).padStart(2, "0")} · {project.category}
              </h3>
              <p>{project.summary}</p>
            </article>
          ))}
        </div>
        <div className="button-row">
          <TextLink href="/works">Explore all works</TextLink>
          <TextLink href="/projects">Browse the project archive</TextLink>
        </div>
      </Section>

      <Section id="experience" title="Learning by building." label="07 · Experience snapshot">
        <ol className="experience-snapshot">
          {timeline.map((item) => (
            <li key={item.title}>
              <p className="eyebrow">{item.period}</p>
              <div>
                <h3>{item.title}</h3>
                <p>{item.organization}</p>
              </div>
              <p>{item.details.join(" ")}</p>
            </li>
          ))}
        </ol>
        <TextLink href="/experience">Read the full timeline</TextLink>
      </Section>

      <Section
        id="process"
        title="A repeatable path from brief to shipped feature."
        label="08 · How I build products"
      >
        <Process />
      </Section>

      {focus && (
        <Section
          id="focus"
          title="Right now: learning across the full stack."
          label="09 · Current focus"
          variant="focus-editorial"
        >
          <p className="section-lede">{focus.status}</p>
          {focus.goals && <BulletList items={focus.goals} />}
          <div className="focus-panel">
            <div>
              <h3>Exploring</h3>
              <Tags items={focus.exploring ?? []} />
            </div>
            <div>
              <h3>Interests</h3>
              <Tags items={focus.interests ?? []} />
            </div>
          </div>
        </Section>
      )}

      <Section id="strengths" title="What you can count on." label="10 · Why work with me">
        <div className="strength-rows">
          {strengths.map(({ title, evidence }, index) => (
            <article key={title} data-reveal>
              <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{evidence}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <section className="contact-banner" id="contact" aria-labelledby="contact-heading">
        <div className="container contact-banner-inner">
          <p className="eyebrow">11 · Let’s talk</p>
          <h2 id="contact-heading" data-reveal>
            <span>Let’s build</span>{" "}
            <span>
              something <em>useful.</em>
            </span>
          </h2>
          {profile?.availability && <p className="section-lede">{profile.availability}.</p>}
          <div className="button-row">
            <Link className="button button-primary" href="/contact">
              Start a conversation <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {profile?.email && (
              <a className="button button-outline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            )}
            {profile?.resume && (
              <a className="button button-quiet" href={profile.resume} download>
                Download résumé <Download size={16} aria-hidden="true" />
              </a>
            )}
          </div>
          <details className="home-contact-form">
            <summary>Send a message here</summary>
            <ContactForm enabled={Boolean(contactConfig())} />
          </details>
        </div>
      </section>
    </>
  );
}
