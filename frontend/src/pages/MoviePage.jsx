import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router"
import { Bookmark, Play, Star } from "lucide-react"

const MoviePage = () => {
  const { id } = useParams()
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
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        const data = await res.json()
        if (!data) return

        setMovie(data)

        //try to get trailer
        const vRes = await fetch(`${TMDB}/movie/${id}/videos?language=en-US`, { ...options })
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
      <div className="relative rounded-2xl overflow-hidden h-[550px] w-full">
        {!ytKey ? (
          <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie?.backdrop_path}` : ""} alt="" className="w-full rounded-2xl h-[550px] object-center object-cover" />
        ) : (
          <iframe
            className="absolute top-0 left-0 w-screen h-full scale-[2.1] pointer-events-none"
            //src="https://www.youtube.com/embed/VQRLujxTm3c?autoplay=1&mute=1&controls=0&loop=1&playlist=VQRLujxTm3c&modestbranding=1&rel=0&highres"
            src={`https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytKey}&pmodestbranding=1&rel=0&highres`}
            title="GTA Trailer"
            allow="autoplay; encrypted-media; "
            allowFullScreen
          />
        )}
      </div>
      <div className="absolute inset-0 -top-5 left-0 right-0 h-[calc(100%+1.25rem)] bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none z-[5]" />

      {movie && (
        <div className="absolute top-1/3 z-10 flex gap-5 items-center m-2">
          <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} className="rounded-lg shadow-lg w-48 hidden md:block h-auto flex-none" />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
            <span>{movie?.tagline}</span>
            <span>{movie?.release_date.slice(0, 4)}</span>
            <span>{movie?.runtime} min</span>
            <div className="m-4 ml-0 flex flex-wrap">
              {movie?.genres.map((genre) => (
                <span key={genre.id} className="px-3 py-1 mx-2 ml-0 rounded-full bg-white/10 backdrop-blur-xs border border-white/20">
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="w-1/2">{movie?.overview}</p>

            <div className="flex space-x-2 md:space-x-4 mt-5 font-medium">
              <button className="flex justify-center items-center bg-white/1 backdrop-blur-xs border border-white/20 hover:bg-white/15 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base flex-none">
                <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
              </button>
              <button className="flex justify-center items-center bg-[#e50914]/1 backdrop-blur-sm border border-[#e50914]/20 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base hover:bg-[#e50914]/30 transition flex-none">
                <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // return (
  //   <div className="min-h-screen bg-[#181818] text-white">
  //     <div className="absolute top-1/3 z-10">
  //       {/* Poster */}
  //       <div className="relative rounded-2xl overflow-hidden h-[480px] w-full">
  //         {!ytKey ? (
  //           <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : ""} alt="" className="w-full rounded-2xl h-[480px] object-center object-cover" />
  //         ) : (
  //           <iframe
  //             className="absolute top-0 left-0 w-screen h-full scale-210 pointer-events-none"
  //             //src="https://www.youtube.com/embed/VQRLujxTm3c?autoplay=1&mute=1&controls=0&loop=1&playlist=VQRLujxTm3c&modestbranding=1&rel=0&highres"
  //             src={`https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytKey}&pmodestbranding=1&rel=0&highres`}
  //             title="GTA Trailer"
  //             allow="autoplay; encrypted-media; "
  //             allowFullScreen
  //           />
  //         )}
  //       </div>
  //       <div className="absolute w-full -top-5 inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
  //       <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

  //       {/* Text */}
  //       <div className="">
  //         <div className="flex flex-col m-2">
  //           <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
  //           <span>{movie.tagline}</span>
  //           <span>{movie.release_date.slice(0, 4)}</span>
  //           <span>{movie.runtime} min</span>
  //           <div className="m-4 ml-0 flex flex-wrap">
  //             {movie.genres.map((genre) => (
  //               <span key={genre.id} className="px-3 py-1 mx-2 ml-0 rounded-full bg-white/10 backdrop-blur-xs border border-white/20">
  //                 {genre.name}
  //               </span>
  //             ))}
  //           </div>
  //           <p className="w-1/2">{movie.overview}</p>
  //         </div>

  //         <div className="flex gap-1 m-2">
  //           <Star strokeWidth={1} size={20} />
  //           <p>{movie.vote_average.toFixed(1)}</p>
  //         </div>

  //         {/* Buttons */}
  //         <div className="flex space-x-2 md:space-x-4 font-medium">
  //           <button className="flex justify-center items-center bg-white/1 backdrop-blur-xs border border-white/20 hover:bg-white/15 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
  //             <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
  //           </button>
  //           <button className="flex justify-center items-center bg-[#e50914]/1 backdrop-blur-sm border border-[#e50914]/20 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base hover:bg-[#e50914]/30 transition">
  //             <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
  //             Watch Now
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default MoviePage
