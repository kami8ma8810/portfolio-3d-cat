import { Link } from '@tanstack/react-router'

export function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main id="main-content" className="text-center">
        <h1 className="text-4xl font-bold mb-8">Cat-Quest Portfolio</h1>
        <p className="text-xl mb-8">3D猫が案内するインタラクティブなポートフォリオ</p>
        
        <div className="bg-primary-yellow text-primary-black p-8 rounded-lg mb-8 max-w-md">
          <p className="mb-4">⚠️ 3Dシーンは現在準備中です</p>
          <p>ステップ4で実装予定</p>
        </div>

        <nav className="space-y-4">
          <Link 
            to="/projects" 
            className="block px-6 py-3 bg-primary-black text-primary-white rounded hover:opacity-90 transition-opacity"
          >
            プロジェクト一覧へ
          </Link>
          <Link 
            to="/lite" 
            className="block px-6 py-3 border-2 border-primary-black rounded hover:bg-primary-black hover:text-primary-white transition-colors"
          >
            ライトモードで見る
          </Link>
        </nav>
      </main>
    </div>
  )
}