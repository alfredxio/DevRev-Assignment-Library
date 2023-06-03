import React from 'react';
import './bookcard.css';
import fallbackImage from '../../assets/noimage.jpg';
const BookCard = ({ book }) => {
  const { title, author_name, first_publish_year, cover_i, first_publish_place, description } = book;
  const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

  const shortenDescription = (text, maxLength) => {
    if (!text) {
      return '';
    }
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };
  return (
    <div className="book-card">
      <div className="book-image-container">
        {cover_i ? (
            <img src={imageUrl} alt={title} className="book-cover"/>
        ) : (
            <img src={fallbackImage} alt="Fallback" className="book-cover"/>
        )}
      </div>
      <div className="book-details">
        <h3 className="book-title">{title}</h3>
        <p className="book-author">By {author_name}</p>
        <p className="book-description">
          {first_publish_place && <span>{first_publish_place}, </span>}
          {first_publish_year}
        </p>
        <p className="book-description">{shortenDescription(description, 120)}</p>
      </div>
    </div>
  );
};

export default BookCard;
