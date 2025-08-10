import { Game2D } from '../components/game/Game2D'
import { Link } from '@tanstack/react-router'
import { ModeToggle } from '../components/ui/ModeToggle'

export function Home() {
  return (
    <>
      <Game2D />
      <ModeToggle currentMode="lite" />
      
      {/* フォールバック用リンク */}
      <div className="fixed top-4 right-4 z-50">
        <Link 
          to="/lite" 
          className="text-xs text-gray-600 hover:text-gray-800 underline"
        >
          通常版へ
        </Link>
      </div>
    </>
  )
}