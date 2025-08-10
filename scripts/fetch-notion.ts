import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import * as fs from 'fs/promises'
import * as path from 'path'
import matter from 'gray-matter'
import { z } from 'zod'
import * as dotenv from 'dotenv'

// 環境変数を読み込み
dotenv.config()

// 環境変数のバリデーション
const EnvSchema = z.object({
  NOTION_TOKEN: z.string().min(1),
  NOTION_DATABASE_ID: z.string().min(1),
})

const env = EnvSchema.parse(process.env)

// Notionクライアントの初期化
const notion = new Client({
  auth: env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

// ブログ記事のスキーマ
const BlogPostSchema = z.object({
  id: z.string(),
  properties: z.object({
    title: z.object({
      title: z.array(z.object({
        plain_text: z.string(),
      })),
    }),
    slug: z.object({
      rich_text: z.array(z.object({
        plain_text: z.string(),
      })),
    }),
    date: z.object({
      date: z.object({
        start: z.string(),
      }).nullable(),
    }),
    tags: z.object({
      multi_select: z.array(z.object({
        name: z.string(),
      })),
    }),
    summary: z.object({
      rich_text: z.array(z.object({
        plain_text: z.string(),
      })),
    }),
    cover: z.object({
      rich_text: z.array(z.object({
        plain_text: z.string(),
      })),
    }).optional(),
    published: z.object({
      checkbox: z.boolean(),
    }),
  }),
  last_edited_time: z.string(),
})

type BlogPost = z.infer<typeof BlogPostSchema>

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: env.NOTION_DATABASE_ID,
    filter: {
      property: 'published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  })

  return response.results.map((page) => BlogPostSchema.parse(page))
}

async function convertToMdx(post: BlogPost): Promise<string> {
  // Notionページの内容をMarkdownに変換
  const mdBlocks = await n2m.pageToMarkdown(post.id)
  const mdString = n2m.toMarkdownString(mdBlocks).parent

  // frontmatterを作成
  const frontmatter = {
    title: post.properties.title.title[0]?.plain_text || '',
    slug: post.properties.slug.rich_text[0]?.plain_text || '',
    date: post.properties.date.date?.start || new Date().toISOString(),
    tags: post.properties.tags.multi_select.map(tag => tag.name),
    summary: post.properties.summary.rich_text[0]?.plain_text || '',
    cover: post.properties.cover?.rich_text[0]?.plain_text || '',
    updatedAt: post.last_edited_time,
    published: post.properties.published.checkbox,
  }

  // frontmatter付きのMDXを生成
  const mdxContent = matter.stringify(mdString, frontmatter)
  return mdxContent
}

async function saveMdxFile(slug: string, content: string) {
  const outputDir = path.join(process.cwd(), 'src', 'content', 'blog')
  await fs.mkdir(outputDir, { recursive: true })
  
  const filePath = path.join(outputDir, `${slug}.mdx`)
  await fs.writeFile(filePath, content, 'utf-8')
  console.log(`✅ 保存完了: ${filePath}`)
}

async function main() {
  try {
    console.log('🚀 Notionから記事を取得中...')
    const posts = await fetchBlogPosts()
    console.log(`📝 ${posts.length}件の公開記事を取得しました`)

    for (const post of posts) {
      const slug = post.properties.slug.rich_text[0]?.plain_text
      if (!slug) {
        console.warn(`⚠️  スラッグが設定されていない記事をスキップ: ${post.properties.title.title[0]?.plain_text}`)
        continue
      }

      console.log(`📄 変換中: ${post.properties.title.title[0]?.plain_text}`)
      const mdxContent = await convertToMdx(post)
      await saveMdxFile(slug, mdxContent)
    }

    console.log('✨ すべての記事の取得が完了しました！')
  } catch (error) {
    console.error('❌ エラーが発生しました:', error)
    process.exit(1)
  }
}

// スクリプト実行
main()