import type { Metadata } from "next";
import { readdir } from "node:fs/promises";
import path from "node:path";

/**
 * Internal contact sheet for reviewing generated share cards.
 *
 * Staging-only: `robots.ts` already blocks indexing on the staging host, and
 * this page is additionally marked noindex so it never surfaces in search.
 */
export const metadata: Metadata = {
  title: "OG card preview",
  robots: { index: false, follow: false },
};

const PAGE_ORDER = ["default", "about", "projects", "collection", "resume", "contact"];

const OgPreview = async () => {
  const files = await readdir(path.join(process.cwd(), "public", "og"));
  const names = files
    .filter((file) => file.endsWith(".png"))
    .map((file) => file.replace(/\.png$/, ""));

  const pages = PAGE_ORDER.filter((name) => names.includes(name));
  const projects = names.filter((name) => name.startsWith("project-")).sort();

  const renderGroup = (heading: string, items: string[]) => (
    <section style={{ marginBottom: "3rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>{heading}</h2>
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        }}
      >
        {items.map((name) => (
          <figure key={name} style={{ margin: 0 }}>
            {/* Intentionally a plain img: these are fixed 1200x630 assets and
                must be reviewed exactly as social platforms receive them. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/og/${name}.png`}
              alt={`Open Graph card for ${name}`}
              width={1200}
              height={630}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                border: "1px solid var(--border)",
              }}
            />
            <figcaption
              style={{
                marginTop: "0.5rem",
                color: "var(--muted)",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.8rem",
              }}
            >
              {name}.png
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );

  return (
    <main className="page-shell">
      <header style={{ marginBottom: "2.5rem" }}>
        <p className="eyebrow">Internal preview</p>
        <h1>Open Graph cards</h1>
        <p className="page-intro">
          Every generated 1200x630 share card, shown at the aspect ratio social
          platforms use. Regenerate with <code>npm run og:build</code>.
        </p>
      </header>
      {renderGroup("Site pages", pages)}
      {renderGroup("Project pages", projects)}
    </main>
  );
};

export default OgPreview;
