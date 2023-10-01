// RateBook.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RateBook = ({ route, navigation }) => {
  const { bookDetails } = route.params;
  const [userRating, setUserRating] = useState(0);

  // Function to handle rating selection
  const handleRating = (rating) => {
    setUserRating(rating);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Rate the Book</Text>
      <Text>{bookDetails.name}</Text>
      <Ionicons
        name="star"
        color={userRating >= 1 ? "gold" : "gray"}
        size={50}
        onPress={() => handleRating(1)}
      />
      <Ionicons
        name="star"
        color={userRating >= 2 ? "gold" : "gray"}
        size={50}
        onPress={() => handleRating(2)}
      />
      <Ionicons
        name="star"
        color={userRating >= 3 ? "gold" : "gray"}
        size={50}
        onPress={() => handleRating(3)}
      />
      <Ionicons
        name="star"
        color={userRating >= 4 ? "gold" : "gray"}
        size={50}
        onPress={() => handleRating(4)}
      />
      <Ionicons
        name="star"
        color={userRating >= 5 ? "gold" : "gray"}
        size={50}
        onPress={() => handleRating(5)}
      />
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          // You can send the user's rating back to the previous screen here
          navigation.goBack();
        }}
      >
        <Text>Submit Rating</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RateBook;
