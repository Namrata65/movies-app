import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { getTvShowDetails } from '@/services/api';

// Define the expected tvshow data structure
interface TvShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  popularity: number;
  first_air_date: string;
}

const TvShowDetailCard: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tvshow, setTvShow] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTvshowDetails = async () => {
      try {
        const response = await getTvShowDetails(id);
        setTvShow(response);
      } catch (error) {
        console.error('Error fetching tvshow details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTvshowDetails();
  }, [id]);

  useEffect(() => {
    if (tvshow) {
      navigation.setOptions({ title: tvshow.name });
    }
  }, [tvshow, navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#29b6f6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tvshow && (
        <>
          <Text style={styles.title}>{tvshow.name ? tvshow.name : tvshow.original_name}</Text>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${tvshow.poster_path}` }}
            style={styles.image}
          />
          <Text style={styles.description}>{tvshow.overview ? tvshow.overview : "No Description available for this tv show"}</Text>
          <Text style={styles.meta}>
            Popularity: {tvshow.popularity.toFixed(2)} | Release Date: {tvshow.first_air_date}
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

export default TvShowDetailCard;
