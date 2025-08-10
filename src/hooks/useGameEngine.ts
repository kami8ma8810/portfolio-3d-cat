import { useEffect, useRef, useState, useCallback } from 'react'

export interface GameObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  velocityX: number
  velocityY: number
  type: 'player' | 'platform' | 'portal' | 'enemy' | 'item'
  sprite?: string
  animation?: string
  grounded?: boolean
  friction?: number
  bounce?: number
  mass?: number
  collisionBox?: {
    offsetX: number
    offsetY: number
    width: number
    height: number
  }
}

export interface GameState {
  objects: GameObject[]
  camera: { x: number; y: number }
  playerState: {
    isJumping: boolean
    isGrounded: boolean
    facingRight: boolean
    canDoubleJump: boolean
  }
}

interface UseGameEngineProps {
  width: number
  height: number
  gravity?: number
  jumpPower?: number
  moveSpeed?: number
  maxSpeed?: number
  acceleration?: number
  airControl?: number
}

export function useGameEngine({
  width,
  height,
  gravity = 0.5,
  jumpPower = 12,
  moveSpeed = 5,
  maxSpeed = 8,
  acceleration = 0.5,
  airControl = 0.3,
}: UseGameEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>({
    objects: [],
    camera: { x: 0, y: 0 },
    playerState: {
      isJumping: false,
      isGrounded: true,
      facingRight: true,
      canDoubleJump: true,
    },
  })
  
  const keysPressed = useRef<{ [key: string]: boolean }>({})
  
  // キー入力処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true
      
      // スペースキーまたはエンターキーでアクション
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
      }
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
  
  // 衝突検出
  const checkCollision = useCallback((a: GameObject, b: GameObject) => {
    const aBox = a.collisionBox || { offsetX: 0, offsetY: 0, width: a.width, height: a.height }
    const bBox = b.collisionBox || { offsetX: 0, offsetY: 0, width: b.width, height: b.height }
    
    return (
      a.x + aBox.offsetX < b.x + bBox.offsetX + bBox.width &&
      a.x + aBox.offsetX + aBox.width > b.x + bBox.offsetX &&
      a.y + aBox.offsetY < b.y + bBox.offsetY + bBox.height &&
      a.y + aBox.offsetY + aBox.height > b.y + bBox.offsetY
    )
  }, [])
  
  // ゲームループ
  useEffect(() => {
    let animationId: number
    
    const gameLoop = () => {
      setGameState(prevState => {
        const newState = { ...prevState }
        const player = newState.objects.find(obj => obj.type === 'player')
        
        if (player) {
          const currentAccel = newState.playerState.isGrounded ? acceleration : acceleration * airControl
          
          // 横移動（加速度ベース）
          if (keysPressed.current['arrowleft'] || keysPressed.current['a']) {
            player.velocityX -= currentAccel
            newState.playerState.facingRight = false
          } else if (keysPressed.current['arrowright'] || keysPressed.current['d']) {
            player.velocityX += currentAccel
            newState.playerState.facingRight = true
          } else {
            // 摩擦（地上と空中で異なる）
            const friction = newState.playerState.isGrounded ? 0.85 : 0.98
            player.velocityX *= friction
          }
          
          // 速度制限
          player.velocityX = Math.max(-maxSpeed, Math.min(maxSpeed, player.velocityX))
          
          // ジャンプ
          if ((keysPressed.current['arrowup'] || keysPressed.current['w'] || keysPressed.current[' ']) && 
              (newState.playerState.isGrounded || newState.playerState.canDoubleJump)) {
            if (!newState.playerState.isGrounded && newState.playerState.canDoubleJump) {
              newState.playerState.canDoubleJump = false
              player.velocityY = -jumpPower * 0.8 // ダブルジャンプは少し弱く
            } else {
              player.velocityY = -jumpPower
            }
            newState.playerState.isJumping = true
            newState.playerState.isGrounded = false
          }
          
          // 重力適用（ターミナルベロシティあり）
          player.velocityY += gravity
          player.velocityY = Math.min(player.velocityY, 15) // 最大落下速度
          
          // 位置更新（前の位置を保存）
          const prevX = player.x
          const prevY = player.y
          player.x += player.velocityX
          player.y += player.velocityY
          
          // プラットフォームとの衝突チェック（改善版）
          let grounded = false
          newState.objects.forEach(obj => {
            if (obj.type === 'platform' && obj !== player) {
              if (checkCollision(player, obj)) {
                const overlapX = Math.min(
                  player.x + player.width - obj.x,
                  obj.x + obj.width - player.x
                )
                const overlapY = Math.min(
                  player.y + player.height - obj.y,
                  obj.y + obj.height - player.y
                )
                
                // より小さい重なりの方向から離す
                if (overlapX < overlapY) {
                  // 横方向の衝突
                  if (prevX < obj.x) {
                    player.x = obj.x - player.width
                  } else {
                    player.x = obj.x + obj.width
                  }
                  player.velocityX = 0
                } else {
                  // 縦方向の衝突
                  if (prevY < obj.y) {
                    // 上から落ちてきた
                    player.y = obj.y - player.height
                    player.velocityY = 0
                    grounded = true
                  } else {
                    // 下から跳ねた
                    player.y = obj.y + obj.height
                    player.velocityY = 0
                  }
                }
              }
            }
          })
          
          newState.playerState.isGrounded = grounded
          if (grounded) {
            newState.playerState.canDoubleJump = true
            newState.playerState.isJumping = false
          }
          
          // カメラ追従
          newState.camera.x = player.x - width / 2
          newState.camera.y = player.y - height / 2
          
          // 画面外に落ちた場合のリセット
          if (player.y > height * 2) {
            player.x = 100
            player.y = 100
            player.velocityY = 0
          }
        }
        
        return newState
      })
      
      animationId = requestAnimationFrame(gameLoop)
    }
    
    gameLoop()
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [width, height, gravity, jumpPower, moveSpeed, maxSpeed, acceleration, airControl, checkCollision])
  
  return {
    canvasRef,
    gameState,
    setGameState,
    keysPressed: keysPressed.current,
  }
}