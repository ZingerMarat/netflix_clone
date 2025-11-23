import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"

import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router-dom"
import "swiper/css"
import Card from "./Card.jsx"

const RecommendedMovies = ({ movieTitles }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovies = async (title) => {
    const encodedTitle = encodeURIComponent(title)
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&language=en-US&page=1&include_adult=false`

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      return data.results?.[0] || null
    } catch (error) {
      console.error("Error fetching movies:", error)
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      const results = await Promise.all(movieTitles.map((title) => fetchMovies(title)))
      setMovies(results.filter((movie) => movie !== null))
      setLoading(false)
    }

    if (movieTitles && movieTitles.length > 0) {
      loadMovies()
    }
  }, [movieTitles])

  if (loading) {
    return <p>Loading recommended movies...</p>
  }

  console.log(movies)

  return (
    <div className="text-white md:px-4 m-5">
      <h2 className="pt-2 md:pt-5 pb-5 text-2xl font-medium">Recommended Movies</h2>

      <Swiper
        className="mySwiper md:h-80 items-center justify-center"
        spaceBetween={20}
        slidesPerView={"auto"}
      >
        {movies &&
          movies.map((movie, index) => (
            <SwiperSlide
              key={index}
              className=" max-w-[160px] md:max-w-[200px] max-h-[240px] md:max-h-[300px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xs border-white/20 border-0"
            >
              <Link to={`/media/movie/${movie.id}`}>
                <Card movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default RecommendedMovies
