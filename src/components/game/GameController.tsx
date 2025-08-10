import { useEffect, useState } from 'react'

export function GameController() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  if (!isMobile) return null
  
  const handleButtonPress = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  }
  
  const handleButtonRelease = (key: string) => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key }))
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
      <div className="max-w-md mx-auto grid grid-cols-6 gap-2">
        {/* 十字キー */}
        <div className="col-span-3 grid grid-cols-3 gap-1">
          <div></div>
          <button
            className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
            onTouchStart={() => handleButtonPress('ArrowUp')}
            onTouchEnd={() => handleButtonRelease('ArrowUp')}
          >
            ↑
          </button>
          <div></div>
          
          <button
            className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
            onTouchStart={() => handleButtonPress('ArrowLeft')}
            onTouchEnd={() => handleButtonRelease('ArrowLeft')}
          >
            ←
          </button>
          <div className="bg-gray-800 p-4 rounded"></div>
          <button
            className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
            onTouchStart={() => handleButtonPress('ArrowRight')}
            onTouchEnd={() => handleButtonRelease('ArrowRight')}
          >
            →
          </button>
          
          <div></div>
          <button
            className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
            onTouchStart={() => handleButtonPress('ArrowDown')}
            onTouchEnd={() => handleButtonRelease('ArrowDown')}
          >
            ↓
          </button>
          <div></div>
        </div>
        
        {/* アクションボタン */}
        <div className="col-span-3 grid grid-cols-2 gap-2">
          <button
            className="bg-red-600 text-white p-4 rounded-full active:bg-red-500 text-lg font-bold"
            onTouchStart={() => handleButtonPress(' ')}
            onTouchEnd={() => handleButtonRelease(' ')}
          >
            A
          </button>
          <button
            className="bg-blue-600 text-white p-4 rounded-full active:bg-blue-500 text-lg font-bold"
            onTouchStart={() => handleButtonPress('Enter')}
            onTouchEnd={() => handleButtonRelease('Enter')}
          >
            B
          </button>
        </div>
      </div>
      
      <div className="text-center mt-2 text-white text-xs">
        十字キー: 移動  A: ジャンプ  B: 決定
      </div>
    </div>
  )
}