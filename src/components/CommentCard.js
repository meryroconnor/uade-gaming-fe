import React from 'react';
import './CommentCard.css';

const CommentCard = ({ name, avatar, rating, comment }) => {
  return (
    <div className="comment-card">
      <div className="comment-card__header">
        <img src={avatar} alt={name} className="comment-card__avatar" />
        <div className="comment-card__name-rating">
          <h3 className="comment-card__name">{name}</h3>
          <span className="comment-card__rating">{rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="comment-card__comment">{comment}</p>
    </div>
  );
};

export default CommentCard;