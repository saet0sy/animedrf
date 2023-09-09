import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '@/components/Loading';
import Navbar from "@/components/Navbar";

const AnimeDetail = () => {
  const [anime, setAnime] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/anime/${id}/`)
      .then((res) => { setAnime(res.data) });
  }, []);

  return (
    <>
      <Navbar />
      <h1>Anime Detail</h1>
      {
        anime ? (
          <div>
            <h2>{anime.title}</h2>
            <img src={anime.image} alt={anime.title} />
            <p>{anime.description}</p>
            <video src={anime.trailer} controls />
          </div>
        ) : <Loading />
      }
    </>
  );
}

export default AnimeDetail;