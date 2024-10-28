import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';

import './App.css';

import Login from './pages/Login';
import Register from './pages/Register';

import UserCover from './components/profile/UserCover'
import useModal from './useModal';
import { UserProvider } from './userContext';
import GameChart from './components/Game';
import Footer from './components/Footer';
import Wishlist from './components/profile/Wishlist';
import ProductView from './components/profile/ProductView';


const gameData = {
  image: "url-to-image",
  name: "Game Name",
  releaseDate: "2024-10-19T17:36:58.000Z",
  developer: "Developer Name",
  rating: 4,
  price: 29.99,
  os: {
    isApple: true,
    isMicrosoft: true,
    isLinux: false
  }
};

function App() {

  const loginModal = useModal();
  const registerModal = useModal();

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar openLoginModal={loginModal.openModal}
            openRegisterModal={registerModal.openModal}
          />
          <Register isOpen={registerModal.isOpen} onClose={registerModal.closeModal} />
          <Login isOpen={loginModal.isOpen} onClose={loginModal.closeModal} />
         
         <UserCover />
         <ProductView />
         <Wishlist />

         
        <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
