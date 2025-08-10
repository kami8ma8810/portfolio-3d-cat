import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })))

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">読み込み中...</div>}>
      <Home />
    </Suspense>
  )
}