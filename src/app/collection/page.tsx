import { collectionItems } from "@/content/collections";
import CollectionBox from "@/components/CollectionBox";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Notes | Alexander Jando",
  description:
    "Demos, artifacts, interviews, and other field notes from Alexander Jando's engineering work.",
};

const Collection = () => {
  const sections = ["Build notes", "Technical notes", "Demos & recognition"] as const;

  return (
    <main className="page-shell collection-page">
      <header className="collection-header">
        <div>
          <p className="eyebrow">The extra shelf</p>
          <h1>Field notes</h1>
        </div>
        <p className="page-intro">
          The work around the work: demos, press, experiments, and small artifacts
          that reveal how I build, explain, and learn.
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
          This is a living shelf. New finds are added when they say something the project cards cannot.
          {" "}<Link href="/projects">Explore the technical case studies →</Link>
        </p>
      </footer>
    </main>
  );
};

export default Collection;
