import './App.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('Please enter a movie title')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('Cannot search using numbers only')
      return
    }

    if (search.length < 3) {
      setError('Search must be at least 3 characters long')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

function App() {
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
    <div className='page'>
      <section className='hero'>
        <h1>CinemaVerse</h1>
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
    </div>
  )
}

export default App