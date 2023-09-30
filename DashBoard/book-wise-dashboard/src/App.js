import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./screens/login/Login";
import User from "./screens/users/User";
import Books from "./screens/books/Books";
import Authors from "./screens/authors/Authors";

function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");

  if (token) {
    // If token exists, allow access to the protected route
    return element;
  } else {
    // If token does not exist, redirect to the login page
    return <Navigate to="/" />;
  }
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<PrivateRoute element={<User />} />} />
        <Route path="/books" element={<PrivateRoute element={<Books />} />} />
        <Route
          path="/authors"
          element={<PrivateRoute element={<Authors />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
