import Link from "next/link";
import { ArrowUp, ArrowUpRight, Download, Mail } from "lucide-react";
import { navigation, portfolio } from "@/data/portfolio";
import { Navigation } from "./navigation";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
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
    <footer id="footer" className="site-footer" aria-label="Footer">
      <div className="container">
        <div className="footer-main">
          {profile?.email && (
            <a className="footer-email" href={`mailto:${profile.email}`}>
              <span aria-hidden="true">
                <Mail size={17} />
              </span>
              {profile.email}
            </a>
          )}
          <nav className="footer-resources" aria-label="Footer resources">
            {profile?.socials.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            {profile?.resume && (
              <a href={profile.resume} download>
                <Download size={15} aria-hidden="true" /> Resume PDF
              </a>
            )}
            <Link href="/projects">Project archive</Link>
          </nav>
        </div>
        <div className="footer-end">
          <span>
            © {new Date().getUTCFullYear()} {profile?.name}
          </span>
          <a href="#top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
