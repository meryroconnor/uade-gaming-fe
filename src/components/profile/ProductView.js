import React from 'react';
import GameChart from '../Game';
import './ProductView.css';

// Import images
import doomEternalImg from '../../images/games/zelda.jpg';


const ProductView = () => {
  const games = [
    {
        image: doomEternalImg,
        name: "Game Name",
        createdAt: "2024",
        developer: "Developer Name",
        rating: 4,
        price: 29.99,
        os: {
          isApple: true,
          isMicrosoft: true,
          isLinux: false
        }
      }
  ];

  return (
    <div className="product-view">
      <h2 className="highlights__title">My Products</h2>


      <div className="highlights__products_view">
        {games.map(game => (
          <GameChart
            game={game}
            variant='store'
          />
        ))}
      </div>
    </div>
  );
};

export default ProductView;