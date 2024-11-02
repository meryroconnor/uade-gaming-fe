import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/homepage/Hero';
import SearchBar from './components/homepage/SearchBar';
import NavigationIcons from './components/homepage/NavigationIcons';
import './App.css';
import Carousel from './components/homepage/Carousel';
import ImagesPlaceholder from './components/homepage/ImagesPlaceholder';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from './pages/Catalog';
import Game from './components/Game';
import FilterMenu from './components/FilterMenu';
import PurchaseTotal from './components/PurchaseTotal';
import useModal from './useModal';
import { UserProvider } from './userContext';
import Highlights from './components/homepage/Highlights';
import Testimonials from './components/homepage/Testimonials';
import Cart from './pages/Cart';
import Buyout from './components/Buyout';

import UserProfile from './pages/UserProfile';


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
          <Register 
            isOpen={registerModal.isOpen} 
            onClose={registerModal.closeModal} 
          />
          <Login 
            isOpen={loginModal.isOpen} 
            onClose={loginModal.closeModal} 
          />
          {/* <Hero />
          <SearchBar />
          <Carousel />
          <Highlights />
          <ImagesPlaceholder />
          <Testimonials /> */}

          {/* <Catalog /> */}
          <Cart />
          {/* <Buyout/> */}

          {/* <UserProfile /> */}
        </div>

      </Router>
    </UserProvider>
  );
}

export default App;
