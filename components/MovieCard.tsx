import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Define the type for the movie prop
interface Movie {
  poster_path: string;
  title: string;
  popularity: number;
  release_date: string;
  first_air_date: string;
  name: string;
  id: number;
}

// Define the props for the MovieCard component
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{movie.title ? movie.title : movie.name}</Text>
        <Text style={styles.text}>Popularity: {movie.popularity.toFixed(2)}</Text>
        <Text style={styles.text}>Release Date: {movie.release_date ? movie.release_date : movie.first_air_date}</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push(`/movie/${movie.id}`)}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#29b6f6',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MovieCard;