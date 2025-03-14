import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const username = user ? user.email.split("@")[0] : null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">GenZ Blogspace</Link>
        </div>
        <div className="navbar-menu">
          {user ? (
            <>
              <span className="navbar-user">Hi, {username}!</span>
              <Link
                className="navbar-link"
                to="/"
                onClick={(e) => {
                  e.preventDefault(); // Prevents navigation
                  logout(); // Calls the logout function
                }}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link className="navbar-link" to="/login">
                Login
              </Link>
              <Link className="navbar-link" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
