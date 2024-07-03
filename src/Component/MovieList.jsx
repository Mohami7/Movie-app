// src/components/MovieList.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const MovieList = ({ movies, onSelectMovie }) => {

  const renderStars = (vote_average) => {
    const fullStars = Math.floor(vote_average / 2);
    const hasHalfStar = vote_average % 2 !== 0;

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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
      {movies.map((movie) => (
        <div 
          key={movie.id} 
          className="movie-item bg-gray-100 bg-opacity-50 rounded-md shadow-md overflow-hidden relative cursor-pointer group" 
          onClick={() => onSelectMovie(movie)}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-bold text-white">{movie.title}</h3>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(movie.vote_average)}
              <span className="text-yellow-400">{movie.vote_average}</span>
            </div>
            <span className="text-sm text-gray-300">{movie.release_date}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
