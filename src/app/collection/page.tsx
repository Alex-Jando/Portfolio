import collections from "../../../public/data/collections.json";
import CollectionBox from "../../components/CollectionBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection | Alexander Jando",
  description: "A collection of my own works and other projects I've found interesting.",
};

const Media = () => {

  return (
    <main>
      <h1>My Collection</h1>
      <section className="collection">
        {collections.map((collection) => {
          return (
            <CollectionBox
              key={collection.title}
              title={collection.title}
              category={collection.category}
              thumbnail={collection.thumbnail}
              link={collection.link}
            />
          );
        })}
      </section>
    </main>
  );
};

export default Media;
