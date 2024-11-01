import React, { useState, useEffect } from 'react';
import Game from '../components/Game';
import { useFetch } from '../useFetch';
import { useUser } from '../userContext';

import ProductView from '../components/profile/ProductView';
import UserCover from '../components/profile/UserCover';
import Wishlist from '../components/profile/Wishlist';
import axios from 'axios';


const UserProfile = () => {
    const { user } = useUser();
    const [games, setGames] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

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

        // Fetch wishlist items function
        const getWishlistItems = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3001/wishlists/items/all`, {
                    method: 'GET', // Specify the HTTP method (optional, as 'GET' is default)
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Include the token in the Authorization header
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch wishlist items');
                }
                const data = await response.json();
                setWishlistItems(data);
            } catch (error) {
                console.error('Error fetching wishlist items:', error);
            }

        };

        if (cart.length > 0) {
            fetchGameDetails();
        } else {
            setGames([]); // Empty the games if the cart is empty
        }

        fetchCart();
        fetchGameDetails();
        getWishlistItems();
    }, [user,cart]);


    return (
        <div className="user-profile">
            {/* <UserCover  />    */}
            {/* <ProductView  /> */}
            <Wishlist itemGames={wishlistItems} />
        </div>
    );
};

export default UserProfile;
