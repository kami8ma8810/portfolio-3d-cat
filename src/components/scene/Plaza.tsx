import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { Cat } from './Cat'
import { Hotspot } from './Hotspot'
import { CameraRig } from './CameraRig'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Plaza() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="w-full h-screen relative">
      <Canvas
        frameloop={prefersReducedMotion ? 'demand' : 'always'}
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 10], fov: 50 }}
        shadows
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          
          {/* 地面 */}
          <Grid
            args={[20, 20]}
            cellSize={1}
            cellThickness={0.5}
            cellColor="#6f6f6f"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#FBBF24"
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
          />
          
          {/* 猫キャラクター */}
          <Cat />
          
          {/* ホットスポット */}
          <Hotspot
            position={[5, 1, 0]}
            label="Projects"
            href="/projects"
            color="#FBBF24"
          />
          <Hotspot
            position={[-5, 1, 0]}
            label="About"
            href="/about"
            color="#FBBF24"
          />
          <Hotspot
            position={[0, 1, 5]}
            label="Blog"
            href="/blog"
            color="#FBBF24"
          />
          <Hotspot
            position={[0, 1, -5]}
            label="Contact"
            href="/contact"
            color="#FBBF24"
          />
          
          {/* カメラコントロール */}
          <CameraRig />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={20}
          />
          
          {/* 環境 */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      
      {/* UI オーバーレイ */}
      <div className="absolute top-4 left-4 text-white">
        <h1 className="text-2xl font-bold mb-2">Cat-Quest Portfolio</h1>
        <p className="text-sm opacity-80">WASD/矢印キーで移動</p>
      </div>
    </div>
  )
}