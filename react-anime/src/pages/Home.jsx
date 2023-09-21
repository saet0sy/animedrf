import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "@/scss/styles.scss"


const Home = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime?limit=21');
        if (response.data && response.data.data) {
          setTopAnime(response.data.data);
          setIsLoading(false);
        } else {
          console.error('Ошибка при загрузке топа аниме: Ответ не содержит данных о топ-20 аниме.');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Ошибка при загрузке топа аниме:', error);
        setIsLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  return (
    <div>
      <Navbar />
        <h2>Top 20 Anime</h2>
        <div className="top-list">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {topAnime.map((anime) => (
                <li key={anime.mal_id} className="top-card"> 
                  <h3>{anime.title}</h3>
                  <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                  <p>Rating: {anime.score}</p>
                  <p>Views: {anime.members}</p>

                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
  );
};

export default Home;






