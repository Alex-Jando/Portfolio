/**
 * Webpack `require.context` typing.
 *
 * Used by the filesystem-driven content loaders in
 * `src/content/projects/index.ts` and `src/content/collections/index.ts`
 * so new MDX files are picked up automatically at build time.
 */
declare namespace __WebpackModuleApi {
  interface RequireContext {
    keys(): string[];
    <T = unknown>(id: string): T;
    resolve(id: string): string;
    id: string;
  }
}

declare const require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
    mode?: "sync" | "eager" | "weak" | "lazy" | "lazy-once",
  ): __WebpackModuleApi.RequireContext;
};
