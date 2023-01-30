// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      tags: z.array(z.string()),
      image: z.object({
        url: z.string(),
        alt: z.string().optional()
      }),
      author: z.string(),
      jpn: z.string()
    })
  });
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  'blog': blogCollection,
};