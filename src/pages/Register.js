import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ✅ Use configured axios instance

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("🟡 [Register] Attempting to register user...");
  
    try {
      console.log("📤 [Register] Sending registration request with payload:", {
        username,
        email,
        password: "********", // Masked for security
      });
  
      const response = await api.post("/register", { username, email, password }, { withCredentials: true });
  
      console.log("✅ [Register] User registered successfully!", response.data);
  
      navigate("/login"); // Redirect on success
    } catch (err) {
      console.error("⛔ [Register] Registration failed!");
  
      if (!err.response) {
        console.error("🚨 [Register] No response received from server. Possible network issue or backend is down.");
        setError("No response from server. Check your connection.");
        return;
      }
  
      console.error("🔴 [Register] Server responded with an error.");
      console.error("📡 [Register] Status Code:", err.response.status);
      console.error("📝 [Register] Error Data:", err.response.data);
  
      let errorMessage = "Registration failed. Try again.";
  
      switch (err.response.status) {
        case 400:
          console.warn("⚠️ [Register] Bad Request - Invalid input data.");
          errorMessage = err.response.data.error || "Invalid input data. Please check your details.";
          break;
        case 401:
          console.warn("⚠️ [Register] Unauthorized - Invalid credentials.");
          errorMessage = err.response.data.error || "Invalid credentials. Please try again.";
          break;
        case 409:
          console.warn("⚠️ [Register] Conflict - User already exists.");
          errorMessage = err.response.data.error || "User already exists. Try a different email.";
          break;
        case 500:
          console.error("🚨 [Register] Server error - Something went wrong on the backend.");
          errorMessage = "Internal server error. Please try again later.";
          break;
        default:
          console.error("❓ [Register] Unexpected error occurred.");
          errorMessage = err.response.data.error || "An unexpected error occurred.";
      }
  
      setError(errorMessage);
    }
  };
  

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
