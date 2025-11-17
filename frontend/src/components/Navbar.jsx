import React from "react"
import { Search } from "lucide-react"
import Logo from "../assets/logo.png"
import { NavLink, Link } from "react-router"
import { useAuthStore } from "../store/authStore.js"

function Navbar() {
  const { user } = useAuthStore()

  const linkClass = ({ isActive }) => (isActive ? "text-[#e50914] nav-list-item" : "nav-list-item")

  return (
    <nav className="bg-black text-gray-200 text-sm flex justify-between items-center p-4 h-20 space-x-4 md:text-[15px] font-medium text-nowrap">
      <label>
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="w-24 cursor-pointer brightness-150" />
        </Link>
      </label>

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

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:inline-flex">
          <input
            type="text"
            className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none"
            placeholder="Search..."
          />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>
        <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer rounded-2xl">
          Get AI Movie Picks
        </button>

        {!user ? (
          <Link to={"/signin"}>
            <button className="border border-[#333333] px-5 py-2 text-white cursor-pointer rounded-2xl">
              Sign In
            </button>
          </Link>
        ) : (
          <div className="flex items-center space-x-4 text-white">
            <div>Hello, {user.username}</div>
            <button className="border border-[#333333] px-5 py-2 text-white cursor-pointer rounded-2xl">
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
