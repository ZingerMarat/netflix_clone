import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router"
import "swiper/css"
import Card from "./Card.jsx"

const CardList = ({ title, category }) => {
  const TMDB = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState(null)

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
        const res = await fetch(`${TMDB}/movie/${category}?language=en-US&page=2`, { ...options })
        const data = await res.json()
        if (!data?.results?.length) return

        const m = data.results.filter((item) => item.original_language === "en")
        setMovies(m)
      } catch (err) {
        console.error(err)
      }
    }

    loadData()
  }, [])

  return (
    <div className="text-white md:px-4 m-5">
      <h2 className="pt-10 pb-5 text-2xl font-medium">{title}</h2>

      <Swiper className="mySwiper h-80 items-center justify-center" spaceBetween={20} slidesPerView={"auto"}>
        {movies &&
          movies.map((movie, index) => (
            <SwiperSlide key={index} className="max-w-50 max-h-75 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xs border-white/20 border-0">
              <Link to={`/movie/${movie.id}`}>
                <Card movie={movie} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default CardList
