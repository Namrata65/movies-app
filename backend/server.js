import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());

const TMDB_API_KEY = process.env.MOVIES_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3'; 

// Fetch movies by category
app.get('/api/movie/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/movie/${category}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
});

// Fetch TV shows by category
app.get('/api/tv/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/tv/${category}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TV shows', error });
    }
});

// Search media (movies or TV shows)
app.get('/api/search/:type', async (req, res) => {
    const { type } = req.params;  
    const { query } = req.query;
    try {
        const response = await axios.get(`${BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&query=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error searching media', error });
    }
});

// Fetch movie details
app.get('/api/movie/details/:movieId', async (req, res) => {
    const { movieId } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details', error });
    }
});

// Fetch TV show details
app.get('/api/tv/details/:tvShowId', async (req, res) => {
    const { tvShowId } = req.params;
    try {
        const response = await axios.get(`${BASE_URL}/tv/${tvShowId}?api_key=${TMDB_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TV show details', error });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
