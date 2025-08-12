import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router"
import MoviePoster from "../components/MoviePoster.jsx"
import MovieInfo from "../components/MovieInfo.jsx"
import RecomendCardList from "../components/RecomendCardList.jsx"

const MoviePage = () => {
  const { id } = useParams()

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
  }, [id])

  return (
    <div>
      <MoviePoster movie={movie} ytKey={ytKey} />
      {movie && <RecomendCardList title={"You might also like"} movie_id={movie.id} />}
      {movie && <MovieInfo movie={movie} />}
    </div>
  )
}

export default MoviePage
