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
    throw new Error('Error al buscar las películas')
  }
}