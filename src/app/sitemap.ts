import type { MetadataRoute } from "next";
import { navigation, portfolio } from "@/data/portfolio";
import { isPublicPortfolio, siteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublicPortfolio || !siteOrigin) return [];
  const routes = [
    "/",
    "/projects",
    ...navigation.map((item) => item.href),
    ...portfolio.projects.map(({ slug }) => `/projects/${slug}`),
  ];
  return routes.map((route) => ({ url: new URL(route, siteOrigin).href }));
}
