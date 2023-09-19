import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '@/components/Loading';
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import '../scss/styles.scss'

const AnimeDetail = () => {
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [anime, setAnime] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/anime/${id}/`)
      .then((res) => { setAnime(res.data) });
  }, []);

  const onSubmit = (data) => {
    const r = {
      ...data,
      anime: anime.id,
      author: JSON.parse(localStorage.getItem("user")).id,
    };
    axios
      .post(`http://localhost:8000/api/comments/`, r, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCommentSubmitted(true);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          axios
            .post(`http://localhost:8000/auth/jwt/refresh/`, {
              refresh: localStorage.getItem("refresh_token"),
            })
            .then((res) => {
              localStorage.setItem("refresh_token", res.data.access);
              onSubmit(data);
            });
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="anime-detail-container">
        {anime ? (
          <div className="anime-details">
            <img src={anime.image} alt={anime.title} className="anime-image" />
            <h2>{anime.title}</h2>
            <p className="anime-description">{anime.description}</p>
            <ul className="anime-genres">
              {anime.genres.map((genre, idx) => (
                <li key={idx} className="anime-genre">{genre}</li>
              ))}
            </ul>
            <video src={anime.trailer} controls className="anime-trailer" />
            {commentSubmitted && <div className="comment-submitted">Comment submitted</div>}
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Comment"
                {...register("comment", { required: true })}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
export default AnimeDetail;