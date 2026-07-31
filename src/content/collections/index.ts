import type { ComponentType } from "react";
import type { CollectionItem, CollectionItemData } from "./types";

export type { CollectionItem } from "./types";

/**
 * Field notes are discovered automatically from the `.mdx` files in this
 * folder. To add one: create `src/content/collections/<id>.mdx` exporting a
 * `collection` object via `defineCollection`. No edits needed here.
 *
 * Display order comes from the required numeric `order` field.
 */

type CollectionModule = {
  default: ComponentType;
  collection: CollectionItemData;
};

const context = require.context("./", false, /\.mdx$/);

const loaded: CollectionItem[] = context.keys().map((key: string) => {
  const mod = context(key) as CollectionModule;
  const { collection, default: Content } = mod;

  if (!collection?.id) {
    throw new Error(
      `Collection MDX "${key}" is missing an exported \`collection\` object with an \`id\`.`,
    );
  }

  return { ...collection, Content };
});

const duplicate = loaded.find(
  (entry, index) => loaded.findIndex((other) => other.id === entry.id) !== index,
);
if (duplicate) {
  throw new Error(`Duplicate collection id detected: "${duplicate.id}"`);
}

export const collectionItems: CollectionItem[] = loaded.sort(
  (a, b) => a.order - b.order || a.title.localeCompare(b.title),
);
