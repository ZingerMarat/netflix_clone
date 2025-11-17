import { create } from "zustand"
import axios from "axios"

axios.defaults.withCredentials = true

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
      const res = await axios.post("http://localhost:3000/auth/signup", {
        username,
        email,
        password,
      })

      set({ user: res.data.user, isLoading: false })
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message || "Error Signing up" })
      throw error
    }
  },
}))
