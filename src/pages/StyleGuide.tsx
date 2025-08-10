import { SkipLink } from '../components/SkipLink'

export function StyleGuide() {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen p-8">
        <main id="main-content">
          <h1 className="text-4xl font-bold mb-8">Cat-Quest Portfolio スタイルガイド</h1>
          
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">カラーパレット</h2>
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              <div className="p-4 bg-primary-yellow text-primary-black rounded">
                <p className="font-semibold">Primary Yellow</p>
                <p className="text-sm">var(--color-yellow)</p>
                <p className="text-sm">#FBBF24</p>
              </div>
              <div className="p-4 bg-primary-black text-primary-white rounded">
                <p className="font-semibold">Primary Black</p>
                <p className="text-sm">var(--color-black)</p>
                <p className="text-sm">#000000</p>
              </div>
              <div className="p-4 bg-primary-white text-primary-black border-2 border-primary-black rounded">
                <p className="font-semibold">Primary White</p>
                <p className="text-sm">var(--color-white)</p>
                <p className="text-sm">#FFFFFF</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">タイポグラフィ</h2>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold">見出し1 (text-4xl font-bold)</h1>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">見出し2 (text-2xl font-semibold)</h2>
              </div>
              <div>
                <h3 className="text-xl font-medium">見出し3 (text-xl font-medium)</h3>
              </div>
              <div>
                <p className="text-base">本文テキスト (text-base)</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">補助テキスト (text-sm)</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">フォーカススタイル</h2>
            <div className="space-y-4">
              <button className="px-4 py-2 bg-primary-yellow text-primary-black rounded hover:opacity-90 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow">
                ボタン（タブキーでフォーカスを確認）
              </button>
              <a href="#" className="inline-block px-4 py-2 text-primary-black underline hover:no-underline focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-yellow">
                リンク（タブキーでフォーカスを確認）
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">アクセシビリティ</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>スキップリンク: ページ上部でTabキーを押すと表示</li>
              <li>フォーカスインジケーター: 黄色のアウトライン</li>
              <li>prefers-reduced-motion: CSSで自動的に適用</li>
            </ul>
          </section>
        </main>
      </div>
    </>
  )
}