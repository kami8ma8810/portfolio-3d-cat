import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Box } from '@react-three/drei'
import { useNavigate } from '@tanstack/react-router'
import * as THREE from 'three'
import { useCatStore } from '../../stores/catStore'

interface HotspotProps {
  position: [number, number, number]
  label: string
  href: string
  color: string
}

export function Hotspot({ position, label, href, color }: HotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isNear, setIsNear] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const catPosition = useCatStore((state) => state.position)
  
  useFrame(() => {
    if (meshRef.current) {
      // 猫との距離を計算
      const distance = Math.sqrt(
        Math.pow(catPosition.x - position[0], 2) +
        Math.pow(catPosition.z - position[2], 2)
      )
      
      setIsNear(distance < 2)
      
      // 浮遊アニメーション
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.1
      meshRef.current.rotation.y += 0.01
    }
  })
  
  const handleClick = () => {
    if (isNear) {
      navigate({ to: href })
    }
  }
  
  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <meshStandardMaterial
          color={isHovered && isNear ? '#FFFFFF' : color}
          emissive={isNear ? color : '#000000'}
          emissiveIntensity={isNear ? 0.5 : 0}
        />
      </Box>
      
      {/* ラベル */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color={isNear ? '#FFFFFF' : '#666666'}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      
      {/* 近づいたときの指示 */}
      {isNear && (
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color="#FBBF24"
          anchorX="center"
          anchorY="middle"
        >
          クリックで移動
        </Text>
      )}
    </group>
  )
}