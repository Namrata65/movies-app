import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { fetchTVShows } from '@/services/api';
import TvShowCard from '@/components/TvShowCard';
import { Modalize } from 'react-native-modalize';

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('airing_today');
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    fetchTVShows(selectedCategory)
      .then((response) => {
        console.log('response search', response)
        setTvShows(response.results)})
      .catch((error) => console.error(error));
  }, [selectedCategory]);

  // Function to open the modal
  const openModal = () => {
    modalizeRef.current?.open();
  };

  // Function to handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    modalizeRef.current?.close(); // Close modal after selection
  };
  
  return (
    <ThemedView>
      <TouchableOpacity style={styles.dropdownButton} onPress={openModal}>
        <Text style={styles.dropdownText}>{selectedCategory.replace('_', ' ').toUpperCase()}</Text>
      </TouchableOpacity>

      <FlatList
        data={tvShows}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }) => <TvShowCard tvshow={item} />}
      />

      <Modalize ref={modalizeRef} snapPoint={250} modalHeight={300}>
        <View style={styles.modalContent}>
          {['airing_today', 'on_the_air', 'popular', 'top_rated'].map((category) => (
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
  )
}

export default TvShows;

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
});

