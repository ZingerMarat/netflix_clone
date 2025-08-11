import React, { useEffect, useState } from "react"
import HeroBg from "../assets/herobg2.jpg"
import { Bookmark, Play } from "lucide-react"

const Hero = () => {
  const TMDB = "https://api.themoviedb.org/3"
  const [movie, setMovie] = useState(null)
  const [ytKey, setYtKey] = useState(null)

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`${TMDB}/movie/now_playing?language=en-US&page=1`, { ...options })
        const data = await res.json()
        if (!data?.results?.length) return

        const randomIndex = Math.floor(Math.random() * data.results.length)
        const m = data.results[randomIndex]
        setMovie(m)

        //try to get trailer
        const vRes = await fetch(`${TMDB}/movie/${m.id}/videos?language=en-US`, { ...options })
        const { results = [] } = await vRes.json()
        const best = results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) || results.find((v) => v.site === "YouTube" && v.type === "Trailer") || results.find((v) => v.site === "YouTube")
        setYtKey(best?.key ?? null)
      } catch (err) {
        console.error(err)
      }
    }

    loadData()
  }, [])

  return (
    <div className="text-white relative">
      <div className="relative rounded-2xl overflow-hidden h-[480px] w-full">
        {!ytKey ? (
          <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ""} alt="" className="w-full rounded-2xl h-[480px] object-center object-cover" />
        ) : (
          <iframe
            className="absolute top-0 left-0 w-screen h-full scale-210 pointer-events-none"
            //src="https://www.youtube.com/embed/VQRLujxTm3c?autoplay=1&mute=1&controls=0&loop=1&playlist=VQRLujxTm3c&modestbranding=1&rel=0&highres"
            src={`https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytKey}&pmodestbranding=1&rel=0&highres`}
            title="GTA Trailer"
            allow="autoplay; encrypted-media; "
            allowFullScreen
          />
        )}
      </div>
      <div className="absolute w-full -top-5 inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

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
