import React from 'react';
import './Game.css';
import { FaWindows } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";


const GameChart = ({ game }) => {
    
    return (
        <div className="container">
            <div className="imageContainer">
                <img
                    src={game.image}
                    alt=''
                    className="gameImage"
                />
            </div>
            <div className="detailsContainer">
                <h2 className="gameTitle">{game.name}</h2>
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
                        <span className="price">{game.price === 0 ? "Free" : `${game.price}`}</span>
                    </div>
                </div>
                <div className="platforms">
                    <div>
                        {game.os.includes("Mac") ? <span className="platformIcon"><FaApple /></span> : null}
                        {game.os.includes("Windows") ? <span className="platformIcon"><FaWindows /></span> : null}
                        {game.os.includes("Linux") ? <span className="platformIcon"><FaLinux /></span> : null}
                    </div>
                    <button className="addButton">Add <BsCart4 className='shoppingCart' /></button>
                </div>



            </div>
        </div>
    );
};

export default GameChart;
