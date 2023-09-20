import React, { useState } from "react";
import { useUser } from "../contex/UserContext";
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


const SigninScreen = () => {
  const { setToken, setUserId, token, userId } = useUser();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleSignIn = async () => {
    if (validateEmail() && validatePassword()) {
      try {
        const response = await fetch(
          "https://book-wise-5tjm.onrender.com/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const { token, userId } = data; // Assuming your API returns token and id

          // Store token and id in context
          setToken(token);
          setUserId(userId);

          // Sign in was successful, you can handle this accordingly.
          // For example, you can navigate to the main screen.
          navigation.navigate("MainTabs");
          setEmail("");
          console.log(token)
          console.log(userId)
        } else {
          // Handle sign-in error, such as displaying an error message.
          setPasswordError("Email or Password Not Correct");
          // You might want to display an error message here.
        }
      } catch (error) {
        console.error("Error signing in:", error);
        // Handle other errors here.
      }
    }
  };

  const handleSignUp = () => {
    // Navigate to the sign-up page
    navigation.navigate("SignUpScreen");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header_txt}>Sign In</Text>
      <Image
        source={require(`../assets/logo-no-background.png`)}
        style={styles.image}
      />
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
      <TouchableOpacity onPress={handleSignIn} style={styles.signin_btn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp}>
        <Text
          style={styles.signUpText}
          onPress={() => navigation.navigate("Signup")}
        >
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigninScreen;

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
  signUpText: {
    marginTop: 10,
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
