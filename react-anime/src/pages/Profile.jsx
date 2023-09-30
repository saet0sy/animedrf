import Navbar from "@/components/Navbar";
import "@/scss/styles.scss"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h1 style={{color: "white"}}>Профиль пользователя: {userData.username}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{color: "white"}}>Имя пользователя:</label>
          <input
            type="text"
            name="username"
            value={updateData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label style={{color: "white"}}>Электронная почта:</label>
          <input
            type="email"
            name="email"
            value={updateData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label style={{color: "white"}}>Новый пароль:</label>
          <input
            type="password"
            name="password"
            value={updateData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div>
  );
};

export default Profile;



