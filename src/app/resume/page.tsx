import type { Metadata } from "next";
import resume from "@/generated/resume.json";

export const metadata: Metadata = {
  title: "Résumé | Alexander Jando",
  description: "Alexander Jando's mechatronics engineering résumé, generated from LaTeX.",
};

export default function Resume() {
  return (
    <main className="resume-page page-shell">
      <div className="resume-page-heading">
        <div>
          <p className="eyebrow">Generated from LaTeX</p>
          <h1>Résumé</h1>
          <p className="page-intro">A web-readable version of my current mechatronics résumé.</p>
        </div>
        <div className="resume-actions">
          <a className="button-link" href="/resume/EngineeringResume.pdf" download>[ Download PDF ]</a>
          <a className="button-link secondary" href="/resume/EngineeringResume.pdf" target="_blank" rel="noreferrer">[ Open PDF ↗ ]</a>
        </div>
      </div>

      <article className="resume-document" aria-label={resume.variant}>
        <header className="resume-header">
          <h2>{resume.name}</h2>
          <p>{resume.locations}</p>
          <ul>
            {resume.contacts.map((contact) => (
              <li key={contact.href}><a href={contact.href}>{contact.label}</a></li>
            ))}
          </ul>
        </header>

        <section>
          <h3>Summary</h3>
          <p>{resume.summary}</p>
        </section>

        {resume.education && (
          <section>
            <h3>Education</h3>
            <div className="resume-row">
              <strong>{resume.education.title}</strong><strong>{resume.education.date}</strong>
              <em>{resume.education.subtitle}</em><em>{resume.education.location}</em>
            </div>
            <p>{resume.education.detail}</p>
          </section>
        )}

        <section>
          <h3>Technical Skills</h3>
          <dl className="resume-skills">
            {resume.skills.map((skill) => (
              <div key={skill.label}><dt>{skill.label}</dt><dd>{skill.value}</dd></div>
            ))}
          </dl>
        </section>

        <section>
          <h3>Experience</h3>
          {resume.experience.map((entry) => (
            <div className="resume-entry" key={`${entry.title}-${entry.date}`}>
              <div className="resume-row">
                <strong>{entry.title}</strong><strong>{entry.date}</strong>
                <em>{entry.subtitle}</em><em>{entry.location}</em>
              </div>
              <ul>{entry.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h3>Projects</h3>
          {resume.projects.map((project) => (
            <div className="resume-entry" key={project.title}>
              <div className="resume-row resume-project-row"><strong>{project.title}</strong><em>{project.subtitle}</em></div>
              {project.links.map((link) => <p className="resume-source" key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{link.label}</a></p>)}
              <ul>{project.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h3>Awards &amp; Certifications</h3>
          <p>{resume.awards.join(" | ")}</p>
        </section>

        <section>
          <h3>Languages</h3>
          <p>{resume.languages.join(" | ")}</p>
        </section>
      </article>

      <p className="resume-note">This page and the downloadable PDF are generated from <code>resumes/mechatronics/resume.tex</code>.</p>
    </main>
  );
}
