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
    <>
      <section className='hero'>
        <h1>CinemaVerse</h1>
        <p className="hero-description">
          Discover thousands of movies. Search, explore, and find your next favorite film.
        </p>
        <div className='search-container'>
          <form className='search-form' onSubmit={handleSubmit}>
            <input
              className='search-input'
              onChange={handleChange}
              value={search}
              name="query"
              placeholder="Search for movies..."
            />
            <button className='search-button' type="submit">
              Search
            </button>
          </form>
          <div className="sort-container">
            <input type="checkbox" checked={sort} onChange={handleSort} />
            <label>Sort by title</label>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </section>

      <main>
        {loading ? (
          <p className="loading">Loading movies...</p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </>
  )
}