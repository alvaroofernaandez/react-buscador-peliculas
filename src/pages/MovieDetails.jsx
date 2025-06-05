import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieDetails } from '../services/movies'

export function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMovieDetails(id)
      .then(data => {
        setMovie(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <div className="loading">Loading movie details...</div>
  }

  if (!movie) return null

  return (
    <div className="movie-details">
      <Link to="/" className="back-button">← Back to Search</Link>
      <div className="movie-details-content">
        <div className="movie-details-poster">
          <img src={movie.poster} alt={movie.title} />
        </div>
        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <div className="movie-meta">
            <span className="year">{movie.year}</span>
            <span className="runtime">{movie.runtime}</span>
            <span className="rating">{movie.rating}</span>
          </div>
          <p className="plot">{movie.plot}</p>
          <div className="details-grid">
            <div>
              <h3>Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3>Cast</h3>
              <p>{movie.actors}</p>
            </div>
            <div>
              <h3>Genre</h3>
              <p>{movie.genre}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}