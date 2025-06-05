import { useState, useCallback } from 'react'
import { Movies } from '../components/Movies'
import { useMovies } from '../hooks/useMovies'
import { useSearch } from '../hooks/useSearch'
import debounce from 'just-debounce-it'

export function Home() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(({ search }) => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies({ search: newSearch })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="w-full">
      <section className="text-center py-24 px-4 bg-gradient-radial from-neon-blue/10 via-transparent to-transparent">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-neon-blue to-blue-600 bg-clip-text text-transparent">
          CinemaVerse
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Discover thousands of movies. Search, explore, and find your next favorite film.
        </p>
        <div className="max-w-2xl mx-auto p-8 bg-card-bg rounded-3xl backdrop-blur-xl shadow-xl">
          <form className="flex flex-col md:flex-row gap-4 mb-6" onSubmit={handleSubmit}>
            <input
              className="flex-1 px-6 py-4 bg-white/5 border-2 border-neon-blue/20 rounded-xl text-white placeholder-gray-400 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition"
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Search for movies..."
            />
            <button
              className="px-8 py-4 bg-neon-blue text-dark-bg font-semibold rounded-xl hover:shadow-lg hover:shadow-neon-blue/20 transform hover:-translate-y-1 transition"
              type="submit"
            >
              Search
            </button>
          </form>
          <div className="flex items-center gap-2 text-gray-400">
            <input
              type="checkbox"
              checked={sort}
              onChange={handleSort}
              className="w-4 h-4 accent-neon-blue"
            />
            <label>Sort by title</label>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </section>

      <main className="container mx-auto px-4">
        {loading ? (
          <p className="text-center text-neon-blue text-xl animate-pulse mt-8">
            Loading movies...
          </p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  )
}