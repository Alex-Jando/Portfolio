import type { ComponentType } from "react";

export type CollectionMedia =
  | { type: "image" }
  | { type: "video"; src: string; captions?: string }
  | { type: "embed"; src: string; title: string; allow?: string };

export type CollectionItemData = {
  id: string;
  title: string;
  section: "Build notes" | "Technical notes" | "Demos & recognition" | "Internet detours";
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
