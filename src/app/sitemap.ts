import { MetadataRoute } from "next";
import { projectEntries } from "@/content/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jando.live";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = (
    [
      { url: siteUrl, priority: 1.0, changeFrequency: "monthly" },
      { url: `${siteUrl}/projects`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${siteUrl}/resume`, priority: 0.8, changeFrequency: "monthly" },
      { url: `${siteUrl}/about`, priority: 0.7, changeFrequency: "yearly" },
      { url: `${siteUrl}/collection`, priority: 0.7, changeFrequency: "monthly" },
      { url: `${siteUrl}/contact`, priority: 0.5, changeFrequency: "yearly" },
    ] as const
  ).map((route) => ({ ...route, lastModified }));

  return [
    ...routes,
    ...projectEntries.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
