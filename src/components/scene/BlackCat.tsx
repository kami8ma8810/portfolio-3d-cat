import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useCatStore } from '../../stores/catStore'

// 一時的なプロシージャルな黒猫
export function BlackCat() {
  const meshRef = useRef<THREE.Group>(null)
  const { position, velocity, updatePosition } = useCatStore()
  const [walkAnimation, setWalkAnimation] = useState(false)
  
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
      const speed = 0.05
      
      if (keys['w'] || keys['arrowup']) newVelocity.z = -speed
      if (keys['s'] || keys['arrowdown']) newVelocity.z = speed
      if (keys['a'] || keys['arrowleft']) newVelocity.x = -speed
      if (keys['d'] || keys['arrowright']) newVelocity.x = speed
      
      useCatStore.setState({ velocity: newVelocity })
      setWalkAnimation(newVelocity.x !== 0 || newVelocity.z !== 0)
    }
    
    const interval = setInterval(updateVelocity, 16)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      clearInterval(interval)
    }
  }, [])
  
  // 位置の更新とアニメーション
  useFrame((state) => {
    if (meshRef.current) {
      updatePosition()
      meshRef.current.position.set(position.x, position.y, position.z)
      
      // 移動方向に回転
      if (velocity.x !== 0 || velocity.z !== 0) {
        const angle = Math.atan2(velocity.x, velocity.z)
        meshRef.current.rotation.y = angle
      }
      
      // 歩行アニメーション（上下の動き）
      if (walkAnimation) {
        const time = state.clock.getElapsedTime()
        meshRef.current.position.y = position.y + Math.abs(Math.sin(time * 10)) * 0.05
      }
    }
  })
  
  return (
    <group ref={meshRef}>
      {/* 胴体 */}
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* 頭 */}
      <mesh position={[0, 0.5, -0.3]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* 耳 */}
      <mesh position={[-0.15, 0.7, -0.3]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.1, 0.2, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, 0.7, -0.3]} rotation={[0, 0, 0.3]} castShadow>
        <coneGeometry args={[0.1, 0.2, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* 目（光る） */}
      <mesh position={[-0.1, 0.5, -0.5]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={0.5} 
        />
      </mesh>
      <mesh position={[0.1, 0.5, -0.5]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00" 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* しっぽ */}
      <group position={[0, 0.2, 0.5]}>
        <mesh rotation={[Math.PI / 4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.02, 0.8, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </mesh>
      </group>
      
      {/* 前足 */}
      <mesh position={[-0.15, -0.3, -0.2]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.3, -0.2]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      
      {/* 後ろ足 */}
      <mesh position={[-0.15, -0.3, 0.2]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, -0.3, 0.2]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  )
}