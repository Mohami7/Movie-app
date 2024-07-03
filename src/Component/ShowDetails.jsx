// MovieDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

const ShowDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(location.state?.movie || null);

  useEffect(() => {
    if (!movieDetails) {
      const fetchMovieDetails = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY`);
          const data = await response.json();
          setMovieDetails(data);
          console.log(data); // Log movieDetails for debugging
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };

      fetchMovieDetails();
    }
  }, [id, movieDetails]);

  if (!movieDetails) return <div>Loading...</div>;

  const posterUrl = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}`
    : "https://decizia.com/blog/wp-content/uploads/2017/06/default-placeholder.png";

  const starRating = (movieDetails.vote_average / 10) * 5;
  const fullStars = Math.floor(starRating);
  const halfStar = starRating - fullStars >= 0.5;

  return (
    <div className="container mx-auto p-80 pt-8 pl-10 bg-violet-950 text-white">
      <div className="flex items-center justify-center mb-4">
        <div className="flex">
          <img src={posterUrl} alt={movieDetails.title} className="w-80 h-1/2 rounded-md mr-4" />
          <div>
            <h1 className="text-2xl font-bold mb-4">{movieDetails.title}</h1>
            <h2 className='text-xl text-yellow-300'>Description</h2>
            <p className="text-base mb-4">{movieDetails.overview}</p>
            <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
            <p>
              <strong>Rating:</strong>
              <div className="flex items-center">
                {Array.from({ length: fullStars }, (_, index) => (
                  <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
                ))}
                {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
                {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }, (_, index) => (
                  <FontAwesomeIcon key={index} icon={faStarEmpty} className="text-yellow-500" />
                ))}
                <span className="ml-2">{movieDetails.vote_average}</span>
              </div>
            </p>
            <Link to="/" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
