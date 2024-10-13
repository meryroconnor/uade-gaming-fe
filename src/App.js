import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/hompage/Hero';
import SearchBar from './components/hompage/SearchBar';
import NavigationIcons from './components/hompage/NavigationIcons';
import './App.css';
import Carousel from './components/hompage/Carousel';
import ImagesPlaceholder from './components/hompage/ImagesPlaceholder';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-wrapper">
          <Hero />
          <div className="search-nav-wrapper">
            <SearchBar />
            <NavigationIcons />
          </div>
          <Carousel />
          <ImagesPlaceholder />
        </div>
      </div>
    </Router>
  );
}

export default App;
