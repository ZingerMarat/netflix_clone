import React, { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

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

        const m = data.results
        setMovies(m)
      } catch (err) {
        console.error(err)
      }
    }

    loadData()
  }, [])

  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

      <Swiper className="mySwiper h-60 items-center justify-center" spaceBetween={20} slidesPerView={"auto"}>
        {movies &&
          movies.map((movie, index) => (
            <SwiperSlide key={index} className="max-w-72 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xs border border-white/20">
              <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} alt="" className="h-44 w-80 object-center object-cover " />
              <div className="flex flex-row text-center py-4 px-2 justify-between">
                <p className="font-bold break-words">{movie.original_title}</p>
                <div className="flex gap-1">
                  <Star strokeWidth={1} size={20} />
                  <p>{movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}

export default CardList
