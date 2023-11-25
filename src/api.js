import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '7a5fc2dada6a40475efd14410833dffd';

export async function fetchMovies() {
  const { data } = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return data;
}

export async function fetchSearchMovies(query) {
  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  console.log(data);
  return data;
}

export async function fetchMovieDetails(movieId) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return data;
}

export async function fetchMovieCast(movieId) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return data;
}

export async function fetchMovieReviews(movieId) {
  const { data } = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return data;
}
