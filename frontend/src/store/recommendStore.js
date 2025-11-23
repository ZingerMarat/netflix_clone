import { create } from "zustand"

export const useRecommendStore = create((set) => ({
  storedRecommendations: [],
  setStoredRecommendations: (movies) => set({ storedRecommendations: movies }),
  clearStoredRecommendations: () => set({ storedRecommendations: [] }),
}))
