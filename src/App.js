import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import Welcome from "./pages/Welcome";
import PostList from "./components/PostList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <div className="nav-content">
        <Link to="/" className="brand">
          <span>📱</span>TechVibes
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link className="nav-link posts" to="/posts">Feed</Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                ✌️ Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link cta" to="/register">Join Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <PostList /> : <Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<PostList />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;