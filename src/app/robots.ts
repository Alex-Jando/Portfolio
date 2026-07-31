import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jando.live";

// The staging mirror must never be indexed, or it would compete with
// production in search results.
const isStaging = siteUrl.includes("portfolio.jando.live");

export default function robots(): MetadataRoute.Robots {
  if (isStaging) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
