import { Link } from '@tanstack/react-router'
import { useUIStore } from '../../stores/uiStore'

interface ModeToggleProps {
  currentMode: '3d' | 'lite'
}

export function ModeToggle({ currentMode }: ModeToggleProps) {
  const toggleMode = useUIStore((state) => state.toggleMode)
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        to={currentMode === '3d' ? '/lite' : '/'}
        onClick={toggleMode}
        className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary-black rounded-lg shadow-lg hover:bg-primary-yellow transition-colors"
      >
        {currentMode === '3d' ? (
          <>
            <span className="text-sm">💡</span>
            <span>ライトモードへ</span>
          </>
        ) : (
          <>
            <span className="text-sm">🎮</span>
            <span>3Dモードへ</span>
          </>
        )}
      </Link>
    </div>
  )
}