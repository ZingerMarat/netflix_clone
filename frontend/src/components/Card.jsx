import React from "react"

const Card = ({ movie }) => {
  return (
    <div className="relative w-26 md:w-80 h-44 md:h-44">
      <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} alt="" className="h-25 md:h-75 w-16 md:w-50 object-center object-cover rounded-lg" />
    </div>
  )
}

export default Card
