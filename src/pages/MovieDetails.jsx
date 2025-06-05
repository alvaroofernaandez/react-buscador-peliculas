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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-neon-blue text-xl animate-pulse">Loading movie details...</p>
      </div>
    )
  }

  if (!movie) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-gray-400 hover:text-neon-blue mb-8 transition"
      >
        ← Back to Search
      </Link>
      <div className="bg-card-bg rounded-3xl overflow-hidden backdrop-blur-xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex gap-6 text-gray-400 mb-8">
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
              <span>★ {movie.rating}</span>
            </div>
            <p className="text-lg leading-relaxed mb-8 text-gray-300">{movie.plot}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-neon-blue font-semibold mb-2">Director</h3>
                <p className="text-gray-400">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-neon-blue font-semibold mb-2">Cast</h3>
                <p className="text-gray-400">{movie.actors}</p>
              </div>
              <div>
                <h3 className="text-neon-blue font-semibold mb-2">Genre</h3>
                <p className="text-gray-400">{movie.genre}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}