import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { BulletList, PageIntro, Tags } from "@/components/ui";

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
        title="What I can build with you."
        accent="with you"
        description="From responsive interfaces to APIs and data-backed prototypes."
      />
      <section className="container page-body" aria-label="Development services">
        {portfolio.services.map((service, index) => (
          <article className="recorded-service-row" key={service.title} data-reveal>
            <div>
              <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Tags items={service.technologies} />
            </div>
            <div>
              <h3 className="eyebrow">Capabilities</h3>
              <BulletList items={service.capabilities} />
            </div>
            <div>
              <h3 className="eyebrow">Responsibilities</h3>
              <BulletList items={service.responsibilities} />
            </div>
            <div className="service-responsibilities">
              <div>
                <h3 className="eyebrow">Problems addressed</h3>
                <BulletList items={service.problems} />
              </div>
              {service.approach && (
                <div>
                  <h3 className="eyebrow">Approach</h3>
                  <p>{service.approach}</p>
                </div>
              )}
            </div>
          </article>
        ))}
        <div className="recorded-service-cta">
          <h2>Have something in mind? Let’s talk about it.</h2>
          <div className="button-row">
            <Link className="button button-primary" href="/contact">
              Start a conversation
            </Link>
            <Link className="button button-outline" href="/works">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
