import React from 'react';
import './Game.css';
import CrashImage from '../images/games/crash.jpg';
import { FaWindows } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const GameChart = () => {
    return (
        <div className="container">
            <div className="imageContainer">
                <img
                    src={CrashImage}
                    alt="Crash Bandicoot 4"
                    className="gameImage"
                />
            </div>
            <div className="detailsContainer">
                <h2 className="gameTitle">Crash Bandicoot 4</h2>
                <p className="releaseInfo">
                    September 14th 2023 / Naughty Dog
                </p>
                <div className="rating">
                    <div className='starsContainer'>
                        <span className="star">⭐</span>
                        <span className="star">⭐</span>
                        <span className="star">⭐</span>
                        <span className="star">⭐</span>
                    </div>
                    <div className="priceContainer">
                        <span className="price">$40.00</span>
                    </div>
                </div>
                <div className="platforms">
                    <div>
                        <span className="platformIcon"><FaApple /></span>
                        <span className="platformIcon"><FaWindows /></span>
                        <span className="platformIcon"><FaLinux /></span>
                    </div>
                    <button className="addButton">Add <BsCart4 className='shoppingCart' /></button>
                </div>
                


            </div>
        </div>
    );
};

export default GameChart;
