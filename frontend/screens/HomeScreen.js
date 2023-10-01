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
import { useUser } from "../context/UserContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId } = useUser();

  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [randomAuthors, setRandomAuthors] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      try {
        const response = await axios.get(
          "https://book-wise-5tjm.onrender.com/books/list"
        );
        setTopRatedBooks(response.data);
      } catch (error) {
        console.error("Error fetching top-rated books: ", error);
      }
    };

    const fetchRandomAuthors = async () => {
      try {
        const response = await axios.get(
          "https://book-wise-5tjm.onrender.com/author/list"
        );
        const shuffledAuthors = response.data.sort(() => 0.5 - Math.random());
        const selectedAuthors = shuffledAuthors.slice(0, 4);
        setRandomAuthors(selectedAuthors);
      } catch (error) {
        console.error("Error fetching random authors: ", error);
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          `https://book-wise-5tjm.onrender.com/user/profile/${userId}`
        );
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user's name: ", error);
      }
    };

    fetchTopRatedBooks();
    fetchRandomAuthors();
    fetchUserName();
  }, [userId]);

  const handleBookPress = (item) => {
    navigation.navigate("BookDetails", { bookId: item._id });
  };

  const handleCategoryPress = (categoryName) => {
    navigation.navigate("CategoryBooks", { category: categoryName });
  };

  const handleAuthorPress = (authorId) => {
    navigation.navigate("AuthorDetails", { authorId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>Hi {userName}</Text>
        <Text style={styles.enjoy}>Enjoy Your Reading Today</Text>
      </View>

      <Section title="Categories">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              onPress={handleCategoryPress}
            />
          ))}
        </ScrollView>
      </Section>

      <Section title="Popular Authors" onPress={() => navigation.navigate("AllAuthors")}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.authorContainer}
        >
          {randomAuthors.map((author) => (
            <AuthorCard key={author._id} author={author} onPress={handleAuthorPress} />
          ))}
        </ScrollView>
      </Section>

      <Section title="Top Rated" onPress={() => navigation.navigate("TopRated")}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topRatedContainer}
        >
          {topRatedBooks.map((book) => (
            <TopRatedCard key={book._id} book={book} onPress={handleBookPress} />
          ))}
        </ScrollView>
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children, onPress }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.seeMoreButton} onPress={onPress}>
        <Text style={styles.seeMoreText}>See More ...</Text>
      </TouchableOpacity>
    </View>
    {children}
  </View>
);

const CategoryCard = ({ category, onPress }) => (
  <TouchableOpacity
    style={styles.categoryCard}
    onPress={() => onPress(category.name)}
  >
    <Image source={category.image} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{category.name}</Text>
  </TouchableOpacity>
);

const AuthorCard = ({ author, onPress }) => (
  <TouchableOpacity
    key={author._id}
    style={styles.authorCard}
    onPress={() => onPress(author._id)}
  >
    <Image source={{ uri: author.image }} style={styles.authorImage} />
    <Text style={styles.authorName}>{author.name}</Text>
  </TouchableOpacity>
);

const TopRatedCard = ({ book, onPress }) => (
  <TouchableOpacity
    style={styles.topRatedCard}
    onPress={() => onPress(book)}
  >
    <Image source={{ uri: book.image }} style={styles.topRatedImage} />
    <View style={styles.ratingContainer}>
      <Ionicons name="star" color={"gold"} size={16} style={styles.starIcon} />
      <Text style={styles.ratingText}>{book.rate}/5</Text>
    </View>
  </TouchableOpacity>
);

const categories = [
  { name: "Comedy", image: require("../assets/Comedy.png") },
  { name: "Thriller", image: require("../assets/Mystery.png") },
  { name: "Romance", image: require("../assets/Romance.png") },
  { name: "Biography", image: require("../assets/Biography.png") },
  { name: "Historical", image: require("../assets/Historical.png") },
  { name: "Motivation", image: require("../assets/Self-confident.png") },
  { name: "Kids", image: require("../assets/kids.png") },
  // Add more categories as needed
];

const styles = StyleSheet.create({
  welcomeContainer: {
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
