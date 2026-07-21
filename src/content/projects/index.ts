import NoNotesContent, { project as nonotes } from "./nonotes.mdx";
import HttpPyServerContent, { project as httpPyServer } from "./http-pyserver.mdx";
import PyRatContent, { project as pyRat } from "./py-rat.mdx";
import FiraRaceCarContent, { project as firaRaceCar } from "./fira-race-car.mdx";
import QArmContent, { project as qArm } from "./q-arm.mdx";
import AccessibleMacroPadContent, { project as accessibleMacroPad } from "./accessible-macro-pad.mdx";

export const projectDetails = {
  [nonotes.slug]: { ...nonotes, Content: NoNotesContent },
  [httpPyServer.slug]: { ...httpPyServer, Content: HttpPyServerContent },
  [pyRat.slug]: { ...pyRat, Content: PyRatContent },
  [firaRaceCar.slug]: { ...firaRaceCar, Content: FiraRaceCarContent },
  [qArm.slug]: { ...qArm, Content: QArmContent },
  [accessibleMacroPad.slug]: { ...accessibleMacroPad, Content: AccessibleMacroPadContent },
};

export type ProjectSlug = keyof typeof projectDetails;

export function getProject(slug: string) {
  return projectDetails[slug as ProjectSlug];
}
