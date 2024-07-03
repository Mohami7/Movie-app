import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const MovieItem = ({ movie, isFeatured, onClick }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    : "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png";

  const cardHeight = isFeatured ? 'h-96' : 'h-80';

  const renderStars = () => {
    const rating = movie.vote_average;
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <div className={`group relative w-full ${cardHeight}`} onClick={onClick}>
      <div className="w-full h-full bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 transition-opacity duration-300">
        <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
        <div className="flex items-center space-x-1 mt-1">
          {renderStars()}
          <span className="text-yellow-400">{movie.vote_average}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-300">{movie.release_date}</span>
          <FontAwesomeIcon icon={faPlay} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
