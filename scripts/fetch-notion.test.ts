import { describe, it, expect, vi } from 'vitest'
import { BlogFrontmatterSchema } from '../src/lib/notion-types'

describe('Notion Fetch Script Types', () => {
  it('should validate correct blog frontmatter', () => {
    const validFrontmatter = {
      title: 'テスト記事',
      slug: 'test-article',
      date: '2024-01-01',
      tags: ['React', 'TypeScript'],
      summary: 'これはテスト記事です',
      cover: 'https://example.com/image.png',
      updatedAt: '2024-01-01T00:00:00.000Z',
      published: true,
    }

    const result = BlogFrontmatterSchema.safeParse(validFrontmatter)
    expect(result.success).toBe(true)
  })

  it('should reject invalid blog frontmatter', () => {
    const invalidFrontmatter = {
      title: 'テスト記事',
      // slug is missing
      date: '2024-01-01',
      tags: 'React', // should be array
      summary: 'これはテスト記事です',
      published: 'yes', // should be boolean
    }

    const result = BlogFrontmatterSchema.safeParse(invalidFrontmatter)
    expect(result.success).toBe(false)
  })
})