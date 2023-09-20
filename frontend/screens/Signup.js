import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // Error for confirm password

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
      return false;
    } else if (name.trim().length < 4) {
      setNameError("Name must be at least 4 characters long");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSignUp = async () => {
    if (
      validateName() &&
      validateEmail() &&
      validatePassword() &&
      validateConfirmPassword()
    ) {
      try {
        const response = await axios.post(
          "https://book-wise-5tjm.onrender.com/user/register",
          {
            name,
            email,
            password,
            dateOfBirth: "", // Add date of birth and country if needed
            country: "",
          }
        );

        if (response.status === 201) {
          // Registration was successful, you can navigate to the HomeScreen or display a success message
          navigation.navigate("MainTabs");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          // Handle registration error (e.g., display an error message)
          // You can access the error message in response.data.message
          console.error(response.data.message);
        }
      } catch (error) {
        // Handle network or server errors
        console.error("Error:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header_txt}>Sign Up</Text>
      <Image
        source={require(`../assets/logo-no-background.png`)}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        onBlur={validateName}
      />
      {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        onBlur={validateEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
          onBlur={validatePassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.passwordVisibilityButton}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword} // Toggle secureTextEntry based on showConfirmPassword state
          onBlur={validateConfirmPassword}
        />
        <TouchableOpacity
          onPress={toggleConfirmPasswordVisibility}
          style={styles.passwordVisibilityButton}
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}
      <TouchableOpacity onPress={handleSignUp} style={styles.signin_btn}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SigninScreen")}
        style={styles.signUpTextContainer}
      >
        <Text style={styles.signUpText}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C1FFFF",
  },
  header_txt: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 50,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  signin_btn: {
    backgroundColor: "#39CCCC",
    padding: 15,
    marginTop: 25,
    marginBottom: 25,
    width: 200,
    alignItems: "center",
    borderRadius: 16,
  },
  buttonText: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpTextContainer: {
    marginTop: 10,
  },
  signUpText: {
    fontSize: 16,
    color: "#FFB800",
    textDecorationLine: "underline",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: "white",
  },
  passwordVisibilityButton: {
    position: "absolute",
    right: 10,
  },
  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
    marginBottom: 25,
  },
});
