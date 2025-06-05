import { Link } from 'react-router-dom'

function ListOfMovies({ movies }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 py-8">
      {movies.map(movie => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-card-bg rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/20"
        >
          <img
            className="w-full h-[400px] object-cover"
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-2">{movie.title}</h3>
            <p className="text-gray-400">{movie.year}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

function NoMoviesResult() {
  return (
    <p className="text-center text-gray-400 text-xl mt-12">
      No movies found. Try a different search!
    </p>
  )
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />
}