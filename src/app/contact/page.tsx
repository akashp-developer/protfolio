import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
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
        title="Let’s start a conversation."
        accent="conversation"
        description="Get in touch about an internship, a project, or a technical conversation."
      />
      <div className="container page-body contact-grid recorded-contact-grid">
        <ContactForm enabled={Boolean(contactConfig())} />
        <aside className="contact-info" aria-label="Contact information">
          {profile?.email && (
            <div>
              <p className="eyebrow">Email</p>
              <a className="contact-email" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
          )}
          {profile?.location && (
            <div>
              <p className="eyebrow">Based in</p>
              <p>{profile.location}</p>
            </div>
          )}
          {profile?.availability && (
            <div>
              <p className="eyebrow">Availability</p>
              <p className="availability">
                <span aria-hidden="true" />
                {profile.availability}
              </p>
            </div>
          )}
          {!!profile?.socials.length && (
            <div>
              <p className="eyebrow">Elsewhere</p>
              {profile.socials.map((social) => (
                <a className="text-link" key={social.href} href={social.href}>
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
