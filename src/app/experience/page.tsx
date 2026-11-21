import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { PageIntro, TextLink, Timeline } from "@/components/ui";

export const metadata: Metadata = {
  title: "Experience",
  description: "Akash P’s education and professional timeline.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        label="Experience"
        title="Education & experience."
        accent="experience"
        description="My B.Tech studies and the practical work I build alongside them."
      />
      <section
        className="container page-body recorded-experience"
        aria-label="Education and career timeline"
      >
        <Timeline items={portfolio.timeline} />
        <div className="page-next">
          <TextLink href="/works">See my project experience</TextLink>
        </div>
      </section>
    </>
  );
}
