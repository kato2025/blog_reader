import React, { createContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async ({ email, password }) => {
    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);

      const loggedInUser = { email };  // Modify if API returns more details
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error("Invalid login credentials");  // Handle in UI
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
