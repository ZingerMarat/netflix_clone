import React, { useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

const SignIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const loginHandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:3000/auth/login", { username, password })
      if (res.status === 200) {
        navigate("/")
      }
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
        <h1 className="text-3xl font-medium text-white mb-7">Sign In</h1>

        <form className="flex flex-col gap-5">
          <input
            type="text"
            value={username}
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base outline-none focus:ring-0"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base outline-none focus:ring-0"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-[#e50914] text-white py-2 rounded hover:opacity-90 cursor-pointer"
            onClick={loginHandler}
          >
            Sign In
          </button>
        </form>

        <div className="flex flex-center mt-10 text-[#737373] text-sm">
          <p>
            New to ZingerFlix?
            <span
              onClick={() => navigate("/signup")}
              className="text-white font-medium cursor-pointer ml-2 hover:underline"
            >
              Sign Up Now
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
