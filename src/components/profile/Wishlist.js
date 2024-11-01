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
  games,
  wishlistItems,
  onAddToCart,
  onRemoveFromCart,
  isInCart,
) => {

  const isGameInWishlist = (gameId) => {
    // Assuming wishlistItems is an array of items
    return wishlistItems && wishlistItems.some(item => item.gameId === gameId);
  };



  return (
    <div className="highlights">
      <h2 className="highlights__title">♡ Wishlist</h2>


      <div className="highlights__games">
        {/* {games
          .filter(game => isGameInWishlist(game.id))
          .map(game => (
            <GameCardSm
              key={game.id}
              title={game.title}
              image={game.image}
              price={game.price}
              rating={game.rating}
            />
          ))} */}
      </div>



    </div>
  );
};

export default Wishlist;