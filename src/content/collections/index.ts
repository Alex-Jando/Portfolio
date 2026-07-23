import AiShortStoryContent, { collection as aiShortStory } from "./ai-short-story-output.mdx";
import NoNotesShowcaseContent, { collection as noNotesShowcase } from "./nonotes-showcase.mdx";
import FiraPressCoverageContent, { collection as firaPressCoverage } from "./fira-press-coverage.mdx";
import type { CollectionItem } from "./types";

export type { CollectionItem } from "./types";

export const collectionItems = [
  { ...aiShortStory, Content: AiShortStoryContent },
  { ...noNotesShowcase, Content: NoNotesShowcaseContent },
  { ...firaPressCoverage, Content: FiraPressCoverageContent },
].sort((a, b) => a.order - b.order) satisfies CollectionItem[];
