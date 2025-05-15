
function ListOfMovies ({movies}) {
  return (
    <ul className="movies">
      {
        movies.map(movie => (
          <li className="movie" key ={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
          </li>
        ))
      }
    </ul>
  )
}

function NoMoviesResult() {
  return (
    <p>No results that match your search</p>
  )
}

export function Movies ({movies}) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResult />
  )
}