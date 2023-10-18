import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Navbar from "@/components/Navbar";
import "@/scss/styles.scss";

const AllAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const apiUrl = "http://127.0.0.1:8000/api/anime/";

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
          const data = response.data;
          setAnimeList(data.results);
        } else {
          console.error("Ошибка при загрузке данных");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    };

    fetchAnimeData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/genres/");
        if (response.status === 200) {
          setGenres(response.data.results);
        } else {
          console.error("Ошибка при загрузке жанров");
        }
      } catch (error) {
        console.error("Произошла ошибка при загрузке жанров", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (e) => {
    const genreName = e.target.value;
    let newSelectedGenres = [...selectedGenres];

    if (e.target.checked) {
      newSelectedGenres.push(genreName);
    } else {
      newSelectedGenres = newSelectedGenres.filter((genre) => genre !== genreName);
    }

    setSelectedGenres(newSelectedGenres);
  };

  const applyFilters = async () => {
    if (selectedGenres.length === 0) {
      // Если массив selectedGenres пуст, запросить все аниме
      const url = `${apiUrl}`;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = response.data;
          setAnimeList(data.results);
        } else {
          console.error("Ошибка при загрузке данных");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    } else {

      const genreQuery = selectedGenres.join("&genres=");
      const url = `${apiUrl}?genres=${genreQuery}`;
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = response.data;
          setAnimeList(data.results);
        } else {
          console.error("Ошибка при загрузке данных");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1 style={{color:"white", marginLeft:"40%", padding:"5vh"}}>Anime Database</h1>
      <div style={{
        color: "white",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "20px"
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {genres.map((genre) => (
            <label key={genre.id} style={{
              width: "calc(50% - 30%)", 
              margin: "5px", 
            }}>
              <input
                type="checkbox"
                value={genre.name}
                checked={selectedGenres.includes(genre.name)}
                onChange={handleGenreChange}
              />
              {genre.name}
            </label>
          ))}
        </div>
        <button style={{backgroundColor: "#262626", color:"white", border:"none", marginTop: "10px", padding:"10px"}} onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="top-list">
        <ul>
          {animeList.map((anime) => (
            <li key={anime.id} className="top-card">
              <Link to={`/anime/${anime.id}`}>
                <img src={anime.image} alt={anime.title} />
                <h3>{anime.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllAnime;
