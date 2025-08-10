import React from "react"
import HeroBg from "../assets/herobg2.jpg"
import { Bookmark, Play } from "lucide-react"

const Hero = () => {
  return (
    <div className="text-white relative">
      <img src={HeroBg} alt="bg-img" className="w-full rounded-2xl h-[480px] object-center object-cover" />

      <div className="flex space-x-2 md:space-x-4 absolute bottom-3 md:bottom-8 left-4 md:left-10 font-medium">
        <button className="flex justify-center items-center bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
        </button>
        <button className="flex justify-center items-center bg-[#e50914]/20 backdrop-blur-sm border border-[#e50914]/50 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base hover:bg-[#e50914]/30 transition">
          <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
          Watch Now
        </button>
      </div>
    </div>
  )
}

export default Hero
