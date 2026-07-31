import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Alexander Jando",
  description:
    "That page could not be found. Browse Alexander Jando's engineering case studies, field notes, resume, and contact details instead.",
  robots: { index: false, follow: true },
};

const destinations = [
  { href: "/projects", label: "Projects", hint: "Hardware and software case studies" },
  { href: "/collection", label: "Field Notes", hint: "Build notes and experiments" },
  { href: "/resume", label: "Resume", hint: "Experience and skills" },
  { href: "/contact", label: "Contact", hint: "Ways to reach me" },
];

const NotFound = () => {
  return (
    <main className="page-shell not-found">
      <p className="eyebrow">Error 404</p>
      <h1>Page not found</h1>
      <p className="page-intro">
        That page doesn&apos;t exist, or it may have moved. Here are some good
        places to go instead.
      </p>
      <ul className="not-found-links">
        {destinations.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>[ {item.label} ]</Link>
            <span>{item.hint}</span>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/">[ Return home ]</Link>
      </p>
    </main>
  );
};

export default NotFound;
