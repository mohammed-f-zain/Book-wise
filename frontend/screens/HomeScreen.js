import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
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
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/Comedy.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Comedy</Text>
          </View>

          {/* Category Card 2 */}
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/Mystery.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Thriller</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/Romance.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Romance</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/Biography.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Biography</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/Historical.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Historical</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/Self-confident.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Motivation</Text>
          </View>
          <View style={styles.categoryCard}>
            <Image
              source={require("../assets/kids.png")}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>Kids</Text>
          </View>
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
          <View style={styles.authorCard}>
            <Image
              source={require("../assets/AgathaChristie.jpg")}
              style={styles.authorImage}
            />
            <Text style={styles.authorName}>Author 1</Text>
          </View>

          <View style={styles.authorCard}>
            <Image
              source={require("../assets/AgathaChristie.jpg")}
              style={styles.authorImage}
            />
            <Text style={styles.authorName}>Author 2</Text>
          </View>

          <View style={styles.authorCard}>
            <Image
              source={require("../assets/AgathaChristie.jpg")}
              style={styles.authorImage}
            />
            <Text style={styles.authorName}>Author 3</Text>
          </View>

          <View style={styles.authorCard}>
            <Image
              source={require("../assets/AgathaChristie.jpg")}
              style={styles.authorImage}
            />
            <Text style={styles.authorName}>Author 4</Text>
          </View>
        </ScrollView>
      </View>
      {/* Top Rated Section */}
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Top Rated</Text>
          <TouchableOpacity style={styles.seeMoreButton}>
            <Text style={styles.seeMoreText}>See More ...</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topRatedContainer}
        >
          {/* Top Rated Card 1 */}
          <View style={styles.topRatedCard}>
            <Image
              source={require("../assets/Book1.jpg")}
              style={styles.topRatedImage}
            />
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                color={"gold"}
                size={16}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>
          <View style={styles.topRatedCard}>
            <Image
              source={require("../assets/Book1.jpg")}
              style={styles.topRatedImage}
            />
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                color={"gold"}
                size={16}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>
          <View style={styles.topRatedCard}>
            <Image
              source={require("../assets/Book1.jpg")}
              style={styles.topRatedImage}
            />
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                color={"gold"}
                size={16}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>
          <View style={styles.topRatedCard}>
            <Image
              source={require("../assets/Book1.jpg")}
              style={styles.topRatedImage}
            />
            <View style={styles.ratingContainer}>
              <Ionicons
                name="star"
                color={"gold"}
                size={16}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>4.5</Text>
            </View>
          </View>

          {/* Add more Top Rated Cards as needed */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  enjoy: {
    fontSize: 20,
    color: "#FFB800",
  },
  welcome_container: {
    paddingBottom: 25,
    shadowColor: "#000", // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
    shadowOpacity: 0.2, // Shadow opacity (for iOS)
    shadowRadius: 2, // Shadow radius (for iOS)
    elevation: 2, // Elevation (for Android)
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#39CCCC",
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
  seeMoreButton: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  seeMoreText: {
    fontSize: 16, // Adjusted font size
    color: "gray",
  },
  // Top Rated Section styles
  topRatedContainer: {
    paddingVertical: 10,
  },
  topRatedCard: {
    marginRight: 10,
    width: 150,
    height: 200,
    alignItems: "center", // Center elements vertically
    justifyContent: "center", // Center elements horizontally
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
    flexDirection: "row", // Display elements horizontally
    alignItems: "center", // Center elements vertically
  },
  ratingContent: {
    flexDirection: "row", // Display elements horizontally
    alignItems: "center", // Center elements vertically
  },
  ratingText: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 12,
  },
});
