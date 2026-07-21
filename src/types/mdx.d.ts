declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { ProjectData } from "@/components/projects/types";

  export const project: ProjectData;
  const MDXContent: ComponentType;
  export default MDXContent;
}
