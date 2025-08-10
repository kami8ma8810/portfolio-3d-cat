import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box } from '@react-three/drei'
import * as THREE from 'three'
import { useCatStore } from '../../stores/catStore'

export function Cat() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { position, velocity, updatePosition } = useCatStore()
  
  // キーボード入力の処理
  useEffect(() => {
    const keys: { [key: string]: boolean } = {}
    
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true
    }
    
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false
    }
    
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    
    const updateVelocity = () => {
      const newVelocity = { x: 0, z: 0 }
      const speed = 0.1
      
      if (keys['w'] || keys['arrowup']) newVelocity.z = -speed
      if (keys['s'] || keys['arrowdown']) newVelocity.z = speed
      if (keys['a'] || keys['arrowleft']) newVelocity.x = -speed
      if (keys['d'] || keys['arrowright']) newVelocity.x = speed
      
      useCatStore.setState({ velocity: newVelocity })
    }
    
    const interval = setInterval(updateVelocity, 16)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(interval)
    }
  }, [])
  
  // 位置の更新
  useFrame(() => {
    if (meshRef.current) {
      updatePosition()
      meshRef.current.position.set(position.x, position.y, position.z)
      
      // 移動方向に回転
      if (velocity.x !== 0 || velocity.z !== 0) {
        const angle = Math.atan2(velocity.x, velocity.z)
        meshRef.current.rotation.y = angle
      }
    }
  })
  
  return (
    <group>
      <Box
        ref={meshRef}
        args={[0.8, 1, 0.8]}
        position={[position.x, position.y, position.z]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#333" />
      </Box>
      {/* 顔のパーツ（仮） */}
      <Box
        args={[0.3, 0.3, 0.1]}
        position={[position.x, position.y + 0.3, position.z - 0.45]}
      >
        <meshStandardMaterial color="#FBBF24" />
      </Box>
    </group>
  )
}