import { Link } from '@tanstack/react-router'

export function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <nav className="mb-4">
            <Link 
              to="/" 
              className="text-primary-black hover:text-primary-yellow transition-colors"
            >
              ← ホームに戻る
            </Link>
          </nav>
          <h1 className="text-4xl font-bold">自己紹介</h1>
        </header>

        <main id="main-content" className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                フロントエンドエンジニアとして、インタラクティブで美しいWebアプリケーションの開発に情熱を注いでいます。
              </p>
              <p>
                特に3D表現やアニメーション、ユーザー体験の向上に興味があり、
                React Three FiberやGSAPなどを活用した開発を得意としています。
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">スキル</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-medium mb-3">フロントエンド</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    React / Next.js
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    Three.js / React Three Fiber
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    Tailwind CSS
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">その他</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    Git / GitHub
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    Figma
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    アクセシビリティ
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary-yellow rounded-full"></span>
                    パフォーマンス最適化
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}