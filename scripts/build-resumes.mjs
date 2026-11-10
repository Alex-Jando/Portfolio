import { existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createHTMLWindow } from "svgdom";

globalThis.window = createHTMLWindow();
globalThis.document = globalThis.window.document;
const { HtmlGenerator, parse } = await import("latex.js");

const root = process.cwd();
const source = path.join(root, "resumes/mechatronics/resume.tex");
const generatedDir = path.join(root, "src/generated");
const publicDir = path.join(root, "public/resume");
const tex = await readFile(source, "utf8");
const pdfFile = path.join(publicDir, "EngineeringResume.pdf");
const pdfVersion = existsSync(pdfFile) ? createHash("sha256").update(await readFile(pdfFile)).digest("hex").slice(0, 16) : "missing";

const clean = (value = "") => value
  .replace(/\\&/g, "&")
  .replace(/\\textbar\{\}/g, "|")
  .replace(/--/g, "–")
  .replace(/\\small\s*/g, "")
  .replace(/\s+/g, " ")
  .trim();

const section = (name, next) => {
  const end = next ? `(?=\\\\section\\*\\{${next.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\})` : "(?=\\\\end\\{document\\})";
  return tex.match(new RegExp(`\\\\section\\*\\{${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\}([\\s\\S]*?)${end}`))?.[1] ?? "";
};

const items = (value) => [...value.matchAll(/\\resumeItem\{([^}]*)\}/g)].map((match) => clean(match[1]));
const links = (value) => [...value.matchAll(/(?:\\link|\\href)\{([^}]*)\}\{([^}]*)\}/g)].map((match) => ({ href: match[1], label: clean(match[2]) }));

const parseEntries = (value, command) => {
  const pattern = command === "resumeSubheading"
    ? /\\resumeSubheading\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g
    : /\\resumeProject\{([^}]*)\}\{([^}]*)\}/g;
  const matches = [...value.matchAll(pattern)];
  return matches.map((match, index) => {
    const block = value.slice(match.index, matches[index + 1]?.index ?? value.length);
    return command === "resumeSubheading"
      ? { title: clean(match[1]), date: clean(match[2]), subtitle: clean(match[3]), location: clean(match[4]), items: items(block) }
      : { title: clean(match[1]), subtitle: clean(match[2]), links: links(block), items: items(block) };
  });
};

const skillsBlock = section("Technical Skills", "Engineering Experience");
const skills = [...skillsBlock.matchAll(/\\textbf\{([^}]*)\}\s*([^\\\n]*)/g)].map((match) => ({
  label: clean(match[1]).replace(/:$/, ""), value: clean(match[2]),
}));

const educationBlock = section("Education", "Technical Skills");
const educationMatch = educationBlock.match(/\\resumeSubheading\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}([\s\S]*)/);
const education = educationMatch ? {
  title: clean(educationMatch[1]), date: clean(educationMatch[2]), subtitle: clean(educationMatch[3]),
  location: clean(educationMatch[4]), detail: clean(educationMatch[5]),
} : null;

const experienceBlock = section("Engineering Experience", "Engineering Projects");
const companies = [...experienceBlock.matchAll(/\\textbf\{([^}]*)\}\\hfill\\textbf\{([^}]*)\}/g)];
const experience = companies.flatMap((company, companyIndex) => {
  const block = experienceBlock.slice(company.index, companies[companyIndex + 1]?.index ?? experienceBlock.length);
  const roles = [...block.matchAll(/\\textit\{([^}]*)\}\\hfill\\textit\{([^}]*)\}/g)];
  return roles.map((role, roleIndex) => ({
    title: clean(company[1]), location: clean(company[2]), subtitle: clean(role[1]), date: clean(role[2]),
    items: items(block.slice(role.index, roles[roleIndex + 1]?.index ?? block.length)),
  }));
});
const projectsBlock = section("Engineering Projects", null);
const projectLinks = links(projectsBlock);
const projects = parseEntries(projectsBlock.replace(/\\link\{([^}]*)\}\{([^}]*)\}/g, "$2"), "resumeProject")
  .map((project) => ({ ...project, links: projectLinks.filter((link) => link.label === project.title) }));

const data = {
  variant: "General Engineering Resume",
  pdfUrl: `/resume/EngineeringResume.pdf?v=${pdfVersion}`,
  name: "Alexander Jando",
  locations: "Hamilton, ON | West Vancouver, BC",
  contacts: [
    { label: "alex@jando.live", href: "mailto:alex@jando.live" },
    { label: "+1 (236) 865-5560", href: "tel:+12368655560" },
    { label: "jando.live", href: "https://jando.live" },
    { label: "github.com/Alex-Jando", href: "https://github.com/Alex-Jando" },
    { label: "alex-jando", href: "https://www.linkedin.com/in/alex-jando" },
  ],
  summary: clean(section("Summary", "Education")),
  education,
  skills,
  experience,
  projects,
  awards: [],
  languages: clean(tex.match(/\\textbf\{Languages:\}([^\n]*)/)?.[1]).split(";").map(clean).filter(Boolean),
  generatedAt: new Date().toISOString(),
};

// LaTeX.js validates the document structure used by the HTML pipeline. Resume-specific
// layout commands are mapped above because browsers and TeX have different layout engines.
parse("\\documentclass{article}\\begin{document}Resume build validation\\end{document}", {
  generator: new HtmlGenerator({ hyphenate: false }),
});

await mkdir(generatedDir, { recursive: true });
await mkdir(publicDir, { recursive: true });
await writeFile(path.join(generatedDir, "resume.json"), `${JSON.stringify(data, null, 2)}\n`);

// The PDF is rendered from the live site by `npm run resume:pdf`, so it cannot be
// regenerated here. Existence alone is not enough: if resume.tex is edited and the
// PDF is not re-rendered, the site and the downloadable PDF silently disagree.
const pdfPath = path.join(publicDir, "EngineeringResume.pdf");

if (!existsSync(pdfPath)) {
  throw new Error("The browser-rendered resume PDF is missing. Run npm run resume:pdf after starting the site.");
}

const manifest = JSON.parse(await readFile(path.join(publicDir, "resume-manifest.json"), "utf8"));
const sourceHash = createHash("sha256").update(tex.replace(/\r\n/g, "\n")).digest("hex");
const pdfHash = createHash("sha256").update(await readFile(pdfPath)).digest("hex");

if (manifest.sourceHash !== sourceHash || manifest.pdfHash !== pdfHash) {
  throw new Error(
    `${path.relative(root, pdfPath)} does not match its source/PDF manifest, ` +
      "so the downloadable PDF no longer matches the resume on the site. " +
      "Start the site and run npm run resume:pdf to re-render it.",
  );
}

console.log("Generated native resume data from resumes/mechatronics/resume.tex");
