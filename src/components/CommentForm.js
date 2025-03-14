import React, { useState } from 'react';
import api from '../api';

const CommentForm = ({ postId, onCommentSubmitted, onCancel }) => {
  const [content, setContent] = useState('');

  // Fetch user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')); // Assumes user object is stored after login
  const token = localStorage.getItem('token');

  if (!user) {
    return <p>You must be logged in to comment.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      alert('Comment cannot be empty.');
      return;
    }

    try {
      const response = await api.post(
        '/comments',
        { content, postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Comment submitted successfully:", response.data);
      if (onCommentSubmitted) {
        onCommentSubmitted(response.data);
      }

      setContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert(`Failed to submit comment: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3>Leave a Comment</h3>
      <div>
        <label>Comment:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default CommentForm;
