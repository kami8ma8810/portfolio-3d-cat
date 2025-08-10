import { lazy, Suspense, useEffect } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { detectWebGLSupport, detectLowPerformance } from '../lib/device'
import { useUIStore } from '../stores/uiStore'
import { ModeToggle } from '../components/ui/ModeToggle'

const Plaza = lazy(() => import('../components/scene/Plaza').then(m => ({ default: m.Plaza })))

export function Home() {
  const navigate = useNavigate()
  const prefersReducedMotion = useReducedMotion()
  const forceLiteMode = useUIStore((state) => state.forceLiteMode)
  
  const isWebGLSupported = detectWebGLSupport()
  const isLowPerf = detectLowPerformance()
  
  // 自動的にライトモードへリダイレクト
  useEffect(() => {
    if (!isWebGLSupported || (isLowPerf && !forceLiteMode)) {
      navigate({ to: '/lite' })
    }
  }, [isWebGLSupported, isLowPerf, forceLiteMode, navigate])
  
  // 強制ライトモードまたはreduced-motion設定時
  if (forceLiteMode || prefersReducedMotion) {
    navigate({ to: '/lite' })
    return null
  }
  
  if (!isWebGLSupported) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <main id="main-content" className="text-center">
          <h1 className="text-4xl font-bold mb-8">Cat-Quest Portfolio</h1>
          <p className="text-xl mb-8">3D猫が案内するインタラクティブなポートフォリオ</p>
          
          <div className="bg-primary-yellow text-primary-black p-8 rounded-lg mb-8 max-w-md">
            <p className="mb-4">⚠️ お使いのブラウザはWebGLに対応していません</p>
            <p>ライトモードをご利用ください</p>
          </div>

          <nav className="space-y-4">
            <Link 
              to="/lite" 
              className="block px-6 py-3 bg-primary-black text-primary-white rounded hover:opacity-90 transition-opacity"
            >
              ライトモードで見る
            </Link>
          </nav>
        </main>
      </div>
    )
  }
  
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-yellow mx-auto mb-4"></div>
              <p>3Dシーンを読み込み中...</p>
            </div>
          </div>
        }
      >
        <Plaza />
      </Suspense>
      <ModeToggle currentMode="3d" />
    </>
  )
}