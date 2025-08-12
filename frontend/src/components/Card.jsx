import React from "react"

const Card = ({ movie }) => {
  return (
    <div className="relative w-80 h-44">
      <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} alt="" className="h-44 w-80 object-center object-cover rounded-lg" />
      <div className="absolute bottom-0 left-0 w-75 flex flex-row items-center justify-between bg-black/70 px-2 py-1">
        <p className="font-bold break-words">{movie.original_title}</p>
      </div>
    </div>
  )
}

export default Card
