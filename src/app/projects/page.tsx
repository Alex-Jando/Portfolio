import Project from "@/components/Project";
import { projectEntries } from "@/content/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Alexander Jando",
  description: "Here are many of the projects I've worked on and completed.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
  },
};

const Projects = () => {
  const featuredProjects = projectEntries.slice(0, 6);
  const moreProjects = projectEntries.slice(6);

  return (
    <main className="page-shell">
      <p className="eyebrow">Selected Work</p>
      <h1>My Projects</h1>
      <p className="page-intro">Robotics, embedded systems, software, and the experiments that helped me learn how they fit together.</p>
      <h2 className="project-group-heading">Featured projects</h2>
      <section className="projects" aria-label="Featured projects">
        {featuredProjects.map((project) => {
          return <Project project={project} key={project.slug} />;
        })}
      </section>
      <h2 className="project-group-heading project-group-heading-secondary">More work</h2>
      <section className="projects projects-secondary" aria-label="More projects">
        {moreProjects.map((project) => {
          return <Project project={project} key={project.slug} />;
        })}
      </section>
    </main>
  );
};

export default Projects;
