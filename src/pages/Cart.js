import React, { useState, useEffect } from 'react';
import './Cart.css';
import PurchaseTotal from '../components/PurchaseTotal';
import { useFetch } from '../useFetch';
import Game from '../components/Game';
import { useUser } from '../userContext';


const Cart = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to retrieve games in the cart
    const fetchCartGames = async () => {
        setLoading(true);
        setError(null); 
        console.log(user)
        try {
            const response = await fetch(`http://127.0.0.1:3000/carts/user/${user.user.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Include the token in the headers
                }
            });
            if (!response.ok) throw new Error('Failed to fetch cart games');
            const cartData = await response.json();
            setGames(cartData.cartItems); // Adjust according to response structure
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }        
    };

    useEffect(() => {
        fetchCartGames();
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