export const searchMovies = async ({search}) => {
  if (search === '' ) return null
  
  try {
    const apiKey = import.meta.env.VITE_API_KEY; 
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`);
    const json = await response.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
      poster: movie.Poster
    }))
  } catch (e) {
    throw new Error('Error searching for movies')
  }
}

export const getMovieDetails = async (id) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    const data = await response.json()

    return {
      id: data.imdbID,
      title: data.Title,
      year: data.Year,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      plot: data.Plot,
      rating: data.imdbRating,
      poster: data.Poster
    }
  } catch (e) {
    throw new Error('Error fetching movie details')
  }
}