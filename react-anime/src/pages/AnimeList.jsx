import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Navbar from "@/components/Navbar";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/anime/")
      .then((res) => { setAnimeList(res.data.results) });
  }, []);

  return (
    <>
      <Navbar />
      <h1>Anime List</h1>
      {
        animeList ? (
          animeList.map((anime) => {
            return (
              <Link to={`/anime/${anime.id}`} key={anime.id}>
                <h2>{anime.title}</h2>
                <img src={anime.image} alt={anime.title} />
              </Link>
            )
          })
        ) : <Loading />
      }
    </>
  )
}

export default AnimeList;