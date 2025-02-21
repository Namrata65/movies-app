import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { searchMedia } from '@/services/api';
import { Modalize } from 'react-native-modalize';
import MovieCard from '@/components/MovieCard';

interface Data {
  poster_path: string;
  title: string;
  popularity: number;
  release_date: string;
  name: string;
  id: number;
  first_air_date: string;
}

const SearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('multi');
  const [data, setData] = useState<Data[]>([]);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [error, setError] = useState(''); // State for error message
  const modalizeRef = useRef<Modalize>(null);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setError('Please enter a search query.');
      return;
    }

    // Clear the error if input is valid
    setError(''); 

    searchMedia(searchQuery, searchType)
      .then((response) => {
        setData(response.results);
        setShouldSearch(true);
      })
      .catch((error) => console.error(error));
  };

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const handleSearchSelect = (category: string) => {
    setSearchType(category);
    modalizeRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search Movie/TV Show Name*</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="i.e. James Bond, CSI"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          if (text.trim() !== '') setError('');
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Choose Search Type*</Text>
      <View style={styles.searchBoxContainer}>
        <TouchableOpacity style={styles.dropdownButton} onPress={openModal}>
          <Text style={styles.dropdownText}>{searchType.replace('_', ' ').toUpperCase()}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.bottomMargin}>Please select a search Type</Text>

      

      {shouldSearch && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}

      <Modalize ref={modalizeRef} snapPoint={250} modalHeight={300}>
        <View style={styles.modalContent}>
          {['multi', 'movie', 'tv'].map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.modalOption}
              onPress={() => handleSearchSelect(category)}
            >
              <Text style={styles.modalOptionText}>
                {category.replace('_', ' ').toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modalize>
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  dropdownButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 70,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10,
  },
  dropdownText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    padding: 20,
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
  button: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#29b6f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  bottomMargin: {
    marginBottom: 20
  }
});
