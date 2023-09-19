import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import "../scss/styles.scss";
import { Link } from 'react-router-dom';


const Home = () => {
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
    axios.get("http://127.0.0.1:8000/api/comments/")
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
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Comments:</h1>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <strong>Author:</strong> {comment.author} <br />
              <strong>Anime:</strong> <Link to={`/anime/${comment.anime.id}`} className="link-style">{comment.anime.title}</Link> <br />
              <strong>Date:</strong> {comment.pub_date} <br />
              <strong>Comment:</strong> {comment.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;