const API_KEY = "f9b25f17ee8cc6371497d83826ce2a36";
const BASE_URL = "https://api.themoviedb.org/3";
// Trending Series
export async function dayTrendingSeries() {
  const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
export async function weekTrendingSeries() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
export async function getTrendingSeries() {
  const res = await fetch(`${BASE_URL}/trending/tv/${length}?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
// Popular Series
export async function getPopularSeries() {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Top Rated Series
export async function getTopRatedSeries() {
  const res = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Airing Today
export async function getAiringTodaySeries() {
  const res = await fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// On The Air
export async function getOnTheAirSeries() {
  const res = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Series Details
export async function getSerieDetails(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}

// Search Series
export async function searchSeries(query) {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
}

// Series Videos (Trailers)
export async function getSeriesVideos(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Similar Series
export async function getSimilarSeries(id) {
  const res = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Recommended Series
export async function getRecommendedSeries(id) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
}
export async function getSeries(page = 1) {

  const res = await fetch(

    `${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${page}`

  )

  const data = await res.json()

  return data.results

}