import { collectionItems } from "@/content/collections";
import CollectionBox from "@/components/CollectionBox";
import Link from "next/link";
import { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Field Notes | Alexander Jando",
  description: "Field notes by Alexander Jando: build logs, technical write-ups, hackathon reflections, and experiments from robotics, embedded, and software projects.",
  alternates: { canonical: "/collection" },
  ...socialMetadata({
    title: "Field Notes | Alexander Jando",
    description: "Field notes by Alexander Jando: build logs, technical write-ups, hackathon reflections, and experiments from robotics, embedded, and software projects.",
    path: "/collection",
    image: "collection",
  }),
};

const Collection = () => {
  const sections = ["Build notes", "Technical notes", "Demos & recognition", "Made for fun"] as const;

  return (
    <main className="page-shell collection-page">
      <header className="collection-header">
        <div>
          <p className="eyebrow">Projects, side quests & miscellany</p>
          <h1>Field notes</h1>
        </div>
        <p className="page-intro">
          A running scrapbook of things I made, learned, tried, broke, fixed,
          or just thought were worth keeping.
        </p>
      </header>
      {sections.map((section) => {
        const sectionItems = collectionItems.filter((item) => item.section === section);

        return (
          <section className="collection-section" key={section}>
            <div className="collection-section-heading">
              <p className="eyebrow">Shelf {String(sections.indexOf(section) + 1).padStart(2, "0")}</p>
              <h2>{section}</h2>
            </div>
            <div className="collection">
              {sectionItems.map((item) => (
                <CollectionBox
                  item={item}
                  index={collectionItems.indexOf(item)}
                  key={item.id}
                />
              ))}
            </div>
          </section>
        );
      })}
      <footer className="collection-footer">
        <span aria-hidden="true">*</span>
        <p>
          This page is intentionally a little random. For the polished version,
          {" "}<Link href="/projects">explore the project case studies →</Link>
        </p>
      </footer>
    </main>
  );
};

export default Collection;
