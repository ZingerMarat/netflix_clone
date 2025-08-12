import React, { useState, useEffect } from "react"
import CardList from "../components/CardList.jsx"
import MoviePoster from "../components/MoviePoster.jsx"

const HomePage = () => {
  const TMDB = "https://api.themoviedb.org/3"
  const [randomMovie, setRandomMovie] = useState(null)
  const [ytKey, setYtKey] = useState(null)

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  useEffect(() => {
    async function loadRandomMovieId() {
      try {
        const res = await fetch(`${TMDB}/movie/now_playing?language=en-US&page=1`, { ...options })
        const data = await res.json()
        if (!data?.results?.length) return

        const randomIndex = Math.floor(Math.random() * data.results.length)
        const m = data.results[randomIndex]
        setRandomMovie(m)

        //try to get trailer
        const vRes = await fetch(`${TMDB}/movie/${m.id}/videos?language=en-US`, { ...options })
        const { results = [] } = await vRes.json()
        const best = results.find((v) => v.site === "YouTube" && v.type === "Trailer" && v.official) || results.find((v) => v.site === "YouTube" && v.type === "Trailer") || results.find((v) => v.site === "YouTube")
        setYtKey(best?.key ?? null)
      } catch (err) {
        console.error(err)
      }
    }
    loadRandomMovieId()
  }, [])

  return (
    <div>
      <MoviePoster movie={randomMovie} ytKey={ytKey} />
      <CardList title="Upcoming" category="upcoming" />
      <CardList title="Now Playing" category="now_playing" />
      <CardList title="Popular" category="popular" />
      <CardList title="Top Rated" category="top_rated" />
    </div>
  )
}

export default HomePage
