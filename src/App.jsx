import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

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
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con solo números')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error}
}

function App() {
  const [ sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies( {search, sort} )

  const debouncedGetMovies = useCallback(
    debounce(({ search }) => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies({search: newSearch})
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>

      <header>
        <h1>Movie Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <div className='form-content'>
            <input onChange={handleChange} value={search} name="query" placeholder="Avengers, Star Wars, Interstellar..." />
            <button type="submit">Search</button>
          </div>
          <div className="form-subheader">
            <input type="checkbox" checked={sort} onChange={handleSort}/>
            <label>Sort by rating</label>
          </div>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading 
          ? <p>Loading...</p>
          : <Movies movies={movies}/>
        }
      </main>

    </div>
  )
}

export default App
