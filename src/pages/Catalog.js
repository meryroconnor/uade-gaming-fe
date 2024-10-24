import React, { useState, useEffect } from 'react';
import FilterMenu from './FilterMenu';
import Game from '../components/Game';


const GamesList = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);


    // State for filters
    const [genre, setGenre] = useState('');
    const [os, setOs] = useState([]);
    const [language, setLanguage] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [playerMode, setPlayerMode] = useState('');
    const [rating, setRating] = useState('');

    useEffect(() => {
        // Fetch games data
        const { data, loding, error } = useFetch(`http://localhost/api/games/`);
        
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;

        setGames(data)
    }, []);

    useEffect(() => {
        // Filter games based on selected filters
        const filtered = games.filter(game => {
            return (
                (genre ? game.genre === genre : true) &&
                (os ? game.os === os : true) &&
                (language ? game.language === language : true) &&
                (priceFrom ? game.price >= Number(priceFrom) : true) &&
                (priceTo ? game.price <= Number(priceTo) : true) &&
                (playerMode ? game.playerMode === playerMode : true) &&
                (rating ? game.rating === Number(rating) : true)
            );
        });
        setFilteredGames(filtered);
    }, [games, genre, os, language, priceFrom, priceTo, playerMode, rating]);

    return (
        <div>
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

            <div className="games-list">
                {filteredGames.map(game => (
                    <div key={game.id} className="game-card">
                        <Game id={game.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GamesList;
