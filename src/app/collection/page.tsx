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
      <section className="collection">
        <h2 className="sr-only">Collected notes</h2>
        {collectionItems.map((item, index) => <CollectionBox item={item} index={index} key={item.id} />)}
      </section>
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
