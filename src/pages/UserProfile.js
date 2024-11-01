import React, { useState, useEffect } from 'react';
import Game from '../components/Game';
import { useFetch } from '../useFetch';
import { useUser } from '../userContext';

import ProductView from '../components/profile/ProductView';
import UserCover from '../components/profile/UserCover';
import Wishlist from '../components/profile/Wishlist';

const UserProfile = () => {
    const { user } = useUser();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


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



  // Fetch wishlist items function
  const getWishlistItems = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3001/${user.user.id}/items`); // Fetch from the backend API
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }
      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }

    console.log(wishlistItems)
  };

  // Fetch wishlist items on component mount
  useEffect(() => {
    if (user) {
      getWishlistItems();
    }
  }, [user]);


    return (
        <div className="user-profile">
            {/* <UserCover  />    */}
            {/* <ProductView  /> */}
            <Wishlist itemGames={wishlistItems}/>
        </div>
    );
};

export default UserProfile;
