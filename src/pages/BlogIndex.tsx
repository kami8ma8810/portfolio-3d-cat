import { useState, useEffect } from 'react'
import { SkipLink } from '../components/SkipLink'

interface BlogPost {
  title: string
  slug: string
  date: string
  tags: string[]
  summary: string
  cover: string
}

export function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: 実際のMDXファイルから読み込む処理を実装
    // 現在はダミーデータ
    setTimeout(() => {
      setPosts([
        {
          title: 'サンプル記事1',
          slug: 'sample-post-1',
          date: '2024-01-01',
          tags: ['React', 'TypeScript'],
          summary: 'これはサンプル記事の概要です。',
          cover: '',
        },
      ])
      setLoading(false)
    }, 100)
  }, [])

  return (
    <>
      <SkipLink />
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <main id="main-content">
          <h1 className="text-4xl font-bold mb-8">ブログ</h1>
          
          {loading ? (
            <div className="text-center py-8">読み込み中...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              まだ記事がありません。
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="border-b border-gray-200 pb-8">
                  <h2 className="text-2xl font-semibold mb-2">
                    <a 
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary-yellow focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow"
                    >
                      {post.title}
                    </a>
                  </h2>
                  <div className="text-sm text-gray-600 mb-2">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('ja-JP')}
                    </time>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-primary-yellow text-primary-black rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-700">{post.summary}</p>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}