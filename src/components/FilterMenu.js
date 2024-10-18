import React, { useState } from 'react';
import './FilterMenu.css'; // Import the CSS file

const FilterMenu = () => {
  const [genre, setGenre] = useState('');
  const [os, setOs] = useState('');
  const [language, setLanguage] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [playerMode, setPlayerMode] = useState('');
  const [rating, setRating] = useState('');

  return (
    <div className="filter-menu">
      <div className="filter-group">
        <label>Genre</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select a genre</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="rpg">RPG</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Operative system</label>
        <div>
          <input type="radio" name="os" value="mac" onChange={() => setOs('Mac')} /> Mac
        </div>
        <div>
          <input type="radio" name="os" value="windows" onChange={() => setOs('Windows')} /> Windows
        </div>
        <div>
          <input type="radio" name="os" value="linux" onChange={() => setOs('Linux')} /> Linux
        </div>
      </div>

      <div className="filter-group">
        <label>Language</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select a language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="german">German</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="From"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="To"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Player Mode</label>
        <div>
          <input type="radio" name="playerMode" value="single" onChange={() => setPlayerMode('Single Player')} /> Single Player
        </div>
        <div>
          <input type="radio" name="playerMode" value="multi" onChange={() => setPlayerMode('Multi-Player')} /> Multi-Player
        </div>
      </div>

      <div className="filter-group">
        <label>Rating</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select a rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
        </select>
      </div>
    </div>
  );
};

export default FilterMenu;
