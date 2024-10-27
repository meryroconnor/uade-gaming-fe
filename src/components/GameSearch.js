import React, { useState } from 'react';
import './GameSearch.css'; 

const GameSearch = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for game"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      {searchQuery && (
        <button className="clear-button" onClick={handleClearSearch}>
          &times;
        </button>
      )}
    </div>
  );
};

export default GameSearch;
