import NoNotesContent, { project as nonotes } from "./nonotes.mdx";
import HttpPyServerContent, { project as httpPyServer } from "./http-pyserver.mdx";

export const projectDetails = {
  [nonotes.slug]: { ...nonotes, Content: NoNotesContent },
  [httpPyServer.slug]: { ...httpPyServer, Content: HttpPyServerContent },
};

export type ProjectSlug = keyof typeof projectDetails;

export function getProject(slug: string) {
  return projectDetails[slug as ProjectSlug];
}
