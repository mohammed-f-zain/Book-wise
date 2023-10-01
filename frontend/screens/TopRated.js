import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const TopRated = () => {
  const [bookData, setBookData] = useState([]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://book-wise-5tjm.onrender.com/books/list");
        const sortedData = response.data.sort((a, b) => b.rate - a.rate);
        setBookData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleBookPress = (item) => {
    navigation.navigate("BookDetails", { bookId: item._id });
    console.log(item._id); // Pass bookId to BookDetails page
  };

  const renderBookCard = ({ item, index }) => (
    <View style={styles.topRatedCard}>
      <TouchableOpacity style={styles.cardContent} onPress={() => handleBookPress(item)}>
        <Image source={{ uri: item.image }} style={styles.topRatedImage} />
        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{item.name}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" color={"gold"} size={16} style={styles.starIcon} />
            <Text style={styles.ratingText}>{item.rate}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => toggleDropdown(index)} style={styles.dropdownButton}>
          <Ionicons
            name={item.status === "none" ? "ios-add-circle-outline" : item.icon}
            color={item.status === "none" ? "blue" : "green"}
            size={24}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.TopPage}>
      <Text style={styles.pageTitle}>Top Rated</Text>
      <FlatList
        data={bookData}
        renderItem={renderBookCard}
        keyExtractor={(item) => item._id}
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
    borderColor: "#39CCCC",
    padding: 16,
  },
  topRatedImage: {
    width: 100,
    height: 150,
    objectFit: "cover",
    borderRadius: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookDetails: {
    flex: 1,
    marginLeft: 10,
    gap: 20,
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 16,
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 6,
  },
});

export default TopRated;
