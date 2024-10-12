import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/hompage/Hero';
import SearchBar from './components/hompage/SearchBar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Hero />
        <SearchBar />
      </div>
    </Router>
  );
}

export default App;
