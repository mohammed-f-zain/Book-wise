import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();

  // State to store top-rated books
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  // State to store random authors
  const [randomAuthors, setRandomAuthors] = useState([]);

  useEffect(() => {
    // Fetch top-rated books when the component mounts
    const fetchTopRatedBooks = async () => {
      try {
        const response = await axios.get(
          "https://book-wise-5tjm.onrender.com/books/list"
        );
        // Assuming the response data is an array of top-rated books
        setTopRatedBooks(response.data);
      } catch (error) {
        console.error("Error fetching top-rated books: ", error);
      }
    };

    // Fetch random authors when the component mounts
    const fetchRandomAuthors = async () => {
      try {
        const response = await axios.get(
          "https://book-wise-5tjm.onrender.com/author/list"
        );
        // Shuffle the array to get random authors
        const shuffledAuthors = response.data.sort(() => 0.5 - Math.random());
        const selectedAuthors = shuffledAuthors.slice(0, 4);
        setRandomAuthors(selectedAuthors);
      } catch (error) {
        console.error("Error fetching random authors: ", error);
      }
    };

    fetchTopRatedBooks();
    fetchRandomAuthors();
  }, []);

  const handleCategoryPress = (categoryName) => {
    navigation.navigate("CategoryBooks", { category: categoryName });
  };

  const handleAuthorPress = (authorId) => {
    navigation.navigate("AuthorDetails", { authorId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome_container}>
        <Text style={styles.welcome}>Hi Saeed</Text>
        <Text style={styles.enjoy}>Enjoy Your Reading Today</Text>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {/* Category Card 1 */}
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress("Comedy")}
          >
            <Image
              source={require("../assets/Comedy.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Comedy</Text>
          </TouchableOpacity>

          {/* Category Card 2 */}
          <TouchableOpacity style={styles.categoryCard}  onPress={() => handleCategoryPress("Thriller")}>
            <Image
              source={require("../assets/Mystery.png")}
              style={styles.categoryImage}
             
            />
            <Text style={styles.categoryTitle}>Thriller</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}  onPress={() => handleCategoryPress("Romance")}>
            <Image
              source={require("../assets/Romance.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Romance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress("Biography")}>
            <Image
              source={require("../assets/Biography.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Biography</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress("Historical")} >
            <Image
              source={require("../assets/Historical.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Historical</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress("Motivation")}>
            <Image
              source={require("../assets/Self-confident.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Motivation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress("Kids")}>
            <Image
              source={require("../assets/kids.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Kids</Text>
          </TouchableOpacity>
          {/* Add more Category Cards as needed */}
        </ScrollView>
      </View>

      {/* Popular Authors Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Popular Authors</Text>
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See More ...</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.authorContainer}
        >
          {randomAuthors.map((author) => (
            <TouchableOpacity
              key={author._id}
              style={styles.authorCard}
              onPress={() => handleAuthorPress(author._id)}
            >
              <Image
                source={{ uri: author.image }}
                style={styles.authorImage}
              />
              <Text style={styles.authorName}>{author.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Top Rated Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => navigation.navigate("TopRated")}
          >
            <Text style={styles.seeMoreText}>See More ...</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topRatedContainer}
        >
          {topRatedBooks.map((book, index) => (
            <View style={styles.topRatedCard} key={index}>
              <Image
                source={{ uri: book.image }} // Use the book's image URL
                style={styles.topRatedImage}
              />
              <View style={styles.ratingContainer}>
                <Ionicons
                  name="star"
                  color={"gold"}
                  size={16}
                  style={styles.starIcon}
                />
                <Text style={styles.ratingText}>{book.rate}/5</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcome_container: {
    paddingBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#39CCCC",
  },
  enjoy: {
    fontSize: 20,
    color: "#FFB800",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingVertical: 50,
    padding: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seeMoreButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  seeMoreText: {
    fontSize: 16,
    color: "gray",
  },
  categoryContainer: {
    paddingVertical: 10,
  },
  categoryCard: {
    backgroundColor: "#39CCCC",
    marginRight: 10,
    padding: 12,
    height: 120,
    width: 105,
    borderRadius: 16,
  },
  categoryImage: {
    width: "100%",
    height: 60,
    resizeMode: "contain",
  },
  categoryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  // Author Section styles
  authorContainer: {
    paddingVertical: 10,
  },
  authorCard: {
    alignItems: "center",
    marginRight: 10,
  },
  authorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  authorName: {
    fontSize: 16,
    marginTop: 5,
  },
  // Top Rated Section styles
  topRatedContainer: {
    paddingVertical: 10,
  },
  topRatedCard: {
    marginRight: 10,
    width: 150,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  topRatedImage: {
    width: "100%",
    height: "100%",
  },
  ratingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 12,
  },
  starIcon: {
    marginLeft: 5,
  },
});

export default HomeScreen;
