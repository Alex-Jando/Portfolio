import AiShortStoryContent, { collection as aiShortStory } from "./ai-short-story-output.mdx";
import NoNotesShowcaseContent, { collection as noNotesShowcase } from "./nonotes-showcase.mdx";
import FiraPressCoverageContent, { collection as firaPressCoverage } from "./fira-press-coverage.mdx";
import CarbonPalsContent, { collection as carbonPals } from "./carbon-pals-hackathon.mdx";
import AccessibleDesignContent, { collection as accessibleDesign } from "./accessible-design-constraints.mdx";
import HttpFundamentalsContent, { collection as httpFundamentals } from "./http-from-sockets.mdx";
import QArmIterationsContent, { collection as qArmIterations } from "./q-arm-design-iterations.mdx";
import type { CollectionItem } from "./types";

export type { CollectionItem } from "./types";

export const collectionItems = [
  { ...carbonPals, Content: CarbonPalsContent },
  { ...accessibleDesign, Content: AccessibleDesignContent },
  { ...httpFundamentals, Content: HttpFundamentalsContent },
  { ...qArmIterations, Content: QArmIterationsContent },
  { ...aiShortStory, Content: AiShortStoryContent },
  { ...noNotesShowcase, Content: NoNotesShowcaseContent },
  { ...firaPressCoverage, Content: FiraPressCoverageContent },
].sort((a, b) => a.order - b.order) satisfies CollectionItem[];
