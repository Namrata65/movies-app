import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../../services/api';
import { ThemedView } from '@/components/ThemedView';

const searchresults = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies('popular')
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ThemedView>
      <FlatList
        data={movies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </ThemedView>
  )
}

export default searchresults

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Change background color for the whole screen
    alignItems: 'center',
    justifyContent: 'center',
  },
});