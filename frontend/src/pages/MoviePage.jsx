import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router"
import MoviePoster from "../components/MoviePoster.jsx"

const MoviePage = () => {
  const { id } = useParams()

  return (
    <div>
      <MoviePoster id={id} />
    </div>
  )
}

export default MoviePage
