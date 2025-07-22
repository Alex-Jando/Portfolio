import { useEffect } from "react";
import Project from "../components/Project";
import { projects } from "../assets/projects";

const Projects = () => {
  useEffect(() => {
    document.title = "Projects | Alexander Jando";
  }, []);

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
