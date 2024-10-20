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

    const { data, loading, error } = useFetch('http://127.0.0.1:3000/games/');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredGames.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // State for filters
    const [genre, setGenre] = useState('');
    const [os, setOs] = useState([]);
    const [language, setLanguage] = useState('');
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [playerMode, setPlayerMode] = useState('');
    const [rating, setRating] = useState('');



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
                        {currentItems.map(game => (
                            <div key={game.id} className="game-card">
                                <Game game={game} />
                            </div>
                        ))}
                    </div>



                </section>







            </div>
            {/* Botones de paginación */}
            <div className="pagination">
                <button className='arrowButton' onClick={prevPage} disabled={currentPage === 1}>
                    ←
                </button>
                {/* <span>{currentPage}</span> */}
                <button className='arrowButton'
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
