import Project from "../../components/Project";
import projects from "../../../public/data/projects.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Alexander Jando",
  description: "Here are many of the projects I've worked on and completed.",
};

const Projects = () => {

  return (
    <main>
      <h1>My Projects</h1>
      <section className="projects">
        {projects.map((project) => {
          return <Project project={project} key={project.name} />;
        })}
      </section>
    </main>
  );
};

export default Projects;
