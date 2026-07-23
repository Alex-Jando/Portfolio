import NoNotesContent, { project as nonotes } from "./nonotes.mdx";
import HttpPyServerContent, { project as httpPyServer } from "./http-pyserver.mdx";
import PyRatContent, { project as pyRat } from "./py-rat.mdx";
import FiraRaceCarContent, { project as firaRaceCar } from "./fira-race-car.mdx";
import QArmContent, { project as qArm } from "./q-arm.mdx";
import AccessibleMacroPadContent, { project as accessibleMacroPad } from "./accessible-macro-pad.mdx";
import SkydleContent, { project as skydle } from "./skydle.mdx";
import AiShortStoryContent, { project as aiShortStory } from "./ai-short-story-video-maker.mdx";
import MyPlateContent, { project as myPlate } from "./myplate.mdx";
import PortfolioContent, { project as portfolio } from "./portfolio.mdx";

export const projectDetails = {
  [nonotes.slug]: { ...nonotes, Content: NoNotesContent },
  [httpPyServer.slug]: { ...httpPyServer, Content: HttpPyServerContent },
  [pyRat.slug]: { ...pyRat, Content: PyRatContent },
  [firaRaceCar.slug]: { ...firaRaceCar, Content: FiraRaceCarContent },
  [qArm.slug]: { ...qArm, Content: QArmContent },
  [accessibleMacroPad.slug]: { ...accessibleMacroPad, Content: AccessibleMacroPadContent },
  [skydle.slug]: { ...skydle, Content: SkydleContent },
  [aiShortStory.slug]: { ...aiShortStory, Content: AiShortStoryContent },
  [myPlate.slug]: { ...myPlate, Content: MyPlateContent },
  [portfolio.slug]: { ...portfolio, Content: PortfolioContent },
};

export type ProjectSlug = keyof typeof projectDetails;

export const projectEntries = [
  projectDetails["nonotes"],
  projectDetails["skydle"],
  projectDetails["py-rat"],
  projectDetails["fira-race-car"],
  projectDetails["q-arm"],
  projectDetails["accessible-macro-pad"],
  projectDetails["ai-short-story-video-maker"],
  projectDetails["http-pyserver"],
  projectDetails["myplate"],
  projectDetails["portfolio"],
];

export function getProject(slug: string) {
  return projectDetails[slug as ProjectSlug];
}

export function requireProject(slug: string) {
  const project = getProject(slug);
  if (!project) throw new Error(`Unknown project slug: ${slug}`);
  return project;
}
