import Image from "next/image";
import Link from "next/link";

type ProjectData = {
  title: string;
  summary: string;
  links: { href: string }[];
  image: string;
  slug: string;
};

const Project = ({project}: {project: ProjectData}) => {
  const projectLink = `/projects/${project.slug}`;

  return (
    <article className="project">
        <Link href={projectLink}>
            <Image src={project.image} alt="" width={100} height={100} />
        </Link>
        <div className="project-copy">
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
