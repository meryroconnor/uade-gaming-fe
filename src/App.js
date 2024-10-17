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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <div className="content-wrapper">
          <Hero />
          <div className="search-nav-wrapper">
            <SearchBar />
            <NavigationIcons />
          </div>
          <Carousel />
          <ImagesPlaceholder />
        </div> */}
        {/* <Login />
        <Register /> */}

        <PurchaseTotal />

        
      </div>


    </Router>
  );
}

export default App;
