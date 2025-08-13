import React from "react"
import { Search } from "lucide-react"
import Logo from "../assets/logo.png"
import { Link } from "react-router"

function Navbar() {
  return (
    <nav className="bg-black text-gray-200 text-sm flex justify-between items-center p-4 h-20 space-x-4 md:text-[15px] font-medium text-nowrap">
      <label>
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="w-24 cursor-pointer brightness-150" />
        </Link>
      </label>

      <ul className="hidden xl:flex space-x-6">
        <Link to={"/"}>
          <li className="nav-list-item">Home</li>
        </Link>
        <Link to={"/tv_shows"}>
          <li className="nav-list-item">TV Shows</li>
        </Link>
        <Link to={"/movies"}>
          <li className="nav-list-item">Movies</li>
        </Link>
        <Link to={"/anime"}>
          <li className="nav-list-item">Anime</li>
        </Link>
        <Link to={"/games"}>
          <li className="nav-list-item">Games</li>
        </Link>
        <Link to={"/new_popular"}>
          <li className="nav-list-item">New & Popular</li>
        </Link>
        <Link to={"/upcoming"}>
          <li className="nav-list-item">Upcoming</li>
        </Link>
      </ul>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:inline-flex">
          <input type="text" className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none" placeholder="Search..." />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>
        <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer rounded-2xl">Get AI Movie Picks</button>
        <Link to={"/signin"}>
          <button className="border border-[#333333] px-5 py-2 text-white cursor-pointer rounded-2xl">Sign In</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
