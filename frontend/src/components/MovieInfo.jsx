import React, { useEffect, useState } from "react"

const MovieInfo = ({ type, movie }) => {
  const TMDB = "https://api.themoviedb.org/3"

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  }

  const [cast, setCast] = useState([])

  useEffect(() => {
    const loadCasts = async () => {
      const res = await fetch(`${TMDB}/${type}/${movie.id}/credits?language=en-US`, options)
      const data = await res.json()

      setCast(data.cast.slice(0, 14))
    }

    loadCasts()
  }, [])

  return (
    <div className="p-8 text-white">
      <h2 className="text-2xl font-semibold mb-4">Details</h2>
      <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <ul className="text-gray-300 space-y-3">
            <li>
              <span className="font-semibold text-white">Status:</span>
              <span className="ml-2">{movie.status}</span>
            </li>

            <li>
              <span className="font-semibold text-white">Release Date:</span>
              <span className="ml-2">{movie.release_date ? movie.release_date : movie.first_air_date}</span>
            </li>

            <li>
              <span className="font-semibold text-white">Original Language:</span>
              <span className="ml-2">{movie.original_language.toUpperCase()}</span>
            </li>

            <li>
              <span className="font-semibold text-white">Spoken Languages:</span>
              <span className="ml-2">{movie.spoken_languages && movie.spoken_languages.length > 0 ? movie.spoken_languages.map((l) => l.english_name).join(", ") : "N/A"}</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 flex gap-4">
          <div className="font-semibold text-white flex-none">Actors:</div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-4 flex-1">
            {cast &&
              cast.map((c) => (
                <div key={c.id} className="flex flex-col items-center">
                  <img src={`https://image.tmdb.org/t/p/original${c.profile_path}`} className="rounded-full object-cover w-20 h-20" />
                  <div className="text-center mt-2 leading-tight">
                    {c.name.split(" ").map((part, i) => (
                      <div key={i}>{part}</div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieInfo
