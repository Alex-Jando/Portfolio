import { collectionItems } from "@/content/collections";
import { projectEntries } from "@/content/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jando.live";

// The feed is derived entirely from build-time content, so prerender it.
export const dynamic = "force-static";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/**
 * RSS 2.0 feed covering field notes and project case studies.
 *
 * The content has no authored publication dates, so entries are emitted in
 * the site's curated order and share the build date. That keeps the feed
 * valid and stable without inventing timestamps.
 */
export async function GET() {
  const buildDate = new Date().toUTCString();

  const noteItems = collectionItems.map((item) => ({
    title: item.title,
    link: `${SITE_URL}/collection#${item.id}`,
    description: `${item.category} - ${item.source}`,
    category: item.section,
  }));

  const projectItems = projectEntries.map((project) => ({
    title: project.title,
    link: `${SITE_URL}/projects/${project.slug}`,
    description: project.description,
    category: project.category,
  }));

  const items = [...projectItems, ...noteItems]
    .map(
      (item) => `    <item>
      <title>${escape(item.title)}</title>
      <link>${escape(item.link)}</link>
      <guid isPermaLink="true">${escape(item.link)}</guid>
      <description>${escape(item.description)}</description>
      <category>${escape(item.category)}</category>
      <pubDate>${buildDate}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alexander Jando</title>
    <link>${SITE_URL}</link>
    <description>Engineering case studies and field notes by Alexander Jando.</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
