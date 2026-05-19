const API_KEY = "f9b25f17ee8cc6371497d83826ce2a36";
const BASE_URL = "https://api.themoviedb.org/3";
// Trending Movies (Default Export)
export default async function dayTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
export  async function weekTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
export  async function monthTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/month?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Popular Movies
export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Top Rated Movies
export async function getTopRatedMovies() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Now Playing Movies
export async function getNowPlayingMovies() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Upcoming Movies
export async function getUpcomingMovies() {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Movie Details
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
}

// Search Movies
export async function movieSearch(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
}
export async function multiSearch(query) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results;
}
// Movie Videos (Trailers)
export async function getMovieVideos(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Similar Movies
export async function getSimilarMovies(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Recommended Movies
export async function getRecommendedMovies(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
}