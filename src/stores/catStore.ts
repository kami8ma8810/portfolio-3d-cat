import { create } from 'zustand'

interface Position {
  x: number
  y: number
  z: number
}

interface Velocity {
  x: number
  z: number
}

interface CatStore {
  position: Position
  velocity: Velocity
  updatePosition: () => void
  setPosition: (position: Position) => void
  setVelocity: (velocity: Velocity) => void
}

export const useCatStore = create<CatStore>((set, get) => ({
  position: { x: 0, y: 0.5, z: 0 },
  velocity: { x: 0, z: 0 },
  
  updatePosition: () => {
    const { position, velocity } = get()
    set({
      position: {
        x: Math.max(-9, Math.min(9, position.x + velocity.x)),
        y: position.y,
        z: Math.max(-9, Math.min(9, position.z + velocity.z)),
      },
    })
  },
  
  setPosition: (position) => set({ position }),
  setVelocity: (velocity) => set({ velocity }),
}))