import React from 'react';
import './ProductHero.css';
import image from '../../images/games/turismo.jpg'

const ProductHero = () => {
    const game = {
        image: image,
        releaseInfo: "2024-10-01",
        title: "Gran Turismo 7",
        description: "Gran Turismo 7 is a racing simulation video game developed. The game is the eighth main installment and the thirteenth overall in the Gran Turismo series. It was released for the PlayStation 4 and PlayStation",
        price: 10.00
    };
    
    return (
        <div className="product-hero">
            <img className="product-hero-image" src={game.image} alt={game.title} />
            <div className="product-hero-content">
                <p className="release-info">Release year {new Date(game.releaseInfo).getFullYear()}</p>
                <h1 className="product-title">{game.title}</h1>
                <p className="product-description">{game.description}</p>
                <div className="price-section">
                    <span className="price">${game.price.toFixed(2)}</span>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Add to Cart</button>
                        <button className="btn btn-secondary">♡ Add to Wish</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ProductHero;