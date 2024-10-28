import React from 'react';
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { AiFillStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import './Game.css';


const GameChart = ({ 
  game, 
  variant , 
  onSettingsClick,
  isFavorite,
  onFavoriteClick,
  onAddToCart,
  onRemoveFromCart,
  isInCart
}) => {
  const date = new Date(game.createdAt).toISOString().split('T')[0];
  const renderButtons = () => {
    if (variant === 'catalog') {
      return (
        <button 
          className="button" 
          onClick={() => isInCart ? onRemoveFromCart(game) : onAddToCart(game)}
          
        >
          {isInCart ? "Remove" : "Add"} <BsCart4 className="icon-right" />
        </button>
      );
    } else if (variant === 'profile') {
      return (
        <button className="button">
          Rate! <AiFillStar className="icon-right" />
        </button>
      );
    } else if (variant === 'store') {
      return (
        <button className="button">
          Publish
        </button>
      );
    } else if (variant === 'cart') {
      return (
        <div className="button-group">
          <button className="button" onClick={() => onAddToCart(game)}>
            Add <BsCart4 className="icon-right" />
          </button>
          <button 
            className="favorite-button"
            onClick={onFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      );
    }
  };
  

  return (
    <div className={`game-container ${variant === 'store' ? 'store-variant' : ''}`}>
      {variant === 'store' && (
        <button 
          className="settings-button"
          onClick={onSettingsClick}
          aria-label="Settings"
        >
          <FiSettings />
        </button>
      )}
      
      <div className="image-container">
        <img
          src={game.image}
          alt={game.name}
          className="game-image"
        />
      </div>
      
      <div className="details-container">
        <h2 className="game-title">{game.name}</h2>
        <p className="release-info">
          {date} / {game.developer?.name}
        </p>
        
        <div className="rating-container">
          <div className="stars-container">
            {Array.from({ length: game.rating }, (_, index) => (
              <span key={index} className="star">⭐</span>
            ))}
          </div>
          <div className="price-container">
            <span className="price">
              {game.price === 0 ? "Free" : `$${game.price}`}
            </span>
          </div>
        </div>
        
        <div className="platforms-container">
          <div className="platform-icons">
            {game.os.isApple && <FaApple className="platform-icon" />}
            {game.os.isMicrosoft && <FaWindows className="platform-icon" />}
            {game.os.isLinux && <FaLinux className="platform-icon" />}
          </div>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default GameChart;

