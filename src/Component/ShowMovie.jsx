// src/components/ShowMovie.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ShowMovie = ({ movie, onClose }) => {
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    : "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png";

  // Limit description to 50 characters
  const limitedDescription = movie.overview.length > 50
    ? movie.overview.substring(0, 50) + '...'
    : movie.overview;

  // Calculate star rating
  const starRating = (movie.vote_average / 10) * 5;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating - fullStars >= 0.5;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
      <div className="bg-white p-6 pt-2 rounded-lg w-full h-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-0 right-1 text-gray-700 text-2xl rounded-md bg-black-100 hover:bg-gray-300"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <img src={posterUrl} alt={movie.title} className="w-full h-2/3 mb-4 rounded-md" />
        <div className="text-left">
          <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
          <p className="text-base mb-4">{limitedDescription}</p>
          <p className="flex items-center mb-4">
            <strong>Rating:</strong>
            <span className="ml-2">{movie.vote_average}</span>
            <span className="flex ml-2">
              {Array.from({ length: fullStars }, (_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
              ))}
              {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
              {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }, (_, index) => (
                <FontAwesomeIcon key={index} icon={faStarEmpty} className="text-yellow-500" />
              ))}
            </span>
          </p>
          <Link
            to={`/${movie.id}`}
            state={{ movie }} // Pass movie object as state
            onClick={onClose}
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
          >
            Show Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowMovie;
