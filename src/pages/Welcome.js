import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/Welcome.css";

const Welcome = () => {
  const { user } = useContext(AuthContext);
  const username = user ? user.email.split("@")[0] : null;

  return (
    <>
      <div className="welcome-wrapper">
        {/* Mobile-first image placement */}
        <div className="image-section">
          <img src="blogpic.jpg" alt="People discussing tech" />
        </div>

        {/* Content section */}
        <div className="content-section">
          {user && <h2 className="greeting">Hey, {username}! 👋</h2>}
          <h1 className="headline">Tech Vibes</h1>
          
          <div className="text-content">
            <p className="intro-text">
              Step into a hub of innovation, tech insights, and open discussions.
              Whether you're here to share your expertise or explore fresh perspectives,
              our community celebrates technology in all its forms—past, present, and future.
              Join the conversation and let your voice be heard.
            </p>
            
            <p className="intro-text">
              Here, every question ignites discussion and every idea has the potential 
              to drive breakthrough innovations. Whether you're troubleshooting complex 
              challenges or brainstorming the next big idea, you'll find support and 
              inspiration at every turn! 💡
            </p>
          </div>

          {!user ? (
            <Link to="/login" className="cta-button">
              <button className="start-button">Join the Vibe 🚀</button>
            </Link>
          ) : (
            <div className="user-content">
              <p>Welcome back, {username}! Your next great post awaits. ✨</p>
            </div>
          )}
        </div>
      </div>

      <footer>
        <p className="footer-text">
          <strong>Developed by:</strong> Dr. Kato Samuel Namuene
        </p>
        <p className="footer-text">
          <strong>Email:</strong> kato.namuene@ubuea.cm
        </p>
      </footer>
    </>
  );
};

export default Welcome;