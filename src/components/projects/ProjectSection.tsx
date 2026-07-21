import type { ReactNode } from "react";

type ProjectSectionProps = {
  title: string;
  children: ReactNode;
};

export default function ProjectSection({ title, children }: ProjectSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
