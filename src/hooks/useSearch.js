import { useState, useEffect, useRef } from 'react'

export function useSearch() {
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