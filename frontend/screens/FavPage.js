import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

const FavPage = () => {
  const [selectedOption, setSelectedOption] = useState("Read");
  const [books, setBooks] = useState([]);
  const { setToken, setUserId, token, userId } = useUser();
  const userID = userId;

  useEffect(() => {
    // Fetch the user's data based on the selected option
    axios
      .get(`https://book-wise-5tjm.onrender.com/user/profile/${userID}`)
      .then((response) => {
        const userData = response.data;
        const bookList = userData.wishList[selectedOption] || [];
        return Promise.all(
          bookList.map((bookID) =>
            axios.get(`https://book-wise-5tjm.onrender.com/books/${bookID}`)
          )
        );
      })
      .then((bookResponses) => {
        const bookDetails = bookResponses.map((response) => response.data);
        setBooks(bookDetails);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedOption, userID]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Read" value="read" />
        <Picker.Item label="To Read" value="toRead" />
        <Picker.Item label="Reading" value="reading" />
      </Picker>

      <View style={styles.books}>
        {books.map((book) => (
          <TouchableOpacity
            onPress={() => navigateToBookDetails(book._id)} // Call navigateToBookDetails when a book is pressed
            style={styles.bookCard}
          >
            <Image source={{ uri: book.image }} style={styles.bookImage} />
            <View style={styles.bookDetails}>
              <Text style={styles.bookName}>{book.name}</Text>
              <Text style={styles.authorName}>Author: {book.author}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>{book.rate}/5</Text>
                <Ionicons
                  name="star"
                  color={"gold"}
                  size={16}
                  style={styles.clearIcon}
                />
              </View>
            </View>
            {/* Add buttons and other UI elements as needed */}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    marginTop: 50,
    margin: 27,
    borderRadius: 16,
  },
  books: {
    marginTop: 65,
  },
  bookCard: {
    width: "100%",
    height: 60,
    display: "flex",
    flexDirection: "row",
  },
  bookImage: {
    width: "35%",
    height: 150,
    objectFit: "cover",
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
  },
  bookName: {
    fontWeight: "bold",
    width: "70%",
  },
  authorName: {
    color: "#39CCCC",
    width: "70%",
  },
});
export default FavPage;
