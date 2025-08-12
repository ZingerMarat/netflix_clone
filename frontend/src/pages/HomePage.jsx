import React, { useState, useEffect } from "react"
import CardList from "../components/CardList.jsx"
import MoviePoster from "../components/MoviePoster.jsx"

const HomePage = () => {
  const TMDB = "https://api.themoviedb.org/3"
  const [randomMovieId, setRandomMovieId] = useState(null)

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
        setRandomMovieId(m.id)
      } catch (err) {
        console.error(err)
      }
    }
    loadRandomMovieId()
  }, [])

  return (
    <div>
      <MoviePoster id={randomMovieId} />
      <CardList title="Upcoming" category="upcoming" />
      <CardList title="Now Playing" category="now_playing" />
      <CardList title="Popular" category="popular" />
      <CardList title="Top Rated" category="top_rated" />
    </div>
  )
}

export default HomePage
