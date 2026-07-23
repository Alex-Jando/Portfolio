import Image from "next/image";
import Link from "next/link";

type CollectionItem = {
  id: string;
  title: string;
  category: string;
  source: string;
  description: string;
  note: string;
  thumbnail: string;
  video: string | null;
  link: string;
  linkLabel: string;
  projectLink: string;
  projectLabel: string;
  featured: boolean;
};

const isExternal = (href: string) => href.startsWith("http");

const CollectionLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const external = isExternal(href);

  return (
    <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {children}<span aria-hidden="true"> {external ? "↗" : "→"}</span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </Link>
  );
};

const CollectionBox = ({ item, index }: { item: CollectionItem; index: number }) => {
  return (
    <article className={`collection-box${item.featured ? " collection-box-featured" : ""}`}>
      <div className={`collection-image${item.video ? " collection-video" : ""}`}>
        {item.video ? (
          <video controls preload="metadata" poster={item.thumbnail} aria-label={`Video: ${item.title}`}>
            <source src={item.video} type="video/mp4" />
            <track kind="captions" src="/collections/AIShortStoryVideoMakerDemo.en.vtt" srcLang="en" label="English" default />
            Your browser does not support embedded video.
          </video>
        ) : (
          <Image
            src={item.thumbnail}
            alt=""
            fill
            sizes={item.featured ? "(max-width: 760px) 100vw, 62vw" : "(max-width: 760px) 100vw, 38vw"}
          />
        )}
        <span className="collection-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="collection-copy">
        <div className="collection-meta">
          <span>{item.category}</span>
          <span>{item.source}</span>
        </div>
        <h3>{item.title}</h3>
        <p className="collection-description">{item.description}</p>
        <p className="collection-note"><span>Why it&apos;s here</span>{item.note}</p>
        <div className="collection-links">
          {!item.video && <CollectionLink href={item.link}>{item.linkLabel}</CollectionLink>}
          <CollectionLink href={item.projectLink}>{item.projectLabel}</CollectionLink>
        </div>
      </div>
    </article>
  );
};

export default CollectionBox;
