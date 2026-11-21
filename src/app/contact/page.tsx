import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SocialLinks } from "@/components/layout";
import { PageIntro } from "@/components/ui";
import { portfolio } from "@/data/portfolio";
import { contactConfig } from "@/lib/contact-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Akash P about full-stack development internships and projects.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const profile = portfolio.profile;
  return (
    <>
      <PageIntro
        label="Contact"
        title="Let’s talk."
        description="Get in touch about a full-stack development internship, a project, or a technical conversation."
      />
      <div className="container page-body contact-grid">
        <aside className="contact-info">
          {profile?.availability && (
            <p className="availability">
              <span aria-hidden="true" />
              {profile.availability}
            </p>
          )}
          {profile?.email && (
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          )}
          <SocialLinks />
        </aside>
        <ContactForm enabled={Boolean(contactConfig())} />
      </div>
    </>
  );
}
