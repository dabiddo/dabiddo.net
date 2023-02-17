declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]] & Render;

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

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
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

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	type Render = {
		render(): Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	};

	const entryMap: {
		"blog": {
"docker-compose-nuxt-with-surealdb.md": {
  id: "docker-compose-nuxt-with-surealdb.md",
  slug: "docker-compose-nuxt-with-surealdb",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"easy-astro-enviroment.md": {
  id: "easy-astro-enviroment.md",
  slug: "easy-astro-enviroment",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"first-real-post.md": {
  id: "first-real-post.md",
  slug: "first-real-post",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"getting-started-microk8s.md": {
  id: "getting-started-microk8s.md",
  slug: "getting-started-microk8s",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"life-update.md": {
  id: "life-update.md",
  slug: "life-update",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"playing-with.surrealdb.md": {
  id: "playing-with.surrealdb.md",
  slug: "playing-withsurrealdb",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"upgraded-to-astro-20.md": {
  id: "upgraded-to-astro-20.md",
  slug: "upgraded-to-astro-20",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
"vscode-devcontainer-issues.md": {
  id: "vscode-devcontainer-issues.md",
  slug: "vscode-devcontainer-issues",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
},
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
