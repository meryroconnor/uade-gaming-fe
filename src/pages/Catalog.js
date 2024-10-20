import React, { useState, useEffect } from 'react';
import FilterMenu from '../components/FilterMenu';
import Game from '../components/Game';
import GameSearch from '../components/GameSearch';
import { useFetch } from '../useFetch';
import Navbar from '../components/Navbar';
import './Catalog.css';


const GamesList = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    // State for filters
    const [genre, setGenre] = useState('');
    const [os, setOs] = useState([]);
    const [language, setLanguage] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [playerMode, setPlayerMode] = useState('');
    const [rating, setRating] = useState('');


    const { data, loading, error } = useFetch('http://127.0.0.1:3000/games/');

    useEffect(() => {
        if (data) {
            setGames(data)
        }
    }, [data]);

    useEffect(() => {
        // Filter games based on selected filters
        const filtered = games.filter(game => {
            return (
                game.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (genre ? game.genre === genre : true) &&
                (os.length > 0 ? os.includes(game.os) : true) &&
                (language ? game.language === language : true) &&
                (priceFrom ? game.price >= Number(priceFrom) : true) &&
                (priceTo ? game.price <= Number(priceTo) : true) &&
                (playerMode ? game.playerMode === playerMode : true) &&
                (rating ? game.rating === Number(rating) : true)
            );
        });
        setFilteredGames(filtered);
    }, [games, genre, os, language, priceFrom, priceTo, playerMode, rating]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='catalog-body'>
            <Navbar />
        
            < div className='catalog-titles'>
                <h1>Showing <span className='titleInColor'>({filteredGames.length}) games</span> </h1>
                <GameSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="catalog-grid-container">
                {/* Sidebar */}
                <aside className="catalog-sidebar">
                    <FilterMenu
                        genre={genre}
                        setGenre={setGenre}
                        os={os}
                        setOs={setOs}
                        language={language}
                        setLanguage={setLanguage}
                        priceFrom={priceFrom}
                        setPriceFrom={setPriceFrom}
                        priceTo={priceTo}
                        setPriceTo={setPriceTo}
                        playerMode={playerMode}
                        setPlayerMode={setPlayerMode}
                        rating={rating}
                        setRating={setRating}
                    />
                </aside>

                {/* Game Catalog */}
                <section className="catalog-grid">
                    <div className="catalog-game-cards">
                        {filteredGames.map(game => (
                            <div key={game.id} className="game-card">
                                <Game game={game} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>

    );
};

export default GamesList;
