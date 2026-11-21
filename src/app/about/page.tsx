import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { SocialLinks } from "@/components/layout";
import { BulletList, PageIntro, Section, Tags, Timeline } from "@/components/ui";

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
        title={`I’m ${profile?.name ?? "a developer"}.`}
        description={profile?.summary ?? ""}
      />
      <Section id="journey" title="My journey">
        <Timeline items={timeline} />
      </Section>
      <Section id="working-principles" title="Working principles">
        <div className="editorial-grid">
          {principles.map(({ title, description }) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Section>
      {profile?.focus && (
        <Section id="interests" title="Technical interests">
          {profile.focus.goals && <BulletList items={profile.focus.goals} />}
          <Tags
            items={[...(profile.focus.interests ?? []), ...(profile.focus.exploring ?? [])]}
          />
        </Section>
      )}
      <Section id="elsewhere" title="Elsewhere">
        <SocialLinks />
      </Section>
    </>
  );
}
