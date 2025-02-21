import axios from "axios";

const BASE_URL = "http://localhost:7001/api";


export const fetchMovies = (category) => {
  return axios.get(`${BASE_URL}/movie/${category}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching movies:', error));
};

export const fetchTVShows = (category) => {
  return axios.get(`${BASE_URL}/tv/${category}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching TV shows:', error));
};

export const searchMedia = (query, type) => {
  return axios.get(`${BASE_URL}/search/${type}?query=${query}`)
    .then(response => response.data)
    .catch(error => console.error('Error searching media:', error));
};

export const getMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/details/${movieId}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching movie details:', error));
};

export const getTvShowDetails = (tvShowId) => {
  return axios.get(`${BASE_URL}/tv/details/${tvShowId}`)
    .then(response => response.data)
    .catch(error => console.error('Error fetching TV show details:', error));
};
