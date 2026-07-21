import NoNotesContent, { project as nonotes } from "./nonotes.mdx";

export const projectDetails = {
  [nonotes.slug]: { ...nonotes, Content: NoNotesContent },
};

export type ProjectSlug = keyof typeof projectDetails;

export function getProject(slug: string) {
  return projectDetails[slug as ProjectSlug];
}
