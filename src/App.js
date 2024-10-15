import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/homepage/Hero';
import SearchBar from './components/homepage/SearchBar';
import NavigationIcons from './components/homepage/NavigationIcons';
import './App.css';
import Carousel from './components/homepage/Carousel';
import ImagesPlaceholder from './components/homepage/ImagesPlaceholder';

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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
