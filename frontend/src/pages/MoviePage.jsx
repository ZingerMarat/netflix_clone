import React, { useState } from "react"
import { useParams } from "react-router"
import { Star } from "lucide-react"
import { Play } from "lucide-react"

const mokedMovie = {
  adult: false,
  backdrop_path: "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
  belongs_to_collection: null,
  budget: 63000000,
  genres: [
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 35,
      name: "Comedy",
    },
  ],
  homepage: "http://www.foxmovies.com/movies/fight-club",
  id: 550,
  imdb_id: "tt0137523",
  original_language: "en",
  original_title: "Fight Club",
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
  popularity: 61.416,
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  production_companies: [
    {
      id: 508,
      logo_path: "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
      name: "Regency Enterprises",
      origin_country: "US",
    },
    {
      id: 711,
      logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
      name: "Fox 2000 Pictures",
      origin_country: "US",
    },
    {
      id: 20555,
      logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
      name: "Taurus Film",
      origin_country: "DE",
    },
    {
      id: 54051,
      logo_path: null,
      name: "Atman Entertainment",
      origin_country: "",
    },
    {
      id: 54052,
      logo_path: null,
      name: "Knickerbocker Films",
      origin_country: "US",
    },
    {
      id: 4700,
      logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
      name: "The Linson Company",
      origin_country: "US",
    },
    {
      id: 25,
      logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
      name: "20th Century Fox",
      origin_country: "US",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
  ],
  release_date: "1999-10-15",
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "en",
      name: "English",
    },
  ],
  status: "Released",
  tagline: "Mischief. Mayhem. Soap.",
  title: "Fight Club",
  video: false,
  vote_average: 8.433,
  vote_count: 26280,
}

const MoviePage = () => {
  const { id } = useParams
  const [movie, setMovie] = useState(mokedMovie)

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div className="relative h-[60vh] flex item-end" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute w-full  inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>

        <div className="absolute top-1/3 z-10">
          <div className="relative flex items-center p-8 gap-8">
            {/* Poster */}
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="rounded-lg shadow-lg w-48 hidden md:block h-auto flex-none" />

            {/* Text */}
            <div className="flex-1">
              <div className="flex flex-col m-2">
                <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                <span>{movie.tagline}</span>
                <span>{movie.release_date.slice(0, 4)}</span>
                <span>{movie.runtime} min</span>
                <div className="m-4 ml-0 flex flex-wrap">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="px-3 py-1 mx-2 ml-0 rounded-full bg-white/10 backdrop-blur-xs border border-white/20">
                      {genre.name}
                    </span>
                  ))}
                </div>
                <p className="w-1/2">{movie.overview}</p>
              </div>

              <div className="flex gap-1 m-2">
                <Star strokeWidth={1} size={20} />
                <p>{movie.vote_average.toFixed(1)}</p>
              </div>

              {/* Кнопка */}
              <button className="mt-4 flex justify-center items-center bg-[#e50914]/20 backdrop-blur-sm border border-[#e50914]/50 text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base hover:bg-[#e50914]/30 transition flex-none">
                <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage
