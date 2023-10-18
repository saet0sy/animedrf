import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/scss/styles.scss";

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null); 
  const [editedCommentText, setEditedCommentText] = useState(''); 

  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const date = new Date(dateString);
    return date.toLocaleDateString('en-EN', options);
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/comments/?anime=${id}`)
      .then((response) => {
        if (Array.isArray(response.data.results)) {
          const formattedComments = response.data.results.map((comment) => ({
            ...comment,
            pub_date: formatDate(comment.pub_date),
          }));
          setComments(formattedComments);
        } else {
          console.error("Data is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/comments/${commentId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
  
      if (response.status === 204) {
        console.log("Comment deleted successfully.");
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
      } else {
        console.error("Error deleting comment. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await axios.post(`http://localhost:8000/auth/jwt/refresh/`, {
            refresh: localStorage.getItem("refresh_token"),
          });
          localStorage.setItem("refresh_token", refreshResponse.data.access);
          handleDeleteComment(commentId); 
        } catch (refreshErr) {
          console.error("Error refreshing token:", refreshErr);
        }
      }
    }
  };

  const handleEditComment = (commentId, initialText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(initialText);
  };

  const handleSaveEditedComment = async (commentId) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/comments/${commentId}/`, {
        comment: editedCommentText,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.status === 200) {
        console.log("Comment updated successfully.");ия
        const updatedComments = comments.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, comment: editedCommentText };
          }
          return comment;
        });
        setComments(updatedComments);
        setEditingCommentId(null);
      } else {
        console.error("Error updating comment. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="home-container">
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <strong>Author:</strong> {comment.author} <br />
            <strong>Date:</strong> {comment.pub_date} <br />
            {editingCommentId === comment.id ? (
              <div>
                <textarea
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                />
                <button onClick={() => handleSaveEditedComment(comment.id)}>Save</button>
              </div>
            ) : (
              <>
                <strong>Comment:</strong> {comment.comment}
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                <button onClick={() => handleEditComment(comment.id, comment.comment)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;