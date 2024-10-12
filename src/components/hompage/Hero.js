import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import heroImage from '../../images/hero.png'; 

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1><span className="highlight">GAME START</span></h1>
        <h2>VISIT OUR CATALOG</h2>
        <p>Welcome to our gaming universe! Dive into our vast collection of games, from classic titles to the latest releases. Start your gaming journey with us!</p>
        <div className="hero-buttons">
          <Link to="/catalog" className="btn btn-primary">Start a Story</Link>
          <Link to="/catalog" className="btn btn-secondary">See all games</Link>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Gaming controller" />
      </div>
    </div>
  );
};

export default Hero;