import { useEffect, useRef, useState } from 'react'
import { useGameEngine, GameObject } from '../../hooks/useGameEngine'
import { GameController } from './GameController'
import { useNavigate } from '@tanstack/react-router'

const STAGE_WIDTH = 1200
const STAGE_HEIGHT = 400

export function Game2D() {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const [nearPortal, setNearPortal] = useState<string | null>(null)
  const { canvasRef, gameState, setGameState, keysPressed } = useGameEngine({
    width: window.innerWidth,
    height: window.innerHeight,
    jumpPower: 20,  // ジャンプ力をさらに上げる
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
        y: window.innerHeight - 50,
        width: STAGE_WIDTH * 2,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      // プラットフォーム
      {
        id: 'platform1',
        x: 300,
        y: window.innerHeight - 200,
        width: 150,
        height: 20,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      {
        id: 'platform2',
        x: 550,
        y: window.innerHeight - 300,
        width: 150,
        height: 20,
        velocityX: 0,
        velocityY: 0,
        type: 'platform',
      },
      {
        id: 'platform3',
        x: 800,
        y: window.innerHeight - 200,
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
        y: window.innerHeight - 250,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
      {
        id: 'portal-about',
        x: 600,
        y: window.innerHeight - 350,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
      {
        id: 'portal-blog',
        x: 850,
        y: window.innerHeight - 250,
        width: 50,
        height: 50,
        velocityX: 0,
        velocityY: 0,
        type: 'portal',
      },
      {
        id: 'portal-contact',
        x: 1050,
        y: window.innerHeight - 100,
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
            const isMoving = Math.abs(obj.velocityX) > 0.5
            const isJumping = !gameState.playerState.isGrounded
            const walkCycle = Date.now() * 0.01
            
            if (isMoving && !isJumping) {
              // 歩行中は立って歩く姿勢
              ctx.save()
              ctx.translate(obj.x + obj.width / 2, obj.y + obj.height)
              
              // 体（立っている姿勢）
              ctx.fillStyle = '#1a1a1a'
              ctx.beginPath()
              ctx.ellipse(0, -25, 15, 20, 0, 0, Math.PI * 2)
              ctx.fill()
              
              // 頭
              ctx.beginPath()
              ctx.arc(
                gameState.playerState.facingRight ? 5 : -5,
                -35,
                10,
                0, Math.PI * 2
              )
              ctx.fill()
              
              // 耳
              const earDir = gameState.playerState.facingRight ? 1 : -1
              ctx.beginPath()
              ctx.moveTo(-6 * earDir, -40)
              ctx.lineTo(-10 * earDir, -48)
              ctx.lineTo(-2 * earDir, -43)
              ctx.closePath()
              ctx.fill()
              
              ctx.beginPath()
              ctx.moveTo(6 * earDir, -40)
              ctx.lineTo(10 * earDir, -48)
              ctx.lineTo(2 * earDir, -43)
              ctx.closePath()
              ctx.fill()
              
              // 目
              ctx.fillStyle = '#00ff00'
              ctx.shadowBlur = 3
              ctx.shadowColor = '#00ff00'
              const eyeX = gameState.playerState.facingRight ? 8 : -8
              ctx.beginPath()
              ctx.arc(eyeX, -35, 2, 0, Math.PI * 2)
              ctx.fill()
              ctx.beginPath()
              ctx.arc(eyeX - 6 * earDir, -35, 2, 0, Math.PI * 2)
              ctx.fill()
              ctx.shadowBlur = 0
              
              // 前足（歩行アニメーション）
              ctx.strokeStyle = '#1a1a1a'
              ctx.lineWidth = 5
              ctx.lineCap = 'round'
              
              // 左前足
              ctx.beginPath()
              ctx.moveTo(-5, -15)
              const leftFrontAngle = Math.sin(walkCycle) * 0.3
              ctx.lineTo(-5 + Math.sin(leftFrontAngle) * 10, -5 + Math.cos(leftFrontAngle) * 10)
              ctx.stroke()
              
              // 右前足
              ctx.beginPath()
              ctx.moveTo(5, -15)
              const rightFrontAngle = Math.sin(walkCycle + Math.PI) * 0.3
              ctx.lineTo(5 + Math.sin(rightFrontAngle) * 10, -5 + Math.cos(rightFrontAngle) * 10)
              ctx.stroke()
              
              // 後ろ足
              // 左後ろ足
              ctx.beginPath()
              ctx.moveTo(-5, -10)
              const leftBackAngle = Math.sin(walkCycle + Math.PI) * 0.3
              ctx.lineTo(-5 + Math.sin(leftBackAngle) * 10, Math.cos(leftBackAngle) * 10)
              ctx.stroke()
              
              // 右後ろ足
              ctx.beginPath()
              ctx.moveTo(5, -10)
              const rightBackAngle = Math.sin(walkCycle) * 0.3
              ctx.lineTo(5 + Math.sin(rightBackAngle) * 10, Math.cos(rightBackAngle) * 10)
              ctx.stroke()
              
              // しっぽ
              ctx.beginPath()
              ctx.moveTo(-10 * earDir, -20)
              const tailWave = Math.sin(walkCycle * 0.5) * 10
              ctx.quadraticCurveTo(
                -20 * earDir, -25 + tailWave,
                -30 * earDir, -30
              )
              ctx.stroke()
              
              ctx.restore()
            } else {
              // 静止中またはジャンプ中（元のデザイン）
              // 体（楕円形）
              ctx.fillStyle = '#1a1a1a'
              ctx.beginPath()
              ctx.ellipse(
                obj.x + obj.width / 2, 
                obj.y + obj.height / 2 + 5, 
                obj.width / 2 - 2, 
                obj.height / 2 - 5,
                0, 0, Math.PI * 2
              )
              ctx.fill()
              
              // 頭（円形）
              ctx.beginPath()
              ctx.arc(
                obj.x + obj.width / 2 + (gameState.playerState.facingRight ? 5 : -5), 
                obj.y + 12,
                12,
                0, Math.PI * 2
              )
              ctx.fill()
              
              // 耳（三角形）
              ctx.fillStyle = '#1a1a1a'
              const earOffset = gameState.playerState.facingRight ? 5 : -5
              
              // 左耳
              ctx.beginPath()
              ctx.moveTo(obj.x + obj.width / 2 - 8 + earOffset, obj.y + 8)
              ctx.lineTo(obj.x + obj.width / 2 - 12 + earOffset, obj.y - 2)
              ctx.lineTo(obj.x + obj.width / 2 - 4 + earOffset, obj.y + 2)
              ctx.closePath()
              ctx.fill()
              
              // 右耳
              ctx.beginPath()
              ctx.moveTo(obj.x + obj.width / 2 + 8 + earOffset, obj.y + 8)
              ctx.lineTo(obj.x + obj.width / 2 + 12 + earOffset, obj.y - 2)
              ctx.lineTo(obj.x + obj.width / 2 + 4 + earOffset, obj.y + 2)
              ctx.closePath()
              ctx.fill()
              
              // 目（緑色）
              ctx.fillStyle = '#00ff00'
              ctx.shadowBlur = 3
              ctx.shadowColor = '#00ff00'
              
              if (gameState.playerState.facingRight) {
                // 右向き
                ctx.beginPath()
                ctx.arc(obj.x + obj.width / 2 + 8, obj.y + 10, 2, 0, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(obj.x + obj.width / 2 + 2, obj.y + 10, 2, 0, Math.PI * 2)
                ctx.fill()
              } else {
                // 左向き
                ctx.beginPath()
                ctx.arc(obj.x + obj.width / 2 - 8, obj.y + 10, 2, 0, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(obj.x + obj.width / 2 - 2, obj.y + 10, 2, 0, Math.PI * 2)
                ctx.fill()
              }
              
              ctx.shadowBlur = 0
              
              // しっぽ（動きに応じて変化）
              ctx.strokeStyle = '#1a1a1a'
              ctx.lineWidth = 6
              ctx.lineCap = 'round'
              ctx.beginPath()
              
              const tailBase = {
                x: obj.x + (gameState.playerState.facingRight ? 5 : obj.width - 5),
                y: obj.y + obj.height - 10
              }
              
              if (isJumping) {
                // ジャンプ中は上向き
                ctx.moveTo(tailBase.x, tailBase.y)
                ctx.quadraticCurveTo(
                  tailBase.x + (gameState.playerState.facingRight ? -15 : 15),
                  tailBase.y - 10,
                  tailBase.x + (gameState.playerState.facingRight ? -20 : 20),
                  tailBase.y - 20
                )
              } else {
                // 静止中は垂れ下がる
                ctx.moveTo(tailBase.x, tailBase.y)
                ctx.quadraticCurveTo(
                  tailBase.x + (gameState.playerState.facingRight ? -10 : 10),
                  tailBase.y + 10,
                  tailBase.x + (gameState.playerState.facingRight ? -20 : 20),
                  tailBase.y + 5
                )
              }
              
              ctx.stroke()
              
              // 足（4本）
              ctx.fillStyle = '#1a1a1a'
              ctx.lineWidth = 3
              
              // 前足
              ctx.beginPath()
              ctx.ellipse(obj.x + 10, obj.y + obj.height - 3, 4, 6, 0, 0, Math.PI * 2)
              ctx.fill()
              ctx.beginPath()
              ctx.ellipse(obj.x + 18, obj.y + obj.height - 3, 4, 6, 0, 0, Math.PI * 2)
              ctx.fill()
              
              // 後ろ足
              ctx.beginPath()
              ctx.ellipse(obj.x + 25, obj.y + obj.height - 3, 4, 6, 0, 0, Math.PI * 2)
              ctx.fill()
              ctx.beginPath()
              ctx.ellipse(obj.x + 33, obj.y + obj.height - 3, 4, 6, 0, 0, Math.PI * 2)
              ctx.fill()
            }
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
            // 猫が好きなものとして描画
            const portalThemes: { [key: string]: { color: string, icon: string } } = {
              'portal-projects': { color: '#ff6b6b', icon: '🐟' }, // 魚
              'portal-about': { color: '#4dabf7', icon: '🧶' }, // 毛糸玉
              'portal-blog': { color: '#51cf66', icon: '🌿' }, // またたび
              'portal-contact': { color: '#ffd43b', icon: '📦' }, // ダンボール箱
            }
            
            const theme = portalThemes[obj.id] || { color: '#fff', icon: '?' }
            
            // ポータルが近くにある場合は光らせる
            if (nearPortal === obj.id) {
              ctx.shadowBlur = 20
              ctx.shadowColor = theme.color
            }
            
            // アイテムの描画
            switch (obj.id) {
              case 'portal-projects': // 魚
                ctx.fillStyle = '#e0e0e0'
                ctx.beginPath()
                ctx.ellipse(obj.x + obj.width / 2, obj.y + obj.height / 2, 20, 10, 0, 0, Math.PI * 2)
                ctx.fill()
                
                // 尾ひれ
                ctx.beginPath()
                ctx.moveTo(obj.x + obj.width / 2 - 20, obj.y + obj.height / 2)
                ctx.lineTo(obj.x + obj.width / 2 - 30, obj.y + obj.height / 2 - 10)
                ctx.lineTo(obj.x + obj.width / 2 - 30, obj.y + obj.height / 2 + 10)
                ctx.closePath()
                ctx.fill()
                
                // 目
                ctx.fillStyle = '#000'
                ctx.beginPath()
                ctx.arc(obj.x + obj.width / 2 + 10, obj.y + obj.height / 2 - 3, 2, 0, Math.PI * 2)
                ctx.fill()
                break
                
              case 'portal-about': // 毛糸玉
                // 毛糸玉本体
                ctx.strokeStyle = '#ff69b4'
                ctx.lineWidth = 2
                const centerX = obj.x + obj.width / 2
                const centerY = obj.y + obj.height / 2
                
                // 円形に巻かれた毛糸
                for (let i = 0; i < 10; i++) {
                  ctx.beginPath()
                  const angle = (i / 10) * Math.PI * 2
                  ctx.arc(centerX, centerY, 15, angle, angle + Math.PI * 1.5)
                  ctx.stroke()
                }
                
                // 垂れ下がる糸
                ctx.beginPath()
                ctx.moveTo(centerX + 15, centerY)
                ctx.quadraticCurveTo(centerX + 25, centerY + 10, centerX + 20, centerY + 20)
                ctx.stroke()
                break
                
              case 'portal-blog': // またたび
                // 葉っぱ
                ctx.fillStyle = '#228b22'
                ctx.beginPath()
                ctx.ellipse(obj.x + obj.width / 2 - 5, obj.y + obj.height / 2, 15, 8, -0.3, 0, Math.PI * 2)
                ctx.fill()
                ctx.beginPath()
                ctx.ellipse(obj.x + obj.width / 2 + 5, obj.y + obj.height / 2, 15, 8, 0.3, 0, Math.PI * 2)
                ctx.fill()
                
                // 茎
                ctx.strokeStyle = '#228b22'
                ctx.lineWidth = 3
                ctx.beginPath()
                ctx.moveTo(obj.x + obj.width / 2, obj.y + obj.height / 2 + 8)
                ctx.lineTo(obj.x + obj.width / 2, obj.y + obj.height / 2 - 10)
                ctx.stroke()
                break
                
              case 'portal-contact': // ダンボール箱
                // 箱本体
                ctx.fillStyle = '#d2691e'
                ctx.fillRect(obj.x + 10, obj.y + 15, 30, 25)
                
                // 箱の開いた部分
                ctx.fillStyle = '#8b4513'
                ctx.beginPath()
                ctx.moveTo(obj.x + 10, obj.y + 15)
                ctx.lineTo(obj.x + 5, obj.y + 10)
                ctx.lineTo(obj.x + 20, obj.y + 10)
                ctx.lineTo(obj.x + 25, obj.y + 15)
                ctx.closePath()
                ctx.fill()
                
                ctx.beginPath()
                ctx.moveTo(obj.x + 25, obj.y + 15)
                ctx.lineTo(obj.x + 30, obj.y + 10)
                ctx.lineTo(obj.x + 45, obj.y + 10)
                ctx.lineTo(obj.x + 40, obj.y + 15)
                ctx.closePath()
                ctx.fill()
                break
            }
            
            ctx.shadowBlur = 0
            ctx.globalAlpha = 1
            
            // ラベル
            ctx.fillStyle = '#000'
            ctx.font = nearPortal === obj.id ? 'bold 14px monospace' : '12px monospace'
            ctx.textAlign = 'center'
            const labels: { [key: string]: string } = {
              'portal-projects': 'Projects',
              'portal-about': 'About',
              'portal-blog': 'Blog',
              'portal-contact': 'Contact',
            }
            ctx.fillText(labels[obj.id] || '', obj.x + obj.width / 2, obj.y - 10)
            
            // Enterキーのヒント（近くにいる時だけ）
            if (nearPortal === obj.id) {
              ctx.font = '10px monospace'
              ctx.fillStyle = '#333'
              ctx.fillText('[Enter]', obj.x + obj.width / 2, obj.y + obj.height + 20)
            }
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
  }, [canvasRef, gameState, nearPortal])
  
  // ポータルとの衝突検出
  useEffect(() => {
    const player = gameState.objects.find(obj => obj.type === 'player')
    if (!player) return
    
    let foundNearPortal: string | null = null
    
    gameState.objects.forEach(obj => {
      if (obj.type === 'portal') {
        const distance = Math.sqrt(
          Math.pow(player.x - obj.x, 2) + Math.pow(player.y - obj.y, 2)
        )
        
        // ポータルに近づいているかチェック（Enterキーが押されているかは別）
        if (distance < 50) {
          foundNearPortal = obj.id
          
          // Enterキーが押された場合のみポータルに入る
          if (keysPressed['enter']) {
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
      }
    })
    
    setNearPortal(foundNearPortal)
  }, [gameState, keysPressed, navigate])
  
  // ウィンドウサイズに応じてキャンバスサイズを更新
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => window.removeEventListener('resize', handleResize)
  }, [canvasRef])

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* モバイル用コントローラー */}
      <GameController />
    </div>
  )
}