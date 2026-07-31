import type { ProjectEntry } from "@/components/projects/types";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jando.live";

const PERSON_ID = `${SITE_URL}/#person`;

/**
 * Structured data (schema.org JSON-LD).
 *
 * Helps search engines understand who the site belongs to and connect the
 * social profiles, which is what powers rich results and knowledge panels.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Alexander Jando",
    url: SITE_URL,
    image: `${SITE_URL}/images/alexander-jando-headshot.webp`,
    jobTitle: "Mechatronics Engineering Student",
    description:
      "Mechatronics engineering student building across hardware and software, from embedded devices and robots to practical developer tools.",
    knowsAbout: [
      "Mechatronics Engineering",
      "Embedded Systems",
      "Robotics",
      "Software Engineering",
      "Accessible Design",
    ],
    sameAs: [
      "https://github.com/Alex-Jando",
      "https://www.linkedin.com/in/alex-jando/",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Alexander Jando",
    description: "The engineering and software portfolio of Alexander Jando.",
    publisher: { "@id": PERSON_ID },
  };
}

/** Absolute social share image URL with the dimensions scrapers expect. */
export function ogImage(name: string) {
  return {
    url: `${SITE_URL}/og/${name}.png`,
    width: 1200,
    height: 630,
    type: "image/png",
  };
}

/**
 * Complete Open Graph + Twitter metadata for a page.
 *
 * Both blocks must be set together: Next.js does not deep-merge the parent
 * layout's `twitter` object, so a page defining only `openGraph` would
 * silently inherit the site-wide Twitter title/description.
 */
export function socialMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  type?: "website" | "article";
  imageAlt?: string;
}) {
  const media = { ...ogImage(image), alt: imageAlt ?? title };
  return {
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: "Alexander Jando",
      images: [media],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [media],
    },
  };
}

/** Rich result data for an individual project case study. */
export function projectSchema(project: ProjectEntry) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    image: `${SITE_URL}${project.image}`,
    about: project.category,
    keywords: project.technologies.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  };
}

/** Breadcrumbs give search results a readable navigation trail. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Renders a JSON-LD script tag. */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
