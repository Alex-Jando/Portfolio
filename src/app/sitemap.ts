import { MetadataRoute } from "next";
import { projectEntries } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jando.live";
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/projects`,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/resume`,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/collection`,
      priority: 0.6,
    },
  ];

  return [
    ...routes,
    ...projectEntries.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
