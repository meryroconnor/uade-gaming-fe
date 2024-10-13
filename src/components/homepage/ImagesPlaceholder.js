import React from 'react';
import { Link } from 'react-router-dom';
import './ImagesPlaceholder.css';
import image1 from '../../images/greetings1.jpg'; 
import image2 from '../../images/greetings2.jpg'; 

const ImagesPlaceholder = () => {
  return (
    <div className="images-placeholder">
        <img src={image1} alt="Gaming controller" />
        <img src={image2} alt="Gaming controller" />
    </div>
  );
};

export default ImagesPlaceholder;