import Link from "next/link";
import { ArrowUp, ArrowUpRight, Asterisk, Download, Mail } from "lucide-react";
import { navigation, portfolio } from "@/data/portfolio";
import { Navigation } from "./navigation";

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      {portfolio.profile?.initials ?? <Asterisk size={21} />}
    </span>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <Mark />
          <span>{portfolio.profile?.name ?? "Developer Portfolio"}</span>
        </Link>
        <Navigation items={navigation} />
      </div>
    </header>
  );
}

export function SocialLinks() {
  const profile = portfolio.profile;
  return (
    <div className="button-row">
      {profile?.email && (
        <a className="button button-primary" href={`mailto:${profile.email}`}>
          <Mail size={17} /> Email me
        </a>
      )}
      {profile?.socials.map((link) => (
        <a className="button button-outline" key={link.href} href={link.href}>
          <ArrowUpRight size={17} aria-hidden="true" />
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const profile = portfolio.profile;
  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container">
        <div className="footer-grid">
          <Link className="brand" href="/">
            <Mark />
            <span>{profile?.name ?? "Developer Portfolio"}</span>
          </Link>
          <nav aria-label="Footer navigation">
            {[...navigation, { href: "/projects", label: "Project archive" }].map(
              ({ href, label }) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="footer-links">
            {profile?.socials.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            {profile?.resume && (
              <a href={profile.resume} download>
                <Download size={16} /> Résumé PDF
              </a>
            )}
          </div>
        </div>
        <div className="footer-end">
          <span>
            © {new Date().getUTCFullYear()} {profile?.name}
          </span>
          <a href="#top">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
