import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import { BlackCat } from './BlackCat'
import { CatItem } from './CatItem'
import { ForestEnvironment } from './ForestEnvironment'
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
          {/* 空 */}
          <Sky 
            distance={450000}
            sunPosition={[100, 20, 100]}
            inclination={0.6}
            azimuth={0.25}
          />
          
          {/* ライティング */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 20, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          
          {/* 森の環境 */}
          <ForestEnvironment />
          
          {/* 黒猫キャラクター */}
          <BlackCat />
          
          {/* 猫が好きなアイテム */}
          <CatItem
            position={[5, 0.5, 0]}
            label="Projects"
            href="/projects"
            type="yarn"
          />
          <CatItem
            position={[-5, 0.5, 0]}
            label="About"
            href="/about"
            type="fish"
          />
          <CatItem
            position={[0, 0.5, 5]}
            label="Blog"
            href="/blog"
            type="catnip"
          />
          <CatItem
            position={[0, 0.5, -5]}
            label="Contact"
            href="/contact"
            type="toy"
          />
          
          {/* カメラコントロール */}
          <CameraRig />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={3}
            maxDistance={15}
            target={[0, 0, 0]}
          />
          
          {/* 環境マッピング */}
          <Environment preset="forest" />
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