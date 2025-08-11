import React from "react"
import HeroBg from "../assets/herobg2.jpg"
import { Bookmark, Play } from "lucide-react"

const Hero = () => {
  return (
    <div className="text-white relative">
      <div className="relative rounded-2xl overflow-hidden h-[480px] w-full">
        <iframe
          className="absolute top-0 left-0 w-full h-full scale-210 pointer-events-none"
          src="https://www.youtube.com/embed/VQRLujxTm3c?autoplay=1&mute=1&controls=0&loop=1&playlist=VQRLujxTm3c&modestbranding=1&rel=0&highres"
          // src={`https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytKey}&pmodestbranding=1&rel=0&highres`}
          title="GTA Trailer"
          allow="autoplay; encrypted-media; "
          allowFullScreen
        />
      </div>

      <div className="flex space-x-2 md:space-x-4 absolute bottom-3 md:bottom-8 left-4 md:left-10 font-medium">
        <button className="flex justify-center items-center bg-white/1 backdrop-blur-xs border border-white/20 hover:bg-white/15 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
        </button>
        <button className="flex justify-center items-center bg-[#e50914]/1 backdrop-blur-sm border border-[#e50914]/20 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base hover:bg-[#e50914]/30 transition">
          <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
          Watch Now
        </button>
      </div>
    </div>
  )
}

export default Hero
