import Image from "next/image";
import Link from "next/link";
import type { CollectionItem } from "@/content/collections";
import { requireProject } from "@/content/projects";

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
  const project = item.project ? requireProject(item.project) : undefined;
  const isEmbeddedMedia = item.media.type === "embed";
  return (
    <article className={`collection-box${item.featured ? " collection-box-featured" : ""}`}>
      <div className={`collection-image${item.media.type === "video" || isEmbeddedMedia ? " collection-video" : ""}`}>
        {item.media.type === "video" ? (
          <video controls preload="metadata" poster={item.thumbnail} aria-label={`Video: ${item.title}`}>
            <source src={item.media.src} type="video/mp4" />
            {item.media.captions && (
              <track kind="captions" src={item.media.captions} srcLang="en" label="English" default />
            )}
            Your browser does not support embedded video.
          </video>
        ) : item.media.type === "embed" ? (
          <iframe
            src={item.media.src}
            title={item.media.title}
            allow={item.media.allow}
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <Image
            src={item.thumbnail}
            alt={item.imageAlt}
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
        <div className="collection-body"><item.Content /></div>
        <div className="collection-links">
          <CollectionLink href={item.primaryLink.href}>{item.primaryLink.label}</CollectionLink>
          {project && (
            <CollectionLink href={`/projects/${project.slug}`}>
              Read the {project.title} case study
            </CollectionLink>
          )}
        </div>
      </div>
    </article>
  );
};

export default CollectionBox;
