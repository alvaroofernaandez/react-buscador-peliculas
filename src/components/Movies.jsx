function ListOfMovies({ movies }) {
  return (
    <div className="movies-grid">
      {movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <img
            className="movie-poster"
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-year">{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function NoMoviesResult() {
  return (
    <p className="no-results">No movies found. Try a different search!</p>
  )
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResult />
  )
}