import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Highlights from './components/homepage/Highlights';
import Hero from './components/homepage/Hero';
import SearchBar from './components/homepage/SearchBar';
import NavigationIcons from './components/homepage/NavigationIcons';
import './App.css';
import Carousel from './components/homepage/Carousel';
import ImagesPlaceholder from './components/homepage/ImagesPlaceholder';
import Testimonials from './components/homepage/Testimonials';
import ProductHero from './components/product_detail/ProductHero';
import Rating from './components/product_detail/Rating';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-wrapper">
          <ProductHero />
          {/* <Hero />
          <div className="search-nav-wrapper">
            <SearchBar />
            <NavigationIcons />
          </div>
          <Carousel />
          <Highlights />
          <ImagesPlaceholder />
           */}
          <Rating rating={2.5} reviewCount={116} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
