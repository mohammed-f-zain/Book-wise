import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "react-native-elements/dist/buttons/Button";
import { useNavigation } from '@react-navigation/native'

const FirstPage = () => {
  navigation =useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require(`../assets/logo-no-background.png`)}
        style={styles.image}
      />
      <Button
        title="Sign In"
        buttonStyle={styles.signin_btn}
        onPress={() => navigation.navigate("SigninScreen")}
      />
      <Button
        title="Sign Up"
        buttonStyle={styles.signup_btn}
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

export default FirstPage;

const styles = StyleSheet.create({
  container: {
    flex: 1, // This allows the container to take up the entire available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#A2F6F6",
  },
  image: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },
  signin_btn: {
    backgroundColor: "#39CCCC",
    padding: 15,
    marginBottom: 25,
    width: 200,
    borderRadius:16
  },
  signup_btn: {
    backgroundColor: "#001F3F",
    padding: 15,
    marginTop: 25,
    width: 200,
    borderRadius:16
  },
});
