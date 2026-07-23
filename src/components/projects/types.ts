import type { ComponentType, ReactNode } from "react";

export type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectData = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  links: ProjectLink[];
  facts: ProjectFact[];
  technologies: string[];
  features?: string[];
  sidebar?: ReactNode;
};

export type ProjectDetail = ProjectData & {
  content: ReactNode;
};

export type ProjectEntry = ProjectData & {
  Content: ComponentType;
};

export const defineProject = <T extends ProjectData>(project: T) => project;
