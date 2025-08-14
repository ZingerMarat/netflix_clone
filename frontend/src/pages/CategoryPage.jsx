import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router"
import Card from "../components/Card.jsx"

const categoryMap = {
  tv_shows: "/tv/popular?language=en-US",
  movies: "/movie/popular?language=en-US",
  upcoming: "/movie/upcoming?language=en-US",
  new: "/movie/now_playing?language=en-US",
  popular: "/trending/movie/week?language=en-US",
}

const CategoryPage = ({ category }) => {
  const reqUrl = categoryMap[category]
  const TMDB = "https://api.themoviedb.org/3"
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const loaderRef = useRef(null)

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  const loadData = async (pageNum) => {
    const res = await fetch(`${TMDB}${reqUrl}&page=${pageNum}`, options)
    const data = await res.json()

    if (pageNum === 1) {
      setMovies(data.results)
    } else {
      setMovies((prev) => {
        const all = [...prev, ...data.results]
        return all.filter((movie, index, self) => index === self.findIndex((m) => m.id === movie.id))
      })
    }

    setTotalPages(data.total_pages)
  }

  useEffect(() => {
    setPage(1)
    setMovies([])
    loadData(1)
  }, [category])

  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1 }
    )

    observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [loaderRef])

  useEffect(() => {
    if (page > 1) {
      loadData(page)
    }
  }, [page])

  return (
    <div>
      <h1 className=" text-white mx-5 my-5 text-3xl font-extrabold">
        {category
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {movies &&
          movies.map((movie) => (
            <div key={movie.id} className="m-2">
              <Link to={`/movie/${movie.id}`}>
                <Card movie={movie} />
              </Link>
            </div>
          ))}
      </div>
      <div ref={loaderRef} className="h-10"></div>
    </div>
  )
}

export default CategoryPage
