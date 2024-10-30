import React, { useState, useEffect } from 'react';
import './Cart.css';
import PurchaseTotal from '../components/PurchaseTotal';
import { useFetch } from '../useFetch';
import Game from '../components/Game';
import { useUser } from '../userContext';
import axios from 'axios';


const Cart = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        try {
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];
            return Array.isArray(parsedCart) ? parsedCart : [];
        } catch (error) {
            console.error('Error parsing cart data from localStorage:', error);
            return [];
        }
    });
    

    // Fetch the cart data on component mount
    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                setLoading(true);
                try {
                    const userId = user.user.id;
                    const token = user.token;
    
                    const response = await axios.post(`http://127.0.0.1:3001/carts/`, 
                        { userId },  // Send userId in the request body
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setCart(response.data);                    
                } catch (err) {
                    setError('Error fetching cart data');
                } finally {
                    setLoading(false);
                }
            } else {
                // User is logged out, clear the cart
                setCart([]);
                localStorage.removeItem('cart');
            }            
        };
    
        fetchCart();
    }, [user]);
    
    // Fetch game details whenever the cart changes
    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);
            try {
                const gameIds = cart.map(item => item.gameId);                
                const gameDetails = await Promise.all(
                    gameIds.map(async id => {
                        const response = await axios.get(`http://127.0.0.1:3001/games/${id}`);
                        return response.data;
                    })
                );
                setGames(gameDetails);
            } catch (err) {
                setError('Error fetching game details');
            } finally {
                setLoading(false);
            }
        };

        if (cart.length > 0) {
            fetchGameDetails();
        } else {
            setGames([]); // Empty the games if the cart is empty
        }
        
    }, []);

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
                // Update the cart state to remove the game
                setCart((prevCart) => prevCart.filter(item => item.gameId !== game.id));
    
                // Also remove the game from the games state
                setGames((prevGames) => prevGames.filter(g => g.id !== game.id));
    
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
    


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="cart-body">
            < div className='cart-titles'>
                <h2><span className='titleInColor'>({games.length}) Products</span> </h2>
            </div>

            <div className="cart-grid-container">
                {/* Game Cart */}
                <section className="cart-grid">
                    <div className="cart-game-cards">
                        {games.map(game => (
                            <div key={game.id} className="game-card">
                                <Game
                                    key={game.id}
                                    game={game}
                                    variant="cart"
                                    onRemoveFromCart={removeFromCart} />
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="cart-sidebar">
                <PurchaseTotal productCount={games.length} productTotal={cart.totalPrice}/>


                </aside>
            </div>

        </div>
    );
}

export default Cart;