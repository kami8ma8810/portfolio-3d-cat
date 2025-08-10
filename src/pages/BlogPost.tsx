import { SkipLink } from '../components/SkipLink'

interface BlogPostProps {
  slug: string
}

export function BlogPost({ slug }: BlogPostProps) {
  // TODO: 実際のMDXファイルから内容を読み込む処理を実装
  const post = {
    title: 'サンプル記事',
    date: '2024-01-01',
    tags: ['React', 'TypeScript'],
    content: 'これはサンプル記事の本文です。',
  }

  return (
    <>
      <SkipLink />
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <main id="main-content">
          <article>
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="text-sm text-gray-600 mb-2">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('ja-JP')}
                </time>
              </div>
              {post.tags.length > 0 && (
                <div className="flex gap-2">
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
            </header>
            <div className="prose prose-lg max-w-none">
              <p>{post.content}</p>
            </div>
          </article>
          <nav className="mt-12 pt-8 border-t border-gray-200">
            <a 
              href="/blog"
              className="text-primary-black hover:text-primary-yellow focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow"
            >
              ← ブログ一覧に戻る
            </a>
          </nav>
        </main>
      </div>
    </>
  )
}