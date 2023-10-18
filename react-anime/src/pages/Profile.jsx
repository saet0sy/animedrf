import Navbar from "@/components/Navbar";
import "@/scss/styles.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { YMaps, Map, Placemark } from "react-yandex-maps";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8000/auth/users/me/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:8000/auth/users/me/', updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        console.log('Электронная почта пользователя обновлена:', response.data);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении электронной почты пользователя:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="form-container">
          <h1>Профиль пользователя: {userData.username}</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <label style={{ fontSize: "20px" }}>Электронная почта: {userData.email}</label>
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleInputChange}
            />
            <button type="submit">Submit</button>
          </form>
          <div className="map-container">
            <YMaps>
              <Map
                defaultState={{ center: [43.23835784748691,76.91398486441805], zoom: 18 }}
                width="100%"
                height="400px"
              >
                {/* Пример Placemark */}
                <Placemark geometry={[43.23835784748691,76.91398486441805]} />
              </Map>
            </YMaps>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
