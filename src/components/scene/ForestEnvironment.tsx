import { useRef, useMemo } from 'react'
import * as THREE from 'three'

export function ForestEnvironment() {
  const grassRef = useRef<THREE.InstancedMesh>(null)
  const treeRef = useRef<THREE.Group>(null)
  
  // 草のインスタンスを生成
  useMemo(() => {
    if (!grassRef.current) return
    
    const dummy = new THREE.Object3D()
    const count = 500
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40
      const z = (Math.random() - 0.5) * 40
      const scale = 0.5 + Math.random() * 0.5
      
      dummy.position.set(x, 0, z)
      dummy.scale.set(scale, scale, scale)
      dummy.rotation.y = Math.random() * Math.PI * 2
      dummy.updateMatrix()
      
      grassRef.current.setMatrixAt(i, dummy.matrix)
    }
    
    grassRef.current.instanceMatrix.needsUpdate = true
  }, [])
  
  // 木を生成
  const createTree = (x: number, z: number, scale = 1) => {
    return (
      <group key={`tree-${x}-${z}`} position={[x, 0, z]} scale={scale}>
        {/* 幹 */}
        <mesh castShadow receiveShadow position={[0, 1, 0]}>
          <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>
        
        {/* 葉（3段） */}
        <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
          <coneGeometry args={[1.5, 2, 8]} />
          <meshStandardMaterial color="#228b22" roughness={0.9} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 3.5, 0]}>
          <coneGeometry args={[1.2, 1.5, 8]} />
          <meshStandardMaterial color="#32cd32" roughness={0.9} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 4.3, 0]}>
          <coneGeometry args={[0.8, 1, 8]} />
          <meshStandardMaterial color="#3cb371" roughness={0.9} />
        </mesh>
      </group>
    )
  }
  
  // 岩を生成
  const createRock = (x: number, z: number, scale = 1) => {
    return (
      <mesh 
        key={`rock-${x}-${z}`} 
        position={[x, scale * 0.3, z]} 
        scale={scale}
        castShadow 
        receiveShadow
      >
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial 
          color="#808080" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    )
  }
  
  // 花を生成
  const createFlower = (x: number, z: number, color: string) => {
    return (
      <group key={`flower-${x}-${z}`} position={[x, 0.2, z]}>
        {/* 茎 */}
        <mesh>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
          <meshStandardMaterial color="#228b22" />
        </mesh>
        {/* 花びら */}
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      </group>
    )
  }
  
  return (
    <>
      {/* 地面（草原） */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#3a7c3a" roughness={0.9} />
      </mesh>
      
      {/* 草のパーティクル（簡易版） */}
      <instancedMesh
        ref={grassRef}
        args={[undefined, undefined, 500]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[0.05, 0.3, 4]} />
        <meshStandardMaterial color="#4a7c4a" />
      </instancedMesh>
      
      {/* 木々 */}
      <group ref={treeRef}>
        {createTree(10, 10, 1.2)}
        {createTree(-12, 8, 0.9)}
        {createTree(15, -5, 1.1)}
        {createTree(-8, -12, 1.3)}
        {createTree(5, 15, 0.8)}
        {createTree(-15, -3, 1.0)}
        {createTree(8, -10, 1.15)}
        {createTree(-10, 5, 0.95)}
      </group>
      
      {/* 岩 */}
      {createRock(7, 3, 0.8)}
      {createRock(-5, 7, 1.2)}
      {createRock(12, -8, 0.6)}
      {createRock(-9, -5, 0.9)}
      
      {/* 花 */}
      {createFlower(3, 2, '#ff6b6b')}
      {createFlower(-2, 4, '#4dabf7')}
      {createFlower(5, -3, '#ffd43b')}
      {createFlower(-4, -2, '#ff6b6b')}
      {createFlower(2, 6, '#a78bfa')}
      
      {/* 霧効果 */}
      <fog attach="fog" color="#f0f4f8" near={10} far={50} />
    </>
  )
}