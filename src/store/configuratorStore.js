import { create } from 'zustand'

const defaultZones = {
  sleeves: '#ffffff',
  chest: '#ffffff',
  back: '#ffffff',
  collar: '#ffffff',
  shorts_left: '#ffffff',
  shorts_right: '#ffffff',
}

export const useConfiguratorStore = create((set, get) => ({
  colors: defaultZones,
  patternUrl: null,
  history: [],
  future: [],

  setColorZone: (zone, color) => {
    const { colors, history } = get()
    set({
      history: [...history, colors],
      future: [],
      colors: { ...colors, [zone]: color },
    })
  },

  setPatternUrl: (url) => set({ patternUrl: url }),

  undo: () => {
    const { history, future, colors } = get()
    if (history.length === 0) return
    const prev = history[history.length - 1]
    set({
      colors: prev,
      history: history.slice(0, -1),
      future: [colors, ...future],
    })
  },

  redo: () => {
    const { history, future, colors } = get()
    if (future.length === 0) return
    const next = future[0]
    set({
      colors: next,
      history: [...history, colors],
      future: future.slice(1),
    })
  },

  reset: () => set({ colors: defaultZones, history: [], future: [] }),
}))
