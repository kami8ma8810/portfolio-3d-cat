import { useFrame, useThree } from '@react-three/fiber'
import { useCatStore } from '../../stores/catStore'

export function CameraRig() {
  const { camera } = useThree()
  const catPosition = useCatStore((state) => state.position)
  
  useFrame(() => {
    // カメラが猫を追従
    const targetX = catPosition.x
    const targetZ = catPosition.z + 10
    
    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.z += (targetZ - camera.position.z) * 0.05
    
    // カメラが猫を見る
    camera.lookAt(catPosition.x, 0, catPosition.z)
  })
  
  return null
}