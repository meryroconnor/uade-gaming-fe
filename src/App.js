// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Highlights from './components/homepage/Highlights';
import Hero from './components/homepage/Hero';
import Register from './pages/Register';
import Login from './pages/Login';
import { UserProvider } from './userContext'; // Import UserContext
import useModal from './useModal';
import './App.css';

function App() {
  const loginModal = useModal();
  const registerModal = useModal();

  return (
      <Router>
        <div className="App">
          <Navbar 
            openLoginModal={loginModal.openModal} 
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
          <Hero />

          <div className="search-nav-wrapper">
            <SearchBar />
            <NavigationIcons />
          </div>
          <Carousel />
          <Highlights />
          <ImagesPlaceholder />
          <Testimonials />
          
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
