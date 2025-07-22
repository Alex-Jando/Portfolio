import { useEffect } from "react";
import { collections } from "../assets/collections";
import CollectionBox from "../components/CollectionBox";

const Media = () => {
  useEffect(() => {
    document.title = "Collection | Alexander Jando";
  }, []);

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
