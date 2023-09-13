import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const bookData = [
  {
    id: "1",
    title: "saeed",
    rating: 4.5,
    image: require("../assets/Book1.jpg"),
  },
  {
    id: "2",
    title: "Book 2",
    rating: 4.5,
    image: require("../assets/Book2.jpg"),
  },
  {
    id: "3",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book3.jpg"),
  },
  {
    id: "4",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book1.jpg"),
  },
  {
    id: "5",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book2.jpg"),
  },
  {
    id: "6",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book3.jpg"),
  },
  {
    id: "7",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book1.jpg"),
  },
  {
    id: "8",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book2.jpg"),
  },
  {
    id: "9",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book3.jpg"),
  },
  {
    id: "10",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book1.jpg"),
  },
  {
    id: "11",
    title: "Book 1",
    rating: 4.5,
    image: require("../assets/Book2.jpg"),
  },
  {
    id: "12",
    title: "Book 1",
    rating: 6,
    image: require("../assets/Book3.jpg"),
  },

];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(bookData);

  const handleSearch = (text) => {
    const filtered = bookData.filter((book) =>
      book.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setFilteredBooks(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.topRatedCard}>
      <Image source={item.image} style={styles.topRatedImage} />
      <View style={styles.ratingContainer}>
        <Ionicons
          name="star"
          color={"gold"}
          size={16}
          style={styles.starIcon}
        />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.TopPage}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setFilteredBooks(bookData);
            }}
          >
            <Ionicons
              name="close-circle"
              color={"red"}
              size={24}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TopPage: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop:50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    marginTop: 15,
  },
  topRatedCard: {
    marginRight: 10,
    marginTop: 10,
    width: '50%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRatedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fit',
  },
  ratingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'gold',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default SearchPage;
