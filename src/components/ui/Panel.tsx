import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'

interface PanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: React.ReactNode
  href?: string
}

export function Panel({ isOpen, onClose, title, content, href }: PanelProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
        role="dialog"
        aria-labelledby="panel-title"
        aria-describedby="panel-content"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="閉じる"
        >
          ✕
        </button>
        
        <h2 id="panel-title" className="text-2xl font-bold mb-4">
          {title}
        </h2>
        
        <div id="panel-content" className="mb-6">
          {content}
        </div>
        
        {href && (
          <Link
            to={href}
            className="block w-full px-4 py-2 bg-primary-yellow text-primary-black text-center rounded hover:opacity-90 transition-opacity"
          >
            詳しく見る
          </Link>
        )}
      </div>
    </div>
  )
}