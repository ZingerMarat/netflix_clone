import React from "react"
import { Search, Menu, X } from "lucide-react"
import { useState } from "react"
import Logo from "../assets/logo.png"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore.js"
import toast from "react-hot-toast"

function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const linkClass = ({ isActive }) => (isActive ? "text-[#e50914] nav-list-item" : "nav-list-item")

  const handleLogout = async () => {
    const { message } = await logout()
    toast.success(message)
    setIsMenuOpen(false)
    navigate("/")
  }

  return (
    <nav className="bg-black text-gray-200 text-sm flex justify-between items-center p-4 h-20 space-x-4 md:text-[15px] font-medium text-nowrap relative">
      <div className="flex items-center space-x-3">
        <button
          className="inline-flex items-center justify-center p-1 rounded-md border border-[#333333] text-white xl:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <label className="hidden sm:flex flex-shrink-0">
          <Link to={"/"}>
            <img src={Logo} alt="logo" className="w-24 cursor-pointer brightness-150" />
          </Link>
        </label>
      </div>

      <ul className="hidden xl:flex space-x-6">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/tv_shows" className={linkClass}>
          TV Shows
        </NavLink>
        <NavLink to="/movies" className={linkClass}>
          Movies
        </NavLink>
        <NavLink to="/new" className={linkClass}>
          New
        </NavLink>
        <NavLink to="/popular" className={linkClass}>
          Popular
        </NavLink>
        <NavLink to="/upcoming" className={linkClass}>
          Upcoming
        </NavLink>
      </ul>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full xl:hidden z-30  bg-[#e50914]/1 backdrop-blur-sm  text-white py-3 px-4 cursor-pointer text-sm md:text-base transition flex-none">
          <ul className="flex flex-col space-y-3 p-4">
            <NavLink to="/home" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/tv_shows" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              TV Shows
            </NavLink>
            <NavLink to="/movies" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Movies
            </NavLink>
            <NavLink to="/new" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              New
            </NavLink>
            <NavLink to="/popular" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Popular
            </NavLink>
            <NavLink to="/upcoming" className={linkClass} onClick={() => setIsMenuOpen(false)}>
              Upcoming
            </NavLink>
            {!user ? (
              <NavLink to="/signin" className={linkClass} onClick={() => setIsMenuOpen(false)}>
                Sign In
              </NavLink>
            ) : (
              <button type="button" onClick={handleLogout} className="nav-list-item text-left">
                Log Out
              </button>
            )}
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <div className="relative inline-flex">
          <input
            type="text"
            className="bg-[#333333] px-4 py-2 rounded-full min-w-[20px] sm:min-w-36 md:min-w-40 pr-10 outline-none"
            placeholder="Search..."
          />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>
        <button
          onClick={() => {
            user ? navigate("/ai-picks") : navigate("/signin")
          }}
          className="bg-[#e50914] px-5 py-2 text-white cursor-pointer rounded-2xl min-w-[10px] sm:min-w-36 md:min-w-40"
        >
          AI Picks
        </button>

        <div className="hidden xl:flex">
          {!user ? (
            <button
              onClick={() => {
                navigate("/signin")
              }}
              className="border border-[#333333] px-5 py-2 text-white cursor-pointer rounded-2xl"
            >
              Sign In
            </button>
          ) : (
            <div className="flex items-center space-x-4 text-white">
              <button
                type="button"
                onClick={handleLogout}
                className="border border-[#333333] px-5 py-2 text-white cursor-pointer rounded-2xl"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
