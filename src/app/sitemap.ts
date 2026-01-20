import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
      url: "https://jando.live/collections",
      priority: 0.6,
    },
  ];
}
