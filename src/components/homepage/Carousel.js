import React, { useState } from 'react';
import './Carousel.css';

import image1 from '../../images/carousel1.jpg';
import image2 from '../../images/carousel2.jpg';
import image3 from '../../images/carousel3.jpg';
import image4 from '../../images/carousel4.jpg';
import image5 from '../../images/carousel5.jpg';

const images = [image1, image2, image3, image4, image5];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const getImageIndex = (index) => {
    return (index + images.length) % images.length;
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">
        <span className="highlight">Explore</span> new dimensions
      </h2>
      <div className="carousel">
        {[-1, 0, 1].map((offset) => {
          const index = getImageIndex(currentIndex + offset);
          return (
            <div
              key={index}
              className={`carousel-item ${offset === 0 ? 'active' : offset === -1 ? 'prev' : 'next'}`}
            >
              <img src={images[index]} alt={`Slide ${index + 1}`} />
            </div>
          );
        })}
        <button className="carousel-button prev" onClick={prevSlide}>
          &lt;
        </button>
        <button className="carousel-button next" onClick={nextSlide}>
          &gt;
        </button>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;