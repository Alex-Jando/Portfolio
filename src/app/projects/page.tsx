import Project from "@/components/Project";
import { projectEntries } from "@/content/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Alexander Jando",
  description: "Here are many of the projects I've worked on and completed.",
};

const Projects = () => {
  return (
    <main className="page-shell">
      <p className="eyebrow">Selected Work</p>
      <h1>My Projects</h1>
      <p className="page-intro">Software, robotics, embedded systems, and the experiments between them.</p>
      <section className="projects">
        {projectEntries.map((project) => {
          return <Project project={project} key={project.slug} />;
        })}
      </section>
    </main>
  );
};

export default Projects;
