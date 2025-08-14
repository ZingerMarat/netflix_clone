import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Link } from "react-router"
import "swiper/css"
import Card from "./Card.jsx"

const RecomendCardList = ({ type, title, movie_id }) => {
  const TMDB = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  useEffect(() => {
    async function loadData(pageNum) {
      try {
        const res = await fetch(`${TMDB}/${type}/${movie_id}/recommendations?language=en-US&page=${pageNum}`, options)
        const data = await res.json()
        if (!data?.results?.length) return

        const m = data.results.filter((item) => item.original_language === "en")
        setMovies((prev) => (prev ? [...prev, ...m] : m))
      } catch (err) {
        console.error(err)
      }
    }

    loadData(page)
  }, [page])

  return (
    <div className="text-white md:px-4 m-5">
      <h2 className="pt-10 pb-5 text-2xl font-medium">{title}</h2>

      <Swiper
        className="mySwiper items-center justify-center"
        spaceBetween={20}
        slidesPerView={"auto"}
        onSlideChange={(swiper) => {
          const remaining = swiper.slides.length - swiper.activeIndex - 1
          if (remaining <= 10) {
            setPage((prev) => prev + 1)
          }
        }}
      >
        {movies &&
          movies.map(
            (movie, index) =>
              movie.backdrop_path && (
                <SwiperSlide key={movie.id || index} className="max-w-[160px] md:max-w-[200px] max-h-[250px] md:max-h-[300px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xs border-white/20 border-0">
                  <Link to={`/media/${type}/${movie.id}`}>
                    <Card movie={movie} />
                  </Link>
                </SwiperSlide>
              )
          )}
      </Swiper>
    </div>
  )
}

export default RecomendCardList
