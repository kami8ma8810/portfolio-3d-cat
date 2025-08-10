import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useNavigate } from '@tanstack/react-router'
import * as THREE from 'three'
import { useCatStore } from '../../stores/catStore'

interface CatItemProps {
  position: [number, number, number]
  label: string
  href: string
  type: 'yarn' | 'fish' | 'catnip' | 'toy'
}

export function CatItem({ position, label, href, type }: CatItemProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [isNear, setIsNear] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const catPosition = useCatStore((state) => state.position)
  
  useFrame((state) => {
    if (meshRef.current) {
      // 猫との距離を計算
      const distance = Math.sqrt(
        Math.pow(catPosition.x - position[0], 2) +
        Math.pow(catPosition.z - position[2], 2)
      )
      
      setIsNear(distance < 2)
      
      // アイテムのアニメーション
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.y = time * 0.5
      meshRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
    }
  })
  
  const handleClick = () => {
    if (isNear) {
      navigate({ to: href })
    }
  }
  
  const renderItem = () => {
    switch (type) {
      case 'yarn':
        // 毛糸玉
        return (
          <group>
            <mesh castShadow receiveShadow>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial color="#ff6b6b" roughness={0.8} />
            </mesh>
            {/* 毛糸の線 */}
            <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.2, 0.02, 8, 16]} />
              <meshStandardMaterial color="#ff4444" />
            </mesh>
          </group>
        )
      
      case 'fish':
        // 魚
        return (
          <group>
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
              <meshStandardMaterial color="#4dabf7" metalness={0.3} roughness={0.5} />
            </mesh>
            {/* 尾びれ */}
            <mesh position={[0, 0, 0.4]} rotation={[0, Math.PI / 2, 0]}>
              <coneGeometry args={[0.2, 0.3, 4]} />
              <meshStandardMaterial color="#339af0" />
            </mesh>
            {/* 目 */}
            <mesh position={[0.1, 0.1, -0.2]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        )
      
      case 'catnip':
        // またたび/キャットニップ
        return (
          <group>
            {/* 葉っぱ */}
            <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.3, 0.1, 0.1, 6]} />
              <meshStandardMaterial color="#51cf66" roughness={0.7} />
            </mesh>
            <mesh position={[0.2, 0.1, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <cylinderGeometry args={[0.2, 0.05, 0.1, 6]} />
              <meshStandardMaterial color="#40c057" roughness={0.7} />
            </mesh>
            {/* きらきら効果 */}
            <mesh position={[0, 0.3, 0]}>
              <octahedronGeometry args={[0.1, 0]} />
              <meshStandardMaterial 
                color="#ffffff" 
                emissive="#ffffff" 
                emissiveIntensity={0.3}
                opacity={0.8}
                transparent
              />
            </mesh>
          </group>
        )
      
      case 'toy':
        // おもちゃ（ネズミ）
        return (
          <group>
            {/* 体 */}
            <mesh castShadow receiveShadow>
              <capsuleGeometry args={[0.25, 0.4, 8, 16]} />
              <meshStandardMaterial color="#868e96" roughness={0.9} />
            </mesh>
            {/* 耳 */}
            <mesh position={[-0.15, 0.3, -0.1]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#fa5252" />
            </mesh>
            <mesh position={[0.15, 0.3, -0.1]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#fa5252" />
            </mesh>
            {/* しっぽ */}
            <mesh position={[0, -0.1, 0.4]} rotation={[Math.PI / 4, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.01, 0.3, 6]} />
              <meshStandardMaterial color="#495057" />
            </mesh>
          </group>
        )
      
      default:
        return null
    }
  }
  
  return (
    <group position={position}>
      <group 
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        {renderItem()}
      </group>
      
      {/* ラベル */}
      <Html
        position={[0, 1.5, 0]}
        center
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: isNear ? '#FBBF24' : '#666666',
          userSelect: 'none',
          textShadow: '0 0 8px rgba(0,0,0,0.8)',
          transition: 'color 0.3s'
        }}
      >
        {label}
      </Html>
      
      {/* 近づいたときの指示 */}
      {isNear && (
        <Html
          position={[0, -0.8, 0]}
          center
          style={{
            fontSize: '12px',
            color: '#FBBF24',
            userSelect: 'none',
            textShadow: '0 0 4px rgba(0,0,0,0.8)'
          }}
        >
          クリックで移動
        </Html>
      )}
    </group>
  )
}