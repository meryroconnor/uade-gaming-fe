import React, { useState, useEffect } from 'react';
import FilterMenu from '../components/FilterMenu';
import Game from '../components/Game';
import GameSearch from '../components/GameSearch';
import { gameService } from '../services/gameService';
import { useUser } from '../userContext';
import './Catalog.css';

const GamesList = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Pagination
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

    // Fetch games
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await gameService.getAllGames();
                setGames(data);
                setFilteredGames(data); // Initialize filtered games with all games
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    // Apply filters
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
                (!rating || game.rating == Number(rating))
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
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Cart operations
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = async (game) => {
        try {
            const cartItem = await gameService.addToCart(game.id, 1);
            setCart((prevCart) => [...prevCart, cartItem]);
            alert(`${game.name} has been added to your cart!`);
        } catch (error) {
            alert('Failed to add item to cart.');
        }
    };

    const removeFromCart = async (game) => {
        try {
            await gameService.removeFromCart(cart.id, game.id);
            setCart((prevCart) => prevCart.filter(item => item.gameId !== game.id));
            alert(`${game.name} has been removed from your cart.`);
        } catch (error) {
            alert('Failed to remove item from cart.');
        }
    };

    const isGameInCart = (gameId) => {
        return cart.some(item => item.gameId === gameId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='catalog-body'>
            <div className='catalog-titles'>
                <h1>Showing <span className='titleInColor'>({filteredGames.length}) games</span> </h1>
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
                                <Game
                                    key={game.id}
                                    game={game}
                                    variant="catalog"
                                    onAddToCart={addToCart}
                                    onRemoveFromCart={removeFromCart}
                                    isInCart={isGameInCart(game.id)} 
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="pagination">
                <button className='arrowButton' onClick={prevPage} disabled={currentPage === 1}>
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