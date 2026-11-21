import Link from "next/link";
import { Asterisk } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container not-found">
      <div className="not-found-orbit" aria-hidden="true">
        <Asterisk size={60} />
      </div>
      <p className="eyebrow">404</p>
      <h1>Page not found.</h1>
      <p>The address may have changed, or the page may have been removed.</p>
      <Link href="/" className="button button-primary">
        Return home
      </Link>
    </section>
  );
}
