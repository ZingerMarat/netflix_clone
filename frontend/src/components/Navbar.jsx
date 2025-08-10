import React from "react"
import { Search } from "lucide-react"
import Logo from "../assets/logo.png"

function Navbar() {
  return (
    <nav className="bg-black text-gray-200 text-sm flex justify-between items-center p-4 h-20 space-x-4 md:text-[15px] font-medium text-nowrap">
      <label>
        <img src={Logo} alt="logo" className="w-24 cursor-pointer brightness-150" />
      </label>

      <ul className="hidden xl:flex space-x-6">
        <li className="nav-list-item">Home</li>
        <li className="nav-list-item">TV Shows</li>
        <li className="nav-list-item">Movies</li>
        <li className="nav-list-item">Anime</li>
        <li className="nav-list-item">Games</li>
        <li className="nav-list-item">New & Popular</li>
        <li className="nav-list-item">Upcoming</li>
      </ul>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:inline-flex">
          <input type="text" className="bg-[#333333] px-4 py-2 rounded-full min-w-72 pr-10 outline-none" placeholder="Search..." />
          <Search className="absolute top-2 right-4 w-5 h-5" />
        </div>
        <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">Get AI Movie Picks</button>
        <button className="border border-[#333333] px-5 py-2 text-white cursor-pointer">Sign In</button>
      </div>
    </nav>
  )
}

export default Navbar
