import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/projects/ProjectLayout";
import { getProject, projectDetails } from "@/content/projects";
import { JsonLd, breadcrumbSchema, projectSchema, socialMetadata } from "@/lib/seo";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Project pages are static, but the HTTP-PyServer page embeds a live download
// count from pepy.tech. Revalidating daily keeps that number current between
// deploys instead of freezing it at build time.
export const revalidate = 86400;

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
    alternates: { canonical: `/projects/${project.slug}` },
    ...socialMetadata({
      title: `${project.title} | Alexander Jando`,
      description: project.description,
      path: `/projects/${project.slug}`,
      image: `project-${project.slug}`,
      type: "article",
      imageAlt: project.imageAlt,
    }),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Content = project.Content;

  return (
    <>
      <JsonLd schema={projectSchema(project)} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <ProjectLayout project={{ ...project, content: <Content /> }} />
    </>
  );
}
