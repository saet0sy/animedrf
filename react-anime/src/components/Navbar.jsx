import { Link } from "react-router-dom";
import "../scss/styles.scss";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';

const Navbar = () => {
  const routes = [
    {
      path: "/",
      title: "TOP 20",
    },
    {
      path: "/about",
      title: "About",
    },
    {
      path: "/anime",
      title: "Anime",
    },
    {
      path: "/login",
      title: "Login",
    },
    // {
    //   path: "/profile",
    //   title: "Profile",
    // },
    {
      path: "/all",
      title: "Anime Database",
    }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  const searchAnime = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/anime/?search=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      } else {
        console.error("Ошибка при выполнении поиска");
      }
    } catch (error) {
      console.error("Произошла ошибка", error);
    }
  };

  return (
    <nav className="navbar">
      <div ref={searchRef}>
        {(!id || id === 'top') &&
        <input
          type="text"
          placeholder="Search Anime..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            searchAnime();
          }}
          className={`search-input ${isLoggedIn ? "" : "disabled"}`}
          disabled={!isLoggedIn}
        />}
        <ul className="nav-ul">
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((result, idx) => (
                <li key={idx} className="nav-li">
                  <Link to={`/anime/${result.id}`} className="nav-link">
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {routes.map((route, idx) => (
            <li key={idx} className="nav-li">
              {route.path === "/login" && isLoggedIn ? (
                <button onClick={handleLogout} className="nav-link">
                  Logout
                </button>
              ) : (
                <Link to={route.path} className="nav-link">
                  {route.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
