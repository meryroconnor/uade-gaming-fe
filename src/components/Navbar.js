import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Logo</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/catalog">Catalog</Link></li>
        <li><Link to="/my-sales">My sales</Link></li>
        <li><Link to="/purchases">Purchases</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
      </ul>
      <div className="navbar-cart">
        <Link to="/cart">Cart</Link>
      </div>
      <div className="navbar-auth">
        <Link to="/register" className="register-btn">Register</Link>
        <Link to="/login" className="login-btn">Log in</Link>
      </div>
    </nav>
  );
};

export default Navbar;