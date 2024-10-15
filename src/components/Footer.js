import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";



const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="footer-logo">Logo</div>
                <p className="footer-vision">
                    Our vision is to offer in one site<br />
                    all the best games loved by the gaming<br />
                    community
                </p>
                <p className="footer-copyright">
                    ©2024 Company Name. All rights reserved
                </p>
            </div>
            <div className="footer-right">
                <div className="footer-social-icons">
                    <a href="#" aria-label="Facebook">
                        <FaFacebook style={{ color: 'white', fontSize: '30px' }} />
                    </a>
                    <a href="#" aria-label="Twitter">
                        <FaTwitter style={{ color: 'white', fontSize: '30px' }} />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <FaInstagramSquare style={{ color: 'white', fontSize: '30px' }}
                        />                    </a>
                </div>
                <div className="footer-links">
                    <a href="#" className="footer-link">
                        Privacy & Policy
                    </a>
                    <a href="#" className="footer-link">
                        Terms & Condition
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
