import Image from "next/image";
import Link from "next/link";

type ProjectData = {
  title: string;
  category: string;
  summary: string;
  links: { href: string }[];
  image: string;
  imageAlt: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  slug: string;
};

const Project = ({project}: {project: ProjectData}) => {
  const projectLink = `/projects/${project.slug}`;

  return (
    <article className="project">
        <Link href={projectLink} aria-label={`View the ${project.title} case study`}>
            <Image
              src={project.thumbnail ?? project.image}
              alt={project.thumbnailAlt ?? project.imageAlt}
              width={576}
              height={360}
              sizes="(max-width: 680px) calc(100vw - 3.8rem), 144px"
            />
        </Link>
        <div className="project-copy">
            <p className="project-category">{project.category}</p>
            <h3>
                {project.title}
            </h3>
            <p>
                {project.summary}
            </p>
            <p className="project-link">
            <Link href={projectLink} aria-label={`Read the ${project.title} case study`}>
              [ View Case Study → ]
            </Link>
        </p>
        </div>
    </article>
  )
}

export default Project
