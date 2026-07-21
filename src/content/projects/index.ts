import { nonotes } from "./nonotes";

export const projectDetails = {
  [nonotes.slug]: nonotes,
};

export type ProjectSlug = keyof typeof projectDetails;

export function getProject(slug: string) {
  return projectDetails[slug as ProjectSlug];
}
