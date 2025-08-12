import React from "react"

const Card = ({ movie }) => {
  return (
    <div className="relative w-80 h-44">
      <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} alt="" className="h-75 w-50 object-center object-cover rounded-lg" />
    </div>
  )
}

export default Card
