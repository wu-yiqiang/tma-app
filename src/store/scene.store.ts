import { create } from 'zustand'

type Scene = 'loading' | 'registration' | 'dailyReward' | 'achievements' | 'tournament' | 'casino' | 'task' | 'stats' | 'settings' | 'betting' | 'game'

type SceneStore = {
  currentScene: Scene
  setCurrentScene: (scene: Scene) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  currentScene: 'loading',
  setCurrentScene: (scene: Scene) => set({ currentScene: scene })
}))
