import React from 'react';
import GameCardSm from '../GameCardSm';
import './Wishlist.css';

// Import images
import doomEternalImg from '../../images/games/zelda.jpg';
import residentEvilImg from '../../images/games/evil.jpg';
import forzaHorizon4Img from '../../images/games/forza.jpg';
import silentHill2Img from '../../images/games/silent.jpg';
import ageOfEmpiresImg from '../../images/games/age_of_empires.jpg';
import horizonImg from '../../images/games/helldivers.jpg';
import tombRaiderImg from '../../images/games/tomb_raider.jpg';
import granTurismo7Img from '../../images/games/turismo.jpg';

const Wishlist = (
  itemsGames,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
) => {
  const games = [
    { id: 1, title: "Zelda", image: doomEternalImg, price: 10.00, rating: 4.5 },
    { id: 2, title: "Resident Evil", image: residentEvilImg, price: 15.55, rating: 3.9 },
    { id: 3, title: "Forza Horizon 4", image: forzaHorizon4Img, price: 22.00, rating: 4.6 },
    { id: 4, title: "Silent Hill 2", image: silentHill2Img, price: 25.00, rating: 4.1 },
    { id: 5, title: "Age of Empires", image: ageOfEmpiresImg, price: 24.00, rating: 4.2 },
    { id: 6, title: "Hell Drivers", image: horizonImg, price: 16.60, rating: 4.0 },
    { id: 7, title: "Tomb Raider", image: tombRaiderImg, price: 21.00, rating: 4.0 },
    { id: 8, title: "Gran Turismo 7", image: granTurismo7Img, price: 18.50, rating: 5.0 },
  ];


  return (
    <div className="highlights">
      <h2 className="highlights__title">♡ Wishlist</h2>


      {/* <div className="highlights__games">
        {games.map(game => (
          <GameCardSm
            key={game.id}
            title={game.title}
            image={game.image}
            price={game.price}
            rating={game.rating}
          />
        ))}
      </div> */}

      
    </div>
  );
};

export default Wishlist;