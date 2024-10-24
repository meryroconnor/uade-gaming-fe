import React from 'react';
import './Game.css';
import useFetch from '../useFetch';
import { FaWindows } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const GameChart = ({ id }) => {
    const { data, loading, error } = useFetch(`http://localhost/api/games/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const game = data?.find((game) => game.id === id);
    return (
        <div className="container">
            <div className="imageContainer">
                <img
                    src={game.image}
                    alt={game.title}
                    className="gameImage"
                />
            </div>
            <div className="detailsContainer">
                <h2 className="gameTitle">{game.title}</h2>
                <p className="releaseInfo">
                    `{game.releaseDate} / {game.developer}`
                </p>
                <div className="rating">
                    <div className='starsContainer'>
                        {Array.from({ length: game.rating }, (_, index) => (
                            <span key={index}>⭐</span>
                        ))}
                    </div>
                    <div className="priceContainer">
                        <span className="price">{game.price}</span>
                    </div>
                </div>
                <div className="platforms">
                    <div>
                        {game.platforms.isApple ? <span className="platformIcon"><FaApple /></span> : null}
                        {game.platforms.isMicrosoft ? <span className="platformIcon"><FaWindows /></span> : null}
                        {game.platforms.isLinux ? <span className="platformIcon"><FaLinux /></span> : null}                        
                    </div>
                    <button className="addButton">Add <BsCart4 className='shoppingCart' /></button>
                </div>



             </div>
        </div>
     );
 };

 export default GameChart;
