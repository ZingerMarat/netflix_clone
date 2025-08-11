import React from "react"
import { Star } from "lucide-react"

const Card = ({ movie }) => {
  return (
    <>
      <img src={movie?.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} alt="" className="h-44 w-80 object-center object-cover " />
      <div className="flex flex-row text-center py-4 px-2 justify-between">
        <p className="font-bold break-words">{movie.original_title}</p>
        <div className="flex gap-1">
          <Star strokeWidth={1} size={20} />
          <p>{movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </>
  )
}

export default Card
