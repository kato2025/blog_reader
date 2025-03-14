import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate here
import AuthContext from "../context/AuthContext";
import "../styles/login.css"; // Import the login.css stylesheet

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate hook in Login component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Perform login
      await login({ email, password });

      // After successful login, navigate to the PostList page
      navigate("/posts");  // Redirect to /posts after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="loginbody">
                  <img 
              className="bloglogo"
              src="/namuenetecLogo.png" 
              alt="NamueneTec Logo"
            />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input className="logininput"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input className="logininput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <footer>
          <p style={{ marginBottom: "-10px", fontSize: "1.1rem", textAlign: "center" }}>
            <strong>Developed by:</strong> Dr. Kato Samuel Namuene
          </p>
          <p style={{ fontSize: "1.1rem", textAlign: "center"  }}>
            <strong>Email:</strong> kato.namuene@ubuea.cm
          </p>
        </footer>
    </div>
  );
};

export default Login;
