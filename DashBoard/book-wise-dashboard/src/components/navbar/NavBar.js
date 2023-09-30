import React from "react";
import logo from "../../assets/logo-no-background.png";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const NavBar = () => {
  // Get the navigate function for navigation
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Delete the token from local storage
    localStorage.removeItem("token");

    // Navigate to the sign-in page
    navigate("/"); // Use navigate for navigation
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="list">
        <ul>
          <li>
            <Link to="/user">User Page</Link>
          </li>
          <li>
            <Link to="/books">Books Page</Link>
          </li>
          <li>
            <Link to="/authors">Authors Page</Link>
          </li>
        </ul>
      </div>
      <button type="button" className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
