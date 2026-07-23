import type { ComponentType } from "react";

export type CollectionMedia =
  | { type: "image" }
  | { type: "video"; src: string; captions?: string };

export type CollectionItemData = {
  id: string;
  title: string;
  category: string;
  source: string;
  thumbnail: string;
  imageAlt: string;
  media: CollectionMedia;
  primaryLink: { href: string; label: string };
  project?: string;
  featured: boolean;
  order: number;
};

export type CollectionItem = CollectionItemData & {
  Content: ComponentType;
};

export const defineCollection = <T extends CollectionItemData>(item: T) => item;
