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
import ProductDetail from './components/product_detail/ProductDetail';
import UserCover from './components/profile/UserCover';
import Wishlist from './components/profile/Wishlist';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content-wrapper">
          <UserCover />
          <Wishlist />
          {/* <ProductHero />
          <ProductDetail />
          <Rating rating={2.5} reviewCount={116} /> */}
          {/* <Hero />
          <div className="search-nav-wrapper">
            <SearchBar />
            <NavigationIcons />
          </div>
          <Carousel />
          <Highlights />
          <ImagesPlaceholder />
           */}
          
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
