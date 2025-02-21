import { router } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface TvShow {
  poster_path: string;
  original_name: string;
  popularity: number;
  first_air_date: string;
  name: string;
  id: number;
  title: string;
  release_date: string;
}

interface TvShowCardProps {
  tvshow: TvShow;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ tvshow }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${tvshow.poster_path}` }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{tvshow.name ? tvshow.name : tvshow.original_name ? tvshow.original_name : tvshow.title}
        </Text>
        <Text style={styles.text}>Popularity: {tvshow.popularity.toFixed(2)}</Text>
        <Text style={styles.text}>Release Date: {tvshow.first_air_date ? tvshow.first_air_date : tvshow.release_date}</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push(`/tvshow/${tvshow.id}`)}>
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TvShowCard;

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
    backgroundColor: '#E5989B',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});