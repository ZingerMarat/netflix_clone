import { create } from "zustand"
import axios from "axios"

axios.defaults.withCredentials = true

const API = import.meta.env.VITE_API_BASE_URL

export const useAuthStore = create((set) => ({
  //initial states
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  //functions
  signup: async (username, email, password) => {
    set({ isLoading: true, message: null })

    try {
      const res = await axios.post(`${API}/auth/signup`, {
        username,
        email,
        password,
      })

      const { user, message } = res.data

      set({ user: user, message: message, isLoading: false })
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message || "Error Signing up" })
      throw error
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, message: null })

    try {
      const res = await axios.post(`${API}/auth/login`, {
        username,
        password,
      })

      const { user, message } = res.data

      set({ user: user, message: message, isLoading: false })
      return { user, message }
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message || "Error Log in" })
      throw error
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null })

    try {
      const res = await axios.get(`${API}/auth/me`)

      const { user } = res.data

      set({ user: user, fetchingUser: false })
    } catch (error) {
      set({
        user: null,
        fetchingUser: false,
        error: error.response.data.message || "Error fetching user",
      })
      throw error
    }
  },
}))
