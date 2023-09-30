import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const route = useRoute();
  const { setToken, setUserId, token, userId } = useUser();
  const { bookId } = route.params;

  useEffect(() => {
    // Function to fetch username for a user ID
    const getUsername = async (userId) => {
      try {
        const response = await axios.get(
          `https://book-wise-5tjm.onrender.com/user/profile/${userId}`
        );
        return response.data.name;
      } catch (error) {
        console.error("Error fetching username:", error);
        return "Unknown";
      }
    };

    // Function to fetch comments and usernames
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://book-wise-5tjm.onrender.com/books/${bookId}`
        );

        const commentsWithUsernames = await Promise.all(
          response.data.comments.map(async (comment) => {
            const username = await getUsername(comment.user);
            return { ...comment, username };
          })
        );

        setComments(commentsWithUsernames);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    // Fetch book details including comments
    axios
      .get(`https://book-wise-5tjm.onrender.com/books/${bookId}`)
      .then((response) => {
        setBookDetails(response.data);
        // Fetch comments after fetching book details
        fetchComments();
      })
      .catch((error) => console.error("Error fetching book data:", error));
  }, [comment]);

  const handleAddComment = async () => {
    if (comment.trim() !== "") {
      const newComment = {
        text: comment,
      };

      axios
        .post(
          `https://book-wise-5tjm.onrender.com/user/comment/${bookId}`,
          newComment,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setComments([...comments, newComment]);
          setComment("");
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  if (!bookDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: bookDetails.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{bookDetails.name}</Text>
      <Text style={styles.bookAuthor}>{bookDetails.author}</Text>
      <Text style={styles.title}>Description :</Text>
      <Text style={styles.bookDescription}>{bookDetails.description}</Text>
      <Text style={styles.title}>Details :</Text>
      <Text style={styles.bookDetailsText}>{bookDetails.details}</Text>
      <View style={styles.categoryRateContainer}>
        <Text style={styles.categoryRateText}>
          <Text style={styles.boldText}>Category:</Text> {bookDetails.category}
        </Text>
        <Text style={styles.categoryRateText}>
          <Text style={styles.boldText}>Rating:</Text> {bookDetails.rate}{" "}
          <Ionicons
            name="star"
            color={"gold"}
            size={16}
            style={styles.starIcon}
          />
        </Text>
      </View>
      <View style={styles.commentsSection}>
        <Text style={styles.title}>Comments :</Text>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
          <Button
            style={styles.addCommentBtn}
            title="Add Comment"
            onPress={handleAddComment}
          />
        </View>
        <ScrollView style={styles.commentsContainer}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Text style={styles.commentUsername}>{comment.username}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  commentUsername: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentItem: {
    padding: 7,
    backgroundColor: "#ddd",
    marginTop: 10,
    borderRadius: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "left",
    marginTop: 10,
  },
  bookImage: {
    width: 200,
    height: 300,
    resizeMode: "cover",
    alignSelf: "center",
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  bookAuthor: {
    fontSize: 16,
    marginBottom: 5,
    color: "#39cccc",
    alignSelf: "center",
  },
  bookDescription: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 10,
  },
  bookDetailsText: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 10,
  },
  categoryRateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 15,
  },
  categoryRateText: {
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#39cccc",
    padding: 15,
    color: "white",
    borderRadius: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  starIcon: {
    marginLeft: 5,
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsContainer: {
    maxHeight: 200,
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  commentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  addCommentBtn: {
    backgroundColor: "#39ccc",
  },
});

export default BookDetails;
