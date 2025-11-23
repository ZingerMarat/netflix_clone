import React, { useEffect, useState } from "react"
import { Search } from "lucide-react"

const SearchBar = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSelect = (item) => {
    if (!item) return
    onSelect?.(item)
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  const handleSubmit = () => {
    if (searchResults.length > 0) {
      handleSelect(searchResults[0])
    }
  }

  useEffect(() => {
    const query = searchQuery.trim()
    if (!query) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    let isActive = true
    const controller = new AbortController()
    setIsSearching(true)

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
          )}&language=en-US&page=1&include_adult=false`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
            signal: controller.signal,
          }
        )
        const data = await response.json()
        if (!isActive) return
        const filtered = (data.results || []).filter((movie) => movie?.title)
        setSearchResults(filtered.slice(0, 6))
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search failed", error)
        }
      } finally {
        if (isActive) {
          setIsSearching(false)
        }
      }
    }, 400)

    return () => {
      isActive = false
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [searchQuery])

  return (
    <div className="relative w-full sm:w-auto">
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="bg-[#333333] px-4 py-2 rounded-full min-w-[20px] sm:min-w-36 md:min-w-40 outline-none flex-1"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              handleSubmit()
            }
          }}
        />
        <Search className="w-5 h-5" />
      </div>

      {(searchQuery.trim() || isSearching) && (
        <div className="absolute top-full left-0 w-[calc(100vw-5rem)] mt-2 z-50 border border-white/10 rounded-2xl shadow-xl max-h-80 overflow-y-auto bg-[#e50914]/1 backdrop-blur-sm py-3 px-2">
          {isSearching ? (
            <p className="px-4 py-3 text-sm text-gray-300">Searching...</p>
          ) : searchResults.length > 0 ? (
            searchResults.map((movie) => {
              const releaseYear =
                movie.release_date?.slice(0, 4) ?? movie.first_air_date?.slice(0, 4) ?? "—"
              return (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => handleSelect(movie)}
                  className="w-full px-4 py-3 text-left hover:bg-white/10 flex items-center justify-between gap-3 rounded-2xl cursor-pointer"
                >
                  <span className="text-sm font-medium">{movie.title || movie.name}</span>
                  <span className="text-xs text-gray-400">{releaseYear}</span>
                </button>
              )
            })
          ) : (
            <p className="px-4 py-3 text-sm text-gray-400">No matches found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
