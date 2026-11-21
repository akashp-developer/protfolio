import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { PageIntro, ServiceCards, TextLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Services",
  description: "Responsive frontend, full-stack prototyping, and backend API integration.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        label="Services"
        title="What I build."
        description="From responsive interfaces to APIs and data-backed prototypes."
      />
      <section className="container page-body" aria-label="Development services">
        <ServiceCards services={portfolio.services} />
        <div className="page-next">
          <TextLink href="/contact">Discuss a project or internship</TextLink>
        </div>
      </section>
    </>
  );
}
