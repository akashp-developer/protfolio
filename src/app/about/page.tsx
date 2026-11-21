import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { HeroArt } from "@/components/hero-art";
import { SocialLinks } from "@/components/layout";
import { PageIntro, Section, Tags, Timeline } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Akash P, a B.Tech Information Technology student and full-stack developer.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { profile, principles, timeline } = portfolio;
  return (
    <>
      <PageIntro
        label="About"
        title="A developer learning across the stack."
        description={profile?.introduction ?? ""}
      />
      <section
        className="container recorded-about-content"
        aria-label="About my development work"
      >
        <HeroArt />
        <div className="recorded-about-prose">
          <div>
            <h2>Who I am</h2>
            <p>{profile?.summary}</p>
          </div>
          <div>
            <h2>How I approach development</h2>
            <ul className="bullet-list">
              {principles.map(({ title, description }) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </div>
          {profile?.focus && (
            <div>
              <h2>What I enjoy building</h2>
              <Tags
                items={[...(profile.focus.interests ?? []), ...(profile.focus.exploring ?? [])]}
              />
            </div>
          )}
        </div>
      </section>
      <Section id="journey" title="The journey so far.">
        <Timeline items={timeline} expanded />
      </Section>
      <Section id="elsewhere" title="Elsewhere">
        <SocialLinks />
      </Section>
    </>
  );
}
