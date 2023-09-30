import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

const AuthorInfoScreen = ({ route }) => {
  const { authorId } = route.params;
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        const response = await axios.get(
          `https://book-wise-5tjm.onrender.com/author/${authorId}`
        );
        // Assuming the response data contains author information
        setAuthorInfo(response.data);
      } catch (error) {
        console.error("Error fetching author info: ", error);
      }
    };

    fetchAuthorInfo();
  }, [authorId]);

  if (!authorInfo) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: authorInfo.image }} style={styles.authorImage} />
      <Text style={styles.authorName}>{authorInfo.name}</Text>
      <Text style={styles.authorAge}>Age: {authorInfo.age}</Text>
      <Text style={styles.authorCountry}>Country: {authorInfo.country}</Text>
      <Text style={styles.authorWritingType}>
        Writing Type: {authorInfo.writingType}
      </Text>
      <Text style={styles.authorLifeAndCareer}>
        Life and Career: {authorInfo.lifeAndCareer}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  authorName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  authorAge: {
    fontSize: 16,
    marginBottom: 10,
  },
  authorCountry: {
    fontSize: 16,
    marginBottom: 10,
  },
  authorWritingType: {
    fontSize: 16,
    marginBottom: 10,
  },
  authorLifeAndCareer: {
    fontSize: 16,
  },
});

export default AuthorInfoScreen;
