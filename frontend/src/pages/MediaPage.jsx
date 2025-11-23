import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import MoviePoster from "../components/MoviePoster.jsx"
import MovieInfo from "../components/MovieInfo.jsx"
import RecomendCardList from "../components/RecomendCardList.jsx"

const MediaPage = () => {
  const { type, id } = useParams()

  const TMDB = "https://api.themoviedb.org/3"

  const [movie, setMovie] = useState(null)
  const [ytKey, setYtKey] = useState(null)

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }),
    []
  )

  useEffect(() => {
    if (!id) return

    // reset states
    setMovie(null)
    setYtKey(null)

    async function loadData() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?language=en-US`,
          options
        )
        const data = await res.json()
        if (!data) return

        setMovie(data)

        //try to get trailer
        const vRes = await fetch(`${TMDB}/${type}/${id}/videos?language=en-US`, { ...options })
        const { results = [] } = await vRes.json()
        const best =
          results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
          results.find((v) => v.site === "YouTube" && v.type === "Trailer") ||
          results.find((v) => v.site === "YouTube")
        setYtKey(best?.key ?? null)
      } catch (err) {
        console.error(err)
      }
    }

    loadData()
  }, [id])

  return (
    <div>
      <MoviePoster movie={movie} ytKey={ytKey} />
      {movie?.overview && (
        <div className="block lg:hidden text-white p-8">
          <h2 className="pb-5 text-2xl font-medium">Overview</h2>
          <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
            {movie?.genres && movie.genres.length > 0 && (
              <div className="flex-wrap mt-3">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 mr-2 mb-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className=" mt-3 max-w-[70%] text-sm md:text-base">{movie.overview}</p>
          </div>
        </div>
      )}
      {movie && <RecomendCardList type={type} movie_id={movie.id} />}
      {movie && <MovieInfo type={type} movie={movie} />}
    </div>
  )
}

export default MediaPage
