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

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setCart([]);
                localStorage.removeItem('cart');
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const userId = user.user.id;
                const token = user.token;

                // Fetch cart data
                const cartResponse = await axios.post(`http://127.0.0.1:3001/carts/`, { userId }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCart(cartResponse.data);

                // Fetch game details
                const gamesResponse = await axios.get('http://127.0.0.1:3001/games/');

                setGames(gamesResponse.data);

                // Fetch wishlist items
                const wishlistResponse = await axios.get(`http://127.0.0.1:3001/wishlists/items/all`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(wishlistResponse.data);
                setWishlistItems(wishlistResponse.data);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

  
    return (
        <div className="user-profile">
            {/* <UserCover  />    */}
            {/* <ProductView  /> */}
            <Wishlist itemGames={wishlistItems} games={games} />
        </div>
    );
};

export default UserProfile;
