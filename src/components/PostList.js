import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import PostItem from './PostItem';
import AuthContext from '../context/AuthContext';  // Import AuthContext

const PostList = () => {
  const { user } = useContext(AuthContext);  // Get the user from AuthContext
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract the part before "@" from the user's email
  const username = user ? user.email.split('@')[0] : 'Guest';  // Default to 'Guest' if no user

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsLoading(true);
      try {
        console.log('Fetching posts from API...');
        const response = await api.get('/posts');
        console.log('Posts fetched:', response.data);
        setPosts(response.data);
      } catch (err) {
        console.error(
          'Failed to fetch posts:',
          err.response ? err.response.data : err.message
        );
        setError(
          err.response?.data?.error ||
            'An error occurred while fetching posts.'
        );
      } finally {
        setPostsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <div>
    <img 
              className="bloglogo"
              src="/namuenetecLogo.png" 
              alt="NamueneTec Logo"
            />
      <h2>Welcome, {username}</h2>  {/* Display the user's name */}
      <h3>Blog Posts</h3>
      {postsLoading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!postsLoading && posts.length === 0 && <p>No posts available.</p>}
      {!postsLoading && posts.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
    <footer>
      <p style={{ marginBottom: "-10px", fontSize: "1.1rem", textAlign: "center" }}>
        <strong>Developed by:</strong> Dr. Kato Samuel Namuene
      </p>
      <p style={{ fontSize: "1.1rem", textAlign: "center" }}>
        <strong>Email:</strong> kato.namuene@ubuea.cm
      </p>
    </footer>
    </>
  );
};

export default PostList;
