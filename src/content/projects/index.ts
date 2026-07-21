import NoNotesContent, { project as nonotes } from "./nonotes.mdx";
import HttpPyServerContent, { project as httpPyServer } from "./http-pyserver.mdx";
import PyRatContent, { project as pyRat } from "./py-rat.mdx";
import FiraRaceCarContent, { project as firaRaceCar } from "./fira-race-car.mdx";

export const projectDetails = {
  [nonotes.slug]: { ...nonotes, Content: NoNotesContent },
  [httpPyServer.slug]: { ...httpPyServer, Content: HttpPyServerContent },
  [pyRat.slug]: { ...pyRat, Content: PyRatContent },
  [firaRaceCar.slug]: { ...firaRaceCar, Content: FiraRaceCarContent },
};

export type ProjectSlug = keyof typeof projectDetails;

export function getProject(slug: string) {
  return projectDetails[slug as ProjectSlug];
}
