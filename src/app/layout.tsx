import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./recording.css";
import { Header, Footer } from "@/components/layout";
import { RecordingCursor } from "@/components/recording-cursor";
import { SiteMotion } from "@/components/site-motion";
import { isPublicPortfolio, siteDescription, siteName, siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${siteName} — Developer Portfolio`, template: `%s | ${siteName}` },
  description: siteDescription,
  metadataBase: siteOrigin,
  robots: { index: isPublicPortfolio, follow: isPublicPortfolio },
  openGraph: {
    title: `${siteName} — Developer Portfolio`,
    description: siteDescription,
    type: "website",
    siteName,
    images: siteOrigin
      ? [
          {
            url: new URL("/images/hero-field.webp", siteOrigin),
            width: 1280,
            height: 840,
            alt: "Lavender ribbon on a dark grid",
          },
        ]
      : undefined,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" id="top" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RecordingCursor />
        <SiteMotion />
      </body>
    </html>
  );
}
