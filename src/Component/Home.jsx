// Home.js
import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MovieItem from './MovieItem';
import SearchForm from './SearchForm';
import Footer from './Footer';
import ShowMovie from './ShowMovie'; // Import ShowMovie component

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [featuredMoviesIndex, setFeaturedMoviesIndex] = useState(0);
  const sliderRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMovieId, setShowMovieId] = useState(null); // State for the selected movie ID to show details

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          searchQuery
            ? `https://api.themoviedb.org/3/search/movie?api_key=fef55a6754f2f6d00a0038388915039c&query=${searchQuery}&page=${currentPage}`
            : `https://api.themoviedb.org/3/discover/movie?api_key=fef55a6754f2f6d00a0038388915039c&page=${currentPage}`
        );
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage, searchQuery]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const nextFeaturedMovie = () => {
    setFeaturedMoviesIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      return newIndex < movies.length ? newIndex : prevIndex;
    });
    scrollSlider();
  };

  const prevFeaturedMovie = () => {
    setFeaturedMoviesIndex(prevIndex => {
      const newIndex = prevIndex - 1;
      return newIndex >= 0 ? newIndex : prevIndex;
    });
    scrollSlider();
  };

  const scrollSlider = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.children[0].offsetWidth;
      sliderRef.current.scrollTo({
        left: featuredMoviesIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleShowDetails = (movieId) => {
    setShowMovieId(movieId);
  };

  const handleCloseMovie = () => {
    setShowMovieId(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 bg-violet-950 flex-1">
        <SearchForm onSearch={handleSearch} />

        {/* Movie Slider */}
        {!searchQuery && (
          <div className="mb-8 relative">
            <h2 className="text-xl mb-2 text-white">The last Movies</h2>
            <div ref={sliderRef} className="relative overflow-hidden">
              <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${featuredMoviesIndex * 100}%)` }}>
                {movies.map((movie, index) => (
                  <div
                    key={movie.id}
                    className={`flex-none w-40 sm:w-52 md:w-64 lg:w-80 p-2 transform transition-transform duration-300 ease-in-out`}
                  >
                    <MovieItem movie={movie} onClick={() => handleShowDetails(movie.id)} />
                  </div>
                ))}
              </div>
            </div>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-400 text-white px-4 py-2 rounded-md"
              onClick={prevFeaturedMovie}
              disabled={featuredMoviesIndex === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-400 text-white px-4 py-2 rounded-md"
              onClick={nextFeaturedMovie}
              disabled={featuredMoviesIndex === movies.length - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}

        {/* Movie Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map(movie => (
            <MovieItem key={movie.id} movie={movie} onClick={() => handleShowDetails(movie.id)} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </div>

      <Footer />

      {/* ShowMovie Component */}
      {showMovieId && <ShowMovie movie={movies.find(movie => movie.id === showMovieId)} onClose={handleCloseMovie} />}
    </div>
  );
};

export default Home;
