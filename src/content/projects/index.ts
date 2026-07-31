import type { ComponentType } from "react";
import type { ProjectData, ProjectEntry } from "@/components/projects/types";

/**
 * Projects are discovered automatically from the `.mdx` files in this folder.
 *
 * To add a project: create `src/content/projects/<slug>.mdx` exporting a
 * `project` object (see `src/components/projects/types.ts`). No edits here.
 *
 * Ordering is controlled by the optional numeric `order` field on each
 * project. Lower numbers appear first; entries without `order` fall to the
 * end and are sorted alphabetically by title for stable output.
 */

type ProjectModule = {
  default: ComponentType;
  project: ProjectData & { order?: number };
};

const context = require.context("./", false, /\.mdx$/);

const loaded: ProjectEntry[] = context
  .keys()
  .map((key: string) => {
    const mod = context(key) as ProjectModule;
    const { project, default: Content } = mod;

    if (!project?.slug) {
      throw new Error(
        `Project MDX "${key}" is missing an exported \`project\` object with a \`slug\`.`,
      );
    }

    return { ...project, Content };
  })
  .sort((a, b) => {
    const orderA = (a as ProjectData & { order?: number }).order ?? Number.MAX_SAFE_INTEGER;
    const orderB = (b as ProjectData & { order?: number }).order ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return a.title.localeCompare(b.title);
  });

const duplicate = loaded.find(
  (entry, index) => loaded.findIndex((other) => other.slug === entry.slug) !== index,
);
if (duplicate) {
  throw new Error(`Duplicate project slug detected: "${duplicate.slug}"`);
}

export const projectEntries = loaded;

export const projectDetails: Record<string, ProjectEntry> = Object.fromEntries(
  loaded.map((entry) => [entry.slug, entry]),
);

export type ProjectSlug = string;

export function getProject(slug: string) {
  return projectDetails[slug];
}

export function requireProject(slug: string) {
  const project = getProject(slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
}
