import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  forceLiteMode: boolean
  setForceLiteMode: (force: boolean) => void
  toggleMode: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      forceLiteMode: false,
      setForceLiteMode: (force) => set({ forceLiteMode: force }),
      toggleMode: () => set({ forceLiteMode: !get().forceLiteMode }),
    }),
    {
      name: 'ui-preferences',
    }
  )
)