import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://book-wise-5tjm.onrender.com/books/list");
        setAllBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (text) => {
    const filtered = allBooks.filter((book) =>
      book.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchQuery(text);
    setFilteredBooks(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredBooks(allBooks);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.topRatedCard}
      onPress={() => {
        navigation.navigate("BookDetails", { bookId: item._id });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.topRatedImage} />
      <View style={styles.ratingContainer}>
        <Ionicons name="star" color={"gold"} size={16} style={styles.starIcon} />
        <Text style={styles.ratingText}>{item.rate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
        {searchQuery !== "" && (
          <TouchableOpacity onPress={clearSearch}>
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
        keyExtractor={(item) => item._id}
        numColumns={2}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffff",
    marginTop: 50,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  list: {
    marginTop: 15,
  },
  topRatedCard: {
    marginRight: 10,
    marginTop: 10,
    width: "45%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  topRatedImage: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    borderRadius:16
  },
  ratingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#39cccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius:16
  },
  ratingText: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default SearchPage;
