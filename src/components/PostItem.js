import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import CommentForm from './CommentForm';
import AuthContext from '../context/AuthContext';

const PostItem = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!post?.id) return;

    const fetchComments = async () => {
      setCommentsLoading(true);
      try {
        const response = await api.get(`/comments?postId=${post.id}`);
        setComments(response.data);
      } catch (error) {
        console.error(`Error fetching comments for post ${post.id}:`, error);
        setCommentsError('Failed to load comments.');
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [post.id]);

  const handleNewComment = (newComment) => {
    if (newComment.postId === post.id) {
      setComments((prevComments) => [...prevComments, newComment]);
      setShowCommentForm(false);
    }
  };

  const toggleCommentForm = () => {
    setShowCommentForm((prevState) => !prevState);
  };

  const toggleCommentsVisibility = () => {
    setShowComments((prevState) => !prevState);
  };

  const handleCancelComment = () => {
    setShowCommentForm(false);
  };

  return (
    <div style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>

      <h4>
        Comments ({comments.length})
        {comments.length > 0 && (
          <a
            href="#!"
            onClick={toggleCommentsVisibility}
            style={{ cursor: 'pointer', color: '#3498db', marginLeft: '10px', fontWeight: 'bold' }}
          >
            {showComments ? 'Hide' : 'Show'}
          </a>
        )}
      </h4>

      {commentsLoading && <p>Loading comments...</p>}
      {commentsError && <p style={{ color: 'red' }}>{commentsError}</p>}

      {showComments && !commentsLoading && !commentsError && (
        comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => {
            // Ensure created_at is valid before formatting
            const formattedDate = comment.created_at
            ? new Date(comment.created_at).toLocaleString() // Formats the date to a string
            : new Date().toLocaleString(); // Defaults to the current date if no timestamp

            return (
              <div key={comment.id} style={{ marginBottom: '0.5rem', padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                <strong>{comment.username} <span style={{ color: '#666' }}>({comment.email})</span></strong>
                <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '3px' }}>{formattedDate}</p>
                <p>{comment.content}</p>
              </div>
            );
          })
        )
      )}

      <div style={{ marginTop: '1rem' }}>
        {user ? (
          <a href="#!" onClick={toggleCommentForm} style={{ cursor: 'pointer', color: '#3498db' }}>
            {showCommentForm ? 'Hide Comment Form' : 'Comment'}
          </a>
        ) : (
          <p>
            <a href="/login">Log in</a> to comment.
          </p>
        )}
      </div>

      {showCommentForm && user && (
        <CommentForm
          postId={post.id}
          onCommentSubmitted={handleNewComment}
          onCancel={handleCancelComment}
        />
      )}
    </div>
  );
};

export default PostItem;
