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
<<<<<<< HEAD
        <p className="text-neon-blue text-xl animate-pulse">Cargando detalles...</p>
=======
        <p className="text-neon-blue text-xl animate-pulse">Loading movie details...</p>
>>>>>>> refs/remotes/origin/main
      </div>
    )
  }

  if (!movie) return null

  return (
<<<<<<< HEAD
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <Link
        to="/"
        className="inline-flex items-center text-gray-400 hover:text-neon-blue mb-6 sm:mb-8 transition"
      >
        ← Volver
      </Link>
      <div className="bg-card-bg rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl p-4 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 sm:gap-8">
          <div className="flex justify-center md:block mb-4 md:mb-0">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-40 sm:w-64 md:w-full rounded-xl shadow-2xl object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4">{movie.title}</h1>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
=======
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
>>>>>>> refs/remotes/origin/main
              <span>{movie.year}</span>
              <span>{movie.runtime}</span>
              <span>★ {movie.rating}</span>
            </div>
<<<<<<< HEAD
            <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-gray-300">{movie.plot}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
              <div>
                <h3 className="text-neon-blue font-semibold mb-1 sm:mb-2">Director</h3>
                <p className="text-gray-400 text-sm sm:text-base">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-neon-blue font-semibold mb-1 sm:mb-2">Reparto</h3>
                <p className="text-gray-400 text-sm sm:text-base">{movie.actors}</p>
              </div>
              <div>
                <h3 className="text-neon-blue font-semibold mb-1 sm:mb-2">Género</h3>
                <p className="text-gray-400 text-sm sm:text-base">{movie.genre}</p>
=======
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
>>>>>>> refs/remotes/origin/main
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}