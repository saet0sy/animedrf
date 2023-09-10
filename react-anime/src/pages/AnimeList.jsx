import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar';
import backgroundImage from '@/images/backgroundImage.png';
import arrowImage from '@/images/arrow.png';
import lineImage from '@/images/line.png';
import "../scss/styles.scss"

const AnimeList = () => {
  const [animeList, setAnimeList] = useState(null);
  const [randomAnime, setRandomAnime] = useState(null);

  useEffect(() => {
    // Генерация случайного числа для выбора случайного аниме
    axios.get('http://localhost:8000/api/anime/')
      .then((res) => {
        const animeList = res.data.results;
        const randomIndex = Math.floor(Math.random() * animeList.length);
        setRandomAnime(animeList[randomIndex]);
      });

    // Загрузка списка аниме
    axios.get('http://localhost:8000/api/anime/')
      .then((res) => setAnimeList(res.data.results));
  }, []);

  return (
    <div className="containerStyle">
      <Navbar />
      <div className="searchContainer">
        <input type="text" placeholder="something in my..." className="inputStyle" />
        <button className="buttonStyle">Search</button>
      </div>
      <h1 className="titleStyle">
        Random Anime
        <img src={arrowImage} alt="Arrow" className="arrowStyle" />
        <img src={lineImage} alt="Line" className="lineStyle" />
      </h1>
      {randomAnime ? (
        <div className="randomAnimeStyle">
            <div className="randomAnimeContent">
            <Link to={`/anime/${randomAnime.id}`} className="animeLink"> <img src={randomAnime.image} alt={randomAnime.title} /></Link>
            <Link to={`/anime/${randomAnime.id}`} className="animeLink2"> <h2 className="animeTitleStyle">{randomAnime.title}</h2></Link>
            </div>
        </div>
      ) : (
        <Loading />
      )}
      <h2 className="alsoToWatchTitle">Also to watch</h2>
      <div className="alsoToWatchContainer">
        {animeList && animeList.slice(0, 4).map((anime) => (
          <div key={anime.id} className="animeCardStyle">
            <Link to={`/anime/${anime.id}`} className="animeLink">
              <img
                src={anime.image}
                alt={anime.title}
                className="animeCardImageStyle"
              />
              <div className="animeCardTitleStyle">{anime.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
