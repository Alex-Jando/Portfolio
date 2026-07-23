declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { ProjectData } from "@/components/projects/types";
  import type { CollectionItemData } from "@/content/collections/types";

  export const project: ProjectData;
  export const collection: CollectionItemData;
  const MDXContent: ComponentType;
  export default MDXContent;
}
