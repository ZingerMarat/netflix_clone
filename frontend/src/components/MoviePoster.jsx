import React from "react"
import { Bookmark, Play } from "lucide-react"

const MoviePoster = ({ movie, ytKey }) => {
  return (
    <div className="text-white relative">
      {/* Background image or trailer */}
      <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[550px] w-full">
        {!ytKey ? (
          <img
            src={
              movie?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : ""
            }
            alt={movie?.title || movie?.original_name || "Movie backdrop"}
            className="w-full h-full rounded-2xl object-center object-cover"
          />
        ) : (
          <iframe
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${ytKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytKey}&modestbranding=1&rel=0`}
            title={movie?.title}
            allow="autoplay; encrypted-media;"
            allowFullScreen
          />
        )}
      </div>

      {/* Dark gradients over background */}
      <div className="absolute inset-0 -top-5 left-0 right-0 h-[calc(100%+1.25rem)] bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none z-[5]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent pointer-events-none z-[5]" />

      {/* Content */}
      {movie && (
        <div className="absolute bottom-0 z-10 flex gap-4 md:gap-5 items-center m-2 md:m-4">
          {/* Poster: only from md and up */}
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie?.title || movie?.original_name}
              className="hidden md:block w-32 md:w-40 lg:w-48 h-auto rounded-lg shadow-lg flex-none"
            />
          )}

          {/* Text info */}
          <div className="flex flex-col max-w-full md:max-w-[70%]">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 md:mb-2">
              {movie?.title ? movie.title : movie.original_name}
            </h1>

            {/* Tagline / year / runtime — всегда видны */}
            {movie?.tagline && (
              <span className="text-xs sm:text-sm opacity-80">{movie.tagline}</span>
            )}

            <div className="flex items-center gap-3 text-xs sm:text-sm mt-1">
              {movie?.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
              {movie?.runtime && <span>{movie.runtime} min</span>}
            </div>

            {/* Genres: показываем только с md (нужно больше места) */}
            {movie?.genres && movie.genres.length > 0 && (
              <div className="hidden md:flex flex-wrap mt-3">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 mr-2 mb-2 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview: показываем только на lg+, чтобы текст не был сжат */}
            {movie?.overview && (
              <p className="hidden lg:block mt-3 max-w-[60%] text-sm md:text-base">
                {movie.overview}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 md:gap-4 mt-4 font-medium">
              <button className="flex justify-center items-center bg-white/5 backdrop-blur-xs border border-white/20 hover:bg-white/15 text-[#e50914] py-2.5 px-4 rounded-full cursor-pointer text-xs sm:text-sm md:text-base flex-none">
                <Bookmark className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Save for Later
              </button>
              <button className="flex justify-center items-center bg-[#e50914]/90 backdrop-blur-sm border border-[#e50914]/20 text-white py-2.5 px-4 rounded-full cursor-pointer text-xs sm:text-sm md:text-base hover:bg-[#e50914] transition flex-none">
                <Play className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviePoster
