import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirstPage from "./screens/FirstPage";
import SigninScreen from "./screens/SigninScreen";
import Signup from "./screens/Signup";
import HomeScreen from "./screens/HomeScreen";
import SearchPage from "./screens/SearchPage";
import FavPage from "./screens/FavPage";
import ProfilePage from "./screens/ProfilePage";
import TopRated from "./screens/TopRated";
import BookDetails from "./screens/BookDetails";
import CategoryBooksScreen from "./screens/CategoryBooksScreen";
import AuthorInfoScreen from "./screens/AuthorDetails";
import { UserProvider } from "./context/UserContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Trending") {
            iconName = focused ? "trending-up" : "trending-up-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFB800", // Active tab color
        tabBarInactiveTintColor: "#39CCCC", // Inactive tab color
        tabBarLabelStyle: null,
        headerShown: false,
        // Tab label style
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Favorite" component={FavPage} />
      <Tab.Screen name="Trending" component={TopRated} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstPage">
          <Stack.Screen
            name="FirstPage"
            component={FirstPage}
            options={{ headerMode: "none" }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerMode: "none" }}
          />
          <Stack.Screen
            name="SigninScreen"
            component={SigninScreen}
            options={{ headerMode: "none" }}
          />
          <Stack.Screen name="SearchPage" component={SearchPage} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerMode: "none" }}
          />
          <Stack.Screen name="FavPage" component={FavPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="TopRated" component={TopRated} />
          <Stack.Screen name="BookDetails" component={BookDetails} />
          <Stack.Screen name="CategoryBooks" component={CategoryBooksScreen} />
          <Stack.Screen name="AuthorDetails" component={AuthorInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
