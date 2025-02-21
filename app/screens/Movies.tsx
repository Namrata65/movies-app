import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { fetchMovies } from '../../services/api';
import { ThemedView } from '@/components/ThemedView';
import MovieCard from '@/components/MovieCard';
import { Modalize } from 'react-native-modalize';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const modalizeRef = useRef<Modalize>(null); 
  // Fetch movies based on selected category
  useEffect(() => {
    fetchMovies(selectedCategory)
      .then((response) => {
        setMovies(response.results)
      })
      .catch((error) => console.error(error));
  }, [selectedCategory]);

  // Function to open the modal
  const openModal = () => {
    modalizeRef.current?.open();
  };

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    modalizeRef.current?.close(); 
  };

  return (
    <ThemedView>
      <TouchableOpacity style={styles.dropdownButton} onPress={openModal}>
        <Text style={styles.dropdownText}>{selectedCategory.replace('_', ' ').toUpperCase()}</Text>
      </TouchableOpacity>

      <FlatList
        data={movies}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />

      <Modalize ref={modalizeRef} snapPoint={320} modalHeight={400}>
        <View style={styles.modalContent}>
          {['now_playing', 'popular', 'top_rated', 'upcoming'].map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.modalOption}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.modalOptionText}>
                {category.replace('_', ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modalize>
    </ThemedView>
  );
};

export default Movies;

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: '#fff',
    color: '#000',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 50,
  },
  dropdownText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: '#000',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  dropdownIcon: {
    marginLeft: 5,
  },
});

