import { MetadataRoute } from "next";
import { projectEntries } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: "https://jando.live",
      priority: 1.0,
    },
    {
      url: "https://jando.live/about",
      priority: 0.6,
    },
    {
      url: "https://jando.live/projects",
      priority: 0.8,
    },
    {
      url: "https://jando.live/resume",
      priority: 0.9,
    },
    {
      url: "https://jando.live/contact",
      priority: 1.0,
    },
    {
      url: "https://jando.live/collection",
      priority: 0.6,
    },
  ];

  return [
    ...routes,
    ...projectEntries.map((project) => ({
      url: `https://jando.live/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
