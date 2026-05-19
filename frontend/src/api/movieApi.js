const API_KEY = "f9b25f17ee8cc6371497d83826ce2a36"
const BASE_URL = 'https://api.themoviedb.org/3'

export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie details:', error)
    throw error
  }
}

export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie videos:', error)
    throw error
  }
}

export const getSimilarMovies = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching similar movies:', error)
    throw error
  }
}

export const getPopularMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}

export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching top rated movies:', error)
    throw error
  }
}

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching upcoming movies:', error)
    throw error
  }
}
export async function getMovies(page = 1) {

  const res = await fetch(

    `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}`

  )

  const data = await res.json()

  return data.results

}