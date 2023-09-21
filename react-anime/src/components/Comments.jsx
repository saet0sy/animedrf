import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/scss/styles.scss";


const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);

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
  };

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
  }, []);

  return (
    <div className="home-container">
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment-item">
            <strong>Author:</strong> {comment.author} <br />
            <strong>Date:</strong> {comment.pub_date} <br />
            <strong>Comment:</strong> {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;