import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProject, projectDetails } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Alexander Jando`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Content = project.Content;

  return <ProjectLayout project={{ ...project, content: <Content /> }} />;
}
