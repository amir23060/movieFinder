const API_KEY = "f9b25f17ee8cc6371497d83826ce2a36"
const BASE_URL = 'https://api.themoviedb.org/3'

export const getSerieDetails = async (serieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${serieId}?api_key=${API_KEY}&language=en-US`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching serie details:', error)
    throw error
  }
}

export const getSerieVideos = async (serieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${serieId}/videos?api_key=${API_KEY}&language=en-US`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching serie videos:', error)
    throw error
  }
}

export const getSimilarSeries = async (serieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${serieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching similar series:', error)
    throw error
  }
}

export const getPopularSeries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching popular series:', error)
    throw error
  }
}

export const getTopRatedSeries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching top rated series:', error)
    throw error
  }
}

export const getOnAirSeries = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Error fetching on air series:', error)
    throw error
  }
}
