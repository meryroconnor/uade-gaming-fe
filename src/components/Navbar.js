import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import homeIcon from '../images/icons/home.png';
import cartIcon from '../images/icons/cart.png';

const Navbar = ({ openModal }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li>
            <Link to="/">
              <img src={homeIcon} alt="Home" className="icon" />
              Home
            </Link>
          </li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li><Link to="/my-sales">My sales</Link></li>
          <li><Link to="/purchases">Purchases</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
        </ul>
        <div className="navbar-cart">
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className="icon" />
          </Link>
        </div>
        <div className="navbar-auth">
          <div className="vertical-line"></div>
          <Link to="/register" className="register-btn" onClick={openModal} >Register</Link>
          <Link to="/login" className="login-btn">Log in</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;