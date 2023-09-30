import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import axios from "axios";
import "./login.css";
import logo from "../../assets/logo-no-background.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://book-wise-5tjm.onrender.com/admin/signin",
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);

      // Redirect to the home page upon successful login
      navigate("/user");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="loginPage">
      <img src={logo} alt="" />
      <div className="form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error">{error}</div>}
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
