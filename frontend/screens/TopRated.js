import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TopRated = () => {
  const bookData = [
    {
      id: "1",
      title: "Book 1",
      author: "Author 1",
      rating: 4.5,
      image: require("../assets/Book1.jpg"),
      status: "none", // Initial status
      icon: "ios-add-circle-outline", // Initial icon
    },
    {
      id: "2",
      title: "Book 2",
      author: "Author 2",
      rating: 4.5,
      image: require("../assets/Book2.jpg"),
      status: "none", // Initial status
      icon: "ios-add-circle-outline", // Initial icon
    },
    // ... (other book data)
  ];

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null);
    } else {
      setOpenDropdownIndex(index);
    }
  };

  const handleOptionClick = (item, option) => {
    item.status = option;
    switch (option) {
      case "bookmark-outline":
        item.icon = "bookmark-outline";
        break;
      case "checkmark-done-outline":
        item.icon = "checkmark-done-outline";
        break;
      case "timer-outline":
        item.icon = "timer-outline";
        break;
      default:
        item.icon = "ios-add-circle-outline";
        break;
    }
    setOpenDropdownIndex(null); // Close the dropdown after selecting an option
  };

  const renderBookCard = ({ item, index }) => (
    <View style={styles.topRatedCard}>
      <View style={styles.cardContent}>
        <Image source={item.image} style={styles.topRatedImage} />
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
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
        <TouchableOpacity
          onPress={() => toggleDropdown(index)}
          style={styles.dropdownButton}
        >
          <Ionicons
            name={item.icon}
            color={item.status === "none" ? "blue" : "green"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      {openDropdownIndex === index && (
        <View style={[styles.dropdownMenu, { zIndex: 1 }]}>
          <TouchableOpacity
            onPress={() => handleOptionClick(item, "bookmark-outline")}
          >
            <Text style={styles.menuOptions}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionClick(item, "checkmark-done-outline")}
          >
            <Text style={styles.menuOptions}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionClick(item, "timer-outline")}
          >
            <Text style={styles.menuOptions}>Option 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.TopPage}>
      <Text style={styles.pageTitle}>Top Rated</Text>
      <FlatList
        data={bookData}
        renderItem={renderBookCard}
        keyExtractor={(item) => item.id}
        numColumns={1}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TopPage: {
    marginTop: 60,
    marginLeft: 15,
    marginRight: 15,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  topRatedCard: {
    paddingTop: 16,
    borderBottomWidth: 1,
    borderColor: "red",
    padding: 16,
  },
  topRatedImage: {
    width: 100,
    height: 150,
    objectFit: "fit",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookDetails: {
    flex: 1,
    marginLeft: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 12,
    color: "gray",
  },
  dropdownButton: {
    padding: 10,
  },
  dropdownMenu: {
    position: "absolute",
    top: 90, // Adjust this value as needed to position the dropdown
    right: 40,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    zIndex: 1, // Ensure the dropdown is above other components
  },
  menuOptions: {
    padding: 16,
  },
});

export default TopRated;
