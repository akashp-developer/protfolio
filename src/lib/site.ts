import { portfolio } from "@/data/portfolio";

export const siteName = portfolio.profile?.name ?? "Developer Portfolio";
export const siteDescription =
  portfolio.profile?.introduction ??
  "An editorial developer portfolio for work, experience, and technical skills.";

function canonicalOrigin() {
  if (!process.env.SITE_URL) return undefined;
  try {
    const url = new URL(process.env.SITE_URL);
    return url.protocol === "https:" || url.protocol === "http:"
      ? new URL(url.origin)
      : undefined;
  } catch {
    return undefined;
  }
}

export const siteOrigin = canonicalOrigin();
export const isPublicPortfolio = Boolean(portfolio.profile && siteOrigin);
