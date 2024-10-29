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
        // Load cart from localStorage if it exists
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Fetch the cart data on component mount
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            try {
                const userId = user.user.id;
                const token = user.token;

                const response = await axios.get(`http://127.0.0.1:3001/carts/${userId}`, {
                    headers: {                        
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCart(response.data);
            } catch (err) {
                setError('Error fetching cart data');
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);




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
                                <Game game={game} variant />
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="cart-sidebar">
                    <PurchaseTotal />
                </aside>
            </div>

        </div>
    );
}

export default Cart;