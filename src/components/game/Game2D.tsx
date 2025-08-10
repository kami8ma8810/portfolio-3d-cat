import { useEffect, useRef } from 'react'
import { useGameEngine, GameObject } from '../../hooks/useGameEngine'
import { GameController } from './GameController'
import { useNavigate } from '@tanstack/react-router'

const STAGE_WIDTH = 1200
const STAGE_HEIGHT = 400

export function Game2D() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const { canvasRef, gameState, setGameState, keysPressed } = useGameEngine({
    width: 800,
    height: 400,
  })
  
  // 初期ステージセットアップ
  useEffect(() => {
    const initialObjects: GameObject[] = [
      // プレイヤー（黒猫）
      {
        id: 'player',
        x: 100,
        y: 200,
        width: 40,
        height: 40,
        velocityX: 0,
        velocityY: 0,
        type: 'player',
      },
      // 地面
      {
        id: 'ground',
        x: 0,
        y: 350,
        width: STAGE_WIDTH,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      // プラットフォーム
      {
        id: 'platform1',
        x: 300,
        y: 250,
        width: 150,
        height: 20,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      {
        id: 'platform2',
        x: 550,
        y: 180,
        width: 150,
        height: 20,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      {
        id: 'platform3',
        x: 800,
        y: 250,
        width: 150,
        height: 20,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      // ポータル（各コンテンツへ）
      {
        id: 'portal-projects',
        x: 350,
        y: 200,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
      {
        id: 'portal-about',
        x: 600,
        y: 130,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
      {
        id: 'portal-blog',
        x: 850,
        y: 200,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
      {
        id: 'portal-contact',
        x: 1050,
        y: 300,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
    ]
    
    setGameState(prev => ({ ...prev, objects: initialObjects }))
  }, [setGameState])
  
  // キャンバス描画
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const render = () => {
      // クリア
      ctx.fillStyle = '#87CEEB' // 空の色
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // カメラ変換
      ctx.save()
      ctx.translate(-gameState.camera.x, -gameState.camera.y)
      
      // 背景の雲
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(200, 100, 30, 0, Math.PI * 2)
      ctx.arc(230, 100, 35, 0, Math.PI * 2)
      ctx.arc(260, 100, 30, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.beginPath()
      ctx.arc(500, 80, 25, 0, Math.PI * 2)
      ctx.arc(525, 80, 30, 0, Math.PI * 2)
      ctx.arc(550, 80, 25, 0, Math.PI * 2)
      ctx.fill()
      
      // オブジェクト描画
      gameState.objects.forEach(obj => {
        switch (obj.type) {
          case 'player':
            // 黒猫
            ctx.fillStyle = '#1a1a1a'
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
            
            // 顔の向き
            ctx.fillStyle = '#00ff00'
            if (gameState.playerState.facingRight) {
              ctx.fillRect(obj.x + 25, obj.y + 10, 5, 5)
              ctx.fillRect(obj.x + 25, obj.y + 20, 5, 5)
            } else {
              ctx.fillRect(obj.x + 10, obj.y + 10, 5, 5)
              ctx.fillRect(obj.x + 10, obj.y + 20, 5, 5)
            }
            
            // 耳
            ctx.fillStyle = '#1a1a1a'
            ctx.beginPath()
            ctx.moveTo(obj.x + 5, obj.y)
            ctx.lineTo(obj.x + 10, obj.y - 10)
            ctx.lineTo(obj.x + 15, obj.y)
            ctx.closePath()
            ctx.fill()
            
            ctx.beginPath()
            ctx.moveTo(obj.x + 25, obj.y)
            ctx.lineTo(obj.x + 30, obj.y - 10)
            ctx.lineTo(obj.x + 35, obj.y)
            ctx.closePath()
            ctx.fill()
            break
            
          case 'platform':
            // 地面/プラットフォーム
            if (obj.id === 'ground') {
              ctx.fillStyle = '#8B4513' // 茶色
            } else {
              ctx.fillStyle = '#654321' // 濃い茶色
            }
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
            
            // 草のテクスチャ（地面のみ）
            if (obj.id === 'ground') {
              ctx.fillStyle = '#228b22'
              for (let i = 0; i < obj.width; i += 20) {
                ctx.fillRect(obj.x + i, obj.y, 15, 5)
              }
            }
            break
            
          case 'portal':
            // ポータル（渦巻き）
            const portalColors: { [key: string]: string } = {
              'portal-projects': '#ff6b6b',
              'portal-about': '#4dabf7',
              'portal-blog': '#51cf66',
              'portal-contact': '#ffd43b',
            }
            
            ctx.fillStyle = portalColors[obj.id] || '#fff'
            ctx.globalAlpha = 0.8
            ctx.beginPath()
            ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, obj.width / 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.globalAlpha = 1
            
            // ラベル
            ctx.fillStyle = '#000'
            ctx.font = '12px monospace'
            ctx.textAlign = 'center'
            const labels: { [key: string]: string } = {
              'portal-projects': 'Projects',
              'portal-about': 'About',
              'portal-blog': 'Blog',
              'portal-contact': 'Contact',
            }
            ctx.fillText(labels[obj.id] || '', obj.x + obj.width / 2, obj.y - 10)
            break
        }
      })
      
      ctx.restore()
      
      // UI（固定位置）
      ctx.fillStyle = '#000'
      ctx.font = '16px monospace'
      ctx.fillText('Cat-Quest Portfolio', 10, 25)
      ctx.font = '12px monospace'
      ctx.fillText('矢印キー/WASD: 移動  Space/↑: ジャンプ  Enter: 決定', 10, 45)
    }
    
    render()
  }, [canvasRef, gameState])
  
  // ポータルとの衝突検出
  useEffect(() => {
    const player = gameState.objects.find(obj => obj.type === 'player')
    if (!player) return
    
    gameState.objects.forEach(obj => {
      if (obj.type === 'portal') {
        const distance = Math.sqrt(
          Math.pow(player.x - obj.x, 2) + Math.pow(player.y - obj.y, 2)
        )
        
        if (distance < 50 && (keysPressed['enter'] || keysPressed[' '])) {
          // ポータルに入る
          const routes: { [key: string]: string } = {
            'portal-projects': '/projects',
            'portal-about': '/about',
            'portal-blog': '/blog',
            'portal-contact': '/contact',
          }
          
          if (routes[obj.id]) {
            navigate({ to: routes[obj.id] })
          }
        }
      }
    })
  }, [gameState, keysPressed, navigate])
  
  return (
    <div ref={containerRef} className="relative w-full h-screen bg-sky-200 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* モバイル用コントローラー */}
      <GameController />
    </div>
  )
}