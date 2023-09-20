import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import axios from "axios"; // Import Axios for API requests
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation from React Navigation

const CategoryBooksScreen = ({ route }) => {
  const { category } = route.params; // Get the category name from navigation params
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const navigation = useNavigation(); // Initialize navigation

  // Function to fetch books of a specific category
  const fetchCategoryBooks = async () => {
    try {
      const response = await axios.get(
        `https://book-wise-5tjm.onrender.com/books/category/${category}`
      );
      setAllBooks(response.data);
      setFilteredBooks(response.data);
    } catch (error) {
      console.error("Error fetching category books: ", error);
    }
  };

  useEffect(() => {
    fetchCategoryBooks();
  }, [category]);

  // Function to handle search
  const handleSearch = (text) => {
    const filtered = allBooks.filter((book) =>
      book.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setFilteredBooks(filtered);
  };

  // Function to navigate to the book details screen
  const navigateToBookDetails = (bookID) => {
    navigation.navigate("BookDetails", { bookID }); // Navigate to BookDetails screen with bookID as a parameter
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToBookDetails(item._id)} // Call navigateToBookDetails when a book is pressed
      style={styles.bookCard}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookName}>{item.name}</Text>
      <Text style={styles.authorName}>Author: {item.author}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{item.rate}/5</Text>
        <Ionicons name="star" color={"gold"} size={24} style={styles.clearIcon} />
      </View>
      {/* Add buttons and other UI elements as needed */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${category} books...`}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        style={styles.bookList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    marginTop: 50,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  bookCard: {
    flex: 1,
    marginRight: 10,
    marginBottom: 10,
    width: "50%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
  },
  bookImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  bookName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  authorName: {
    fontSize: 12,
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  starIcon: {
    marginLeft: 5,
    width: 16,
    height: 16,
  },
  bookList: {
    marginTop: 10,
  },
});

export default CategoryBooksScreen;
