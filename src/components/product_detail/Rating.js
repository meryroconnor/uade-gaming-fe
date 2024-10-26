import React from 'react';
import CommentCard from '../CommentCard';
import './Rating.css';

import default_user from '../../images/default_user.jpg';

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#ffa500" : "none"}
    stroke={filled ? "#ffa500" : "#ffffff"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Rating = ({ rating, reviewCount }) => {
  const testimonials = [
    { id: 1, name: "Alejandro Garcia", avatar: default_user, rating: 1.5, comment: "No hay mucho bueno que decir sobre este juego. Aparte de lo que todos odian del juego. Digo juego porque no es un sim..." },
    { id: 2, name: "Javier Vera", avatar: default_user, rating: 4.5, comment: "Now in 2023-2024 Gran Turismo 7, in terms of keeping up with the original GT games roots, is a HUGE improvement over its last couple of Prequels..." },
    { id: 3, name: "Florencia Mendoza", avatar: default_user, rating: 4.5, comment: "Uno de los mejores partidos que he jugado en mucho tiempo. Los gráficos se ven fenomenales y funciona a las mil maravillas." },
    { id: 4, name: "Joon Seong Tan", avatar: default_user, rating: 4.5, comment: "Wow... estoy muy feliz de usar esta VPN, resultó ser más que mis expectativas y hasta ahora no he habido problemas." },
    { id: 5, name: "Guillermo Bruno", avatar: default_user, rating: 5.0, comment: "As a person who likes to play racing sims casually for fun this game ticks all its for the moment I finished all my menu books..." },
    { id: 6, name: "Juan Lopez", avatar: default_user, rating: 4.5, comment: "The rating might make this game a hard press to buy now, but I read some of the 3 star reviews, and don't agree with alot of them..." }
  ];

  return (
    <div className="rating">
      <h2 className="rating__title">Customer Experience</h2>
      <div className="rating__summary">
        <div className="rating__stars">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
          ))}
        </div>
        <span className="rating__score">{rating}</span>
        <span className="rating__count">({reviewCount})</span>
      </div>
      
      <div className="testimonials__container">
        {testimonials.map(testimonial => (
          <CommentCard
            key={testimonial.id}
            avatar = {testimonial.avatar}
            name={testimonial.name}
            rating={testimonial.rating}
            comment={testimonial.comment}
          />
        ))}
      </div>
      <div className="testimonials__navigation">
        <div className="testimonials__dots">
          <span className="testimonials__dot testimonials__dot--active"></span>
          <span className="testimonials__dot"></span>
          <span className="testimonials__dot"></span>
          <span className="testimonials__dot"></span>
        </div>
        <div className="testimonials__arrows">
          <button className="testimonials__arrow testimonials__arrow--left">&larr;</button>
          <button className="testimonials__arrow testimonials__arrow--right">&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default Rating;