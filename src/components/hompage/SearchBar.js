import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select>
          <option value="">Genre</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="rpg">RPG</option>
          {/* Add more genres as needed */}
        </select>
        <select>
          <option value="">Mode</option>
          <option value="single-player">Single Player</option>
          <option value="multi-player">Multi Player</option>
          {/* Add more modes as needed */}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;