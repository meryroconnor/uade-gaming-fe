import React, { useState, useEffect } from 'react';
import FilterMenu from '../components/FilterMenu';
import Game from '../components/Game';
import GameSearch from '../components/GameSearch';
import useFetch from '../useFetch'; // Updated import
import Navbar from '../components/Navbar';
import './Catalog.css';

const GamesList = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Updated useFetch call - removed curly braces
    const { data, loading, error } = useFetch('http://127.0.0.1:3000/games/');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Filter states
    const [genre, setGenre] = useState('');
    const [os, setOs] = useState([]);
    const [language, setLanguage] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [playerMode, setPlayerMode] = useState('');
    const [rating, setRating] = useState('');

    // Update games when data changes
    useEffect(() => {
        if (data) {
            setGames(data);
            setFilteredGames(data); // Initialize filtered games with all games
        }
    }, [data]);

    // Filter games when any filter changes
    useEffect(() => {
        const filtered = games.filter(game => {
            return (
                (!searchQuery || game.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!genre || game.genre.toLowerCase() === genre.toLowerCase()) &&
                (os.length === 0 || game.os.toLowerCase().includes(os.toLowerCase())) &&
                (!language || game.language.toLowerCase().includes(language.toLowerCase())) &&
                (!priceFrom || game.price >= Number(priceFrom)) &&
                (!priceTo || game.price <= Number(priceTo)) &&
                (!playerMode || game.playerMode.toLowerCase().includes(playerMode.toLowerCase())) &&
                (!rating || game.rating === Number(rating))
            );
        });
        
        setFilteredGames(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [games, genre, os, language, priceFrom, priceTo, playerMode, rating, searchQuery]);

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredGames.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (indexOfLastItem < filteredGames.length) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (loading) return <div className="catalog-body"><Navbar /><p>Loading...</p></div>;
    if (error) return <div className="catalog-body"><Navbar /><p>Error: {error.message}</p></div>;

    return (
        <div className='catalog-body'>
            <Navbar />
            <div className='catalog-titles'>
                <h1>Showing <span className='titleInColor'>({filteredGames.length}) games</span></h1>
                <GameSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="catalog-grid-container">
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

                <section className="catalog-grid">
                    <div className="catalog-game-cards">
                        {currentItems.map(game => (
                            <div key={game.id} className="game-card">
                                <Game game={game} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="pagination">
                <button 
                    className='arrowButton' 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                >
                    ←
                </button>
                <button 
                    className='arrowButton'
                    onClick={nextPage}
                    disabled={indexOfLastItem >= filteredGames.length}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default GamesList;