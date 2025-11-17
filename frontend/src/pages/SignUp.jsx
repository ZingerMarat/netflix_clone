import React, { useState } from "react"
import { useNavigate } from "react-router"
import { useAuthStore } from "../store/authStore.js"

const SignUp = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, isLoading, error } = useAuthStore()

  const signUpHandler = async (e) => {
    e.preventDefault()

    try {
      await signup(username, email, password)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgb(0,0,0,0.5), rgba(0,0,0,0.5)), url(/background_banner.jpg)",
      }}
    >
      <div className="max-w-[450px] w-full bg-black/70 px-8 py-10 mx-auto">
        <h1 className="text-3xl font-medium text-white mb-7">Sign Up</h1>

        <form onSubmit={signUpHandler} className="flex flex-col gap-5">
          <input
            type="text"
            value={username}
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base outline-none focus:ring-0"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={email}
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base outline-none focus:ring-0"
            placeholder="username@zingerflix.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base outline-none focus:ring-0"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e50914] text-white py-2 rounded hover:opacity-90 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="flex flex-center mt-10 text-[#737373] text-sm">
          <p>
            Already have an account?
            <span
              onClick={() => navigate("/signin")}
              className="text-white font-medium cursor-pointer ml-2 hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
