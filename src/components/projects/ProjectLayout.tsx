import Image from "next/image";
import Link from "next/link";
import type { ProjectDetail } from "./types";

export default function ProjectLayout({ project }: { project: ProjectDetail }) {
  return (
    <main className={`page-shell project-detail project-${project.slug}`}>
      <Link className="project-back" href="/projects">← Back to projects</Link>

      <header className="project-detail-hero">
        <div className="project-detail-heading">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-lede">{project.summary}</p>
          {project.links.length > 0 && (
            <div className="project-detail-actions">
              {project.links.map((link) => (
              <a
                className={`button-link${link.variant === "secondary" ? " secondary" : ""}`}
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                [ {link.label} ↗ ]
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              ))}
            </div>
          )}
        </div>
        <div className="project-detail-mark">
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={600}
            height={600}
            sizes="(max-width: 680px) 72vw, (max-width: 1100px) 35vw, 420px"
            priority
          />
        </div>
      </header>

      <section className="project-facts" aria-label="Project summary">
        {project.facts.map((fact) => (
          <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong></div>
        ))}
      </section>

      <div className="project-detail-body">
        <article className="project-story">{project.content}</article>

        <aside className="project-sidebar">
          <section>
            <h2>Technology</h2>
            <ul className="project-tags">
              {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
          </section>
          {project.features && (
            <section>
              <h2>Core features</h2>
              <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </section>
          )}
          {project.sidebar}
        </aside>
      </div>

      <nav className="project-next-actions" aria-label="Continue exploring">
        <div>
          <p className="eyebrow">Keep exploring</p>
          <h2>See what else I&apos;ve been building.</h2>
        </div>
        <div>
          <Link className="button-link" href="/projects">[ More Projects ]</Link>
          <Link className="button-link secondary" href="/contact">[ Contact Me ]</Link>
        </div>
      </nav>
    </main>
  );
}
