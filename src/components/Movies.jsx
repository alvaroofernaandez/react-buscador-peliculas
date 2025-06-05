import { Link } from 'react-router-dom'

function ListOfMovies({ movies }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
      {movies.map(movie => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-card-bg rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/20"
        >
          <img
            className="w-full h-60 sm:h-72 md:h-80 lg:h-96 object-cover"
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
          />
          <div className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{movie.title}</h3>
            <p className="text-gray-400 text-sm sm:text-base">{movie.year}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

function NoMoviesResult() {
  return (
    <p className="text-center text-gray-400 text-lg sm:text-xl mt-8 sm:mt-12">
      No se encontraron películas. Intenta con otra búsqueda.
    </p>
  )
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />
}