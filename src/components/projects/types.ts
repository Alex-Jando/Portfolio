import type { ReactNode } from "react";

export type ProjectLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectDetail = {
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
  content: ReactNode;
  sidebar?: ReactNode;
};
