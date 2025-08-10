import { Link } from '@tanstack/react-router'

export function Lite() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-black hover:text-primary-yellow transition-colors mb-4"
          >
            ← 3Dモードに戻る
          </Link>
          <h1 className="text-4xl font-bold">Cat-Quest Portfolio</h1>
          <p className="text-xl mt-2 text-gray-600">ライトモード版</p>
        </header>

        <main id="main-content">
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/projects"
              className="group p-6 border-2 border-primary-black rounded-lg hover:bg-primary-yellow transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary-black">プロジェクト</h2>
              <p className="text-gray-600 group-hover:text-primary-black">制作物とケーススタディ</p>
            </Link>

            <Link 
              to="/about"
              className="group p-6 border-2 border-primary-black rounded-lg hover:bg-primary-yellow transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary-black">自己紹介</h2>
              <p className="text-gray-600 group-hover:text-primary-black">スキルと経歴</p>
            </Link>

            <Link 
              to="/blog"
              className="group p-6 border-2 border-primary-black rounded-lg hover:bg-primary-yellow transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary-black">ブログ</h2>
              <p className="text-gray-600 group-hover:text-primary-black">技術記事とメモ</p>
            </Link>

            <Link 
              to="/contact"
              className="group p-6 border-2 border-primary-black rounded-lg hover:bg-primary-yellow transition-colors"
            >
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary-black">コンタクト</h2>
              <p className="text-gray-600 group-hover:text-primary-black">お問い合わせ</p>
            </Link>
          </nav>
        </main>
      </div>
    </div>
  )
}