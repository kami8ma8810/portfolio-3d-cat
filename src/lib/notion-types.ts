import { z } from 'zod'

export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  summary: z.string(),
  cover: z.string().optional(),
  updatedAt: z.string(),
  published: z.boolean(),
})

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>