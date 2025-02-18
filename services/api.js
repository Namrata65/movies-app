import axios from "axios";
import { MOVIES_API_KEY } from 'react-native-dotenv';

// const API_KEY = process.env.MOVIES_API_KEY;
// const API_KEY = MOVIES_API_KEY;
const API_KEY = "0e790d3ac7b5c5b93e92dac92bd7d154";
console.log('api_keu', API_KEY);
const BASE_URL = "https://api.themoviedb.org/3";


export const fetchMovies = (category) => {
  return axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
};

export const fetchTVShows = (category) => {
  return axios.get(`${BASE_URL}/tv/${category}?api_key=${API_KEY}`);
};

export const searchMedia = (query, type) => {
  return axios.get(`${BASE_URL}/search/${type}?api_key=${API_KEY}&query=${query}`);
};

export const getMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
};
