import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { getMovieDetails } from '@/services/api';

// Define the expected movie data structure
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  release_date: string;
}

const MovieDetailScreen: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieDetails(id);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovieDetails();
  }, [id]);

  useEffect(() => {
      if (movie) {
        navigation.setOptions({ title: movie.title });
      }
    }, [movie, navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#29b6f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {movie && (
        <>
          <Text style={styles.title}>{movie.title}</Text>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.image}
          />
          <Text style={styles.description}>{movie.overview}</Text>
          <Text style={styles.meta}>
            Popularity: {movie.popularity.toFixed(2)} | Release Date: {movie.release_date}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 0,
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#555',
  },
  meta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    marginTop: 10,
  },
});

export default MovieDetailScreen;
