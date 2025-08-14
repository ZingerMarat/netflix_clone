import React from "react"

const Card = ({ movie }) => {
  return (
    <div className="relative w-full h-full">
      <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} alt="" className="w-full h-full object-center object-cover rounded-lg" />
    </div>
  )
}

export default Card
