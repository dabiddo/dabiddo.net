declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | ((context: SchemaContext) => S);
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"blog": {
"chatgpt-other-stuff.md": {
  id: "chatgpt-other-stuff.md",
  slug: "chatgpt-other-stuff",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"docker-compose-nuxt-with-surealdb.md": {
  id: "docker-compose-nuxt-with-surealdb.md",
  slug: "docker-compose-nuxt-with-surealdb",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"easy-astro-enviroment.md": {
  id: "easy-astro-enviroment.md",
  slug: "easy-astro-enviroment",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"first-real-post.md": {
  id: "first-real-post.md",
  slug: "first-real-post",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"getting-started-microk8s.md": {
  id: "getting-started-microk8s.md",
  slug: "getting-started-microk8s",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"getting-surrealdb-on-nuxt.md": {
  id: "getting-surrealdb-on-nuxt.md",
  slug: "getting-surrealdb-on-nuxt",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"life-update.md": {
  id: "life-update.md",
  slug: "life-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"march-update.md": {
  id: "march-update.md",
  slug: "march-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"may-update.md": {
  id: "may-update.md",
  slug: "may-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"playing-with.surrealdb.md": {
  id: "playing-with.surrealdb.md",
  slug: "playing-withsurrealdb",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"upgraded-to-astro-20.md": {
  id: "upgraded-to-astro-20.md",
  slug: "upgraded-to-astro-20",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
"vscode-devcontainer-issues.md": {
  id: "vscode-devcontainer-issues.md",
  slug: "vscode-devcontainer-issues",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
