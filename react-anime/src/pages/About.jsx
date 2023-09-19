import Navbar from "@/components/Navbar";
import React from "react";
import "../scss/styles.scss"


const About = () => {
  return (
    <div>
      <Navbar /> 
      <div className="about-container">
        <h1 className="about-title">About</h1>
        <p className="about-text">
          I'm saet0sy, the author of the Anime Web Catalog. I'm a passionate anime enthusiast who loves to explore and discover new anime series from various genres. My goal is to provide a platform where fellow anime lovers can find information about their favorite anime and discover new ones to watch.
        </p>
        <p className="about-text">
          In my free time, I enjoy watching anime, reading manga, and discussing the latest releases with the anime community. I hope you find this catalog helpful and enjoyable as you explore the world of anime.
        </p>
        <h2>Contact Information</h2>
        <ul>
          <li>Email: saet0sy@gmail.com</li>
          <li>GitHub: <a href="https://github.com/saet0sy">github.com/saet0sy</a></li>
          <li>Twitter: <a href="https://twitter.com/saet0sy">twitter.com/saet0sy</a></li>
        </ul>
      </div>
    </div>
  );
};

export default About;
