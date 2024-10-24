import React from 'react';
import './GameCardSm.css';

const GameCardSm = ({ title, image, price, rating }) => {
  return (
    <div className="game-card-sm">
      <div className="game-card-sm__image-container">
        <img src={image} alt={title} className="game-card-sm__image" />
      </div>
      <div className="game-card-sm__content">
        <h3 className="game-card-sm__title">{title}</h3>
        <div className="game-card-sm__footer">
          <div className="game-card-sm__price-rating">
            <span className="game-card-sm__price">${price.toFixed(2)}</span>
            <span className="game-card-sm__rating">/ {rating}</span>
          </div>
          <button className="game-card-sm__cart-button">+ Cart</button>
        </div>
      </div>
    </div>
  );
};

export default GameCardSm;