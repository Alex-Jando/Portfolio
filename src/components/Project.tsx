import Image from "next/image";
import Link from "next/link";

type ProjectData = {
  name: string;
  description: string;
  link: string;
  image: string;
  detailLink?: string;
};

const Project = ({project}: {project: ProjectData}) => {
  const projectLink = project.detailLink || project.link;
  const isInternal = Boolean(project.detailLink);

  return (
    <article className="project">
        <Link href={projectLink}>
            <Image src={project.image} alt={project.name} width={100} height={100} />
        </Link>
        <div className="project-copy">
            <h3>
                {project.name}
            </h3>
            <p>
                {project.description}
            </p>
            <p className="project-link">
            {isInternal ? (
              <Link href={projectLink} aria-label={`Read the ${project.name} case study`}>
                [ View Case Study → ]
              </Link>
            ) : (
              <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} (opens in a new tab)`}>
                [ View Project ↗ ]
              </a>
            )}
        </p>
        </div>
    </article>
  )
}

export default Project
