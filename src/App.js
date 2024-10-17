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
import Game from './components/Game';
import FilterMenu from './components/FilterMenu';
import PurchaseTotal from './components/PurchaseTotal';
import useModal from './useModal';

function App() {

  const { isOpen, openModal, closeModal } = useModal();
  

  return (
    <Router>
      <div className="App">
      <Navbar openModal={openModal} /> {/* Pass openModal as a prop */}
      <Register isOpen={isOpen} onClose={closeModal} />
      <Hero />
      </div>


    </Router>
  );
}

export default App;
