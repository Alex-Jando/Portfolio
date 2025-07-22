const Project = ({project}: {project: Record<string, string>}) => {
  return (
    <article className="project">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
            <img src={project.image} alt={project.name} />
        </a>
        <div>
            <h3>
                {project.name}
            </h3>
            <p>
                {project.description}
            </p>
            <p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
            </a>
        </p>
        </div>
    </article>
  )
}

export default Project