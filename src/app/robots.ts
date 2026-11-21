import type { MetadataRoute } from "next";
import { isPublicPortfolio, siteOrigin } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isPublicPortfolio || !siteOrigin) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", siteOrigin).href,
  };
}
