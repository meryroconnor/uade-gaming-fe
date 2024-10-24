import React from 'react';
import CommentCard from '../CommentCard';
import './Testimonials.css';

import default_user from '../../images/default_user.jpg';

const Testimonials = () => {
  const testimonials = [
    { id: 1, name: "Viezh Robert", avatar: default_user, rating: 4.0, comment: "Wow... I am very happy to use this site. I have purchased many games and the offers are really good." },
    { id: 2, name: "Paola Grey", avatar: default_user, rating: 4.5, comment: "I really like the email subscription, all the game recommendations were of my interest" },
    { id: 3, name: "Tonatiu Diaz", avatar: default_user, rating: 4.5, comment: "Beware of bargains are really too tempting! Since I registered I increased my monthly game purchases" },
  ];

  return (
    <div className="testimonials">
      <h2 className="testimonials__title">Trusted by Thousands of Happy Customer</h2>
      <p className="testimonials__subtitle">
        We keep track of our customer experience.
        We plan towards better experiences everyday
      </p>
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

export default Testimonials;
