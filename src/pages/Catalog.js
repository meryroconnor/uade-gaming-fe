import React, { useState, useEffect } from 'react';
import FilterMenu from '../components/FilterMenu';
import Game from '../components/Game';
import GameSearch from '../components/GameSearch';
import { useFetch } from '../useFetch';
import Navbar from '../components/Navbar';
import './Catalog.css';
import { useUser } from '../userContext';

const GamesList = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState({ items: [], totalPrice: 0 });

    const { data, loading, error } = useFetch('http://127.0.0.1:3001/games/');

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
            setGames(data);
        }
    }, [data]);

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
    }, [games, genre, os, language, priceFrom, priceTo, playerMode, rating, searchQuery]);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const addToCart = async (game) => {
        try {
            const response = await fetch('http://127.0.0.1:3001/carts/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    gameId: game.id,
                    quantity: 1,
                }),
            });

            if (response.ok) {
                const cartItem = await response.json();
                setCart((prevCart) => {
                    const updatedItems = [...prevCart.items, cartItem];
                    const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

                    return {
                        ...prevCart,
                        items: updatedItems,
                        totalPrice: updatedTotalPrice,
                    };
                });
                alert(`${game.name} has been added to your cart!`);
            } else {
                const errorData = await response.json();
                alert(`Error adding to cart: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add item to cart.');
        }
    };

    const removeFromCart = async (game) => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/carts/${cart.id}/items`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    gameId: game.id,
                }),
            });

            if (response.ok) {
                setCart((prevCart) => {
                    const updatedItems = prevCart.items.filter(item => item.gameId !== game.id);
                    const updatedTotalPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

                    return {
                        ...prevCart,
                        items: updatedItems,
                        totalPrice: updatedTotalPrice,
                    };
                });
                alert(`${game.name} has been removed from your cart.`);
            } else {
                const errorData = await response.json();
                alert(`Error removing from cart: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Failed to remove item from cart.');
        }
    };




    // Helper function to check if a game is in cart
    const isGameInCart = (gameId) => {
        console.log(cart.items);
        if (cart.items.length === 0) return false;
        return cart.items.some(item => item.gameId === gameId);
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className='catalog-body'>
            <div className='catalog-titles'>
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
                                <Game
                                    key={game.id}
                                    game={game}
                                    variant="catalog"
                                    onAddToCart={addToCart}
                                    onRemoveFromCart={removeFromCart}
                                    isInCart={isGameInCart(game.id)} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Pagination Buttons */}
            <div className="pagination">
                <button className='arrowButton' onClick={prevPage} disabled={currentPage === 1}>
                    ←
                </button>

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
