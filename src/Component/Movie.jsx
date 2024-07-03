// src/components/Movie.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchMovies } from '../slices/movieSlice';
import MovieList from './MovieList';
import CategoryFilter from './CategoryFilter';
import ShowMovie from './ShowMovie';

const Movie = () => {
  const dispatch = useDispatch();
  const { movies, page, totalPages, search, category } = useSelector((state) => state.movie);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (search) {
      dispatch(fetchMovies({ search, page, category }));
    }
  }, [dispatch, search, page, category]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  const handleNextPage = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      dispatch(setPage(nextPage));
      dispatch(fetchMovies({ search, page: nextPage, category }));
    }
  };

  const handlePrevPage = () => {
    const prevPage = page - 1;
    if (prevPage > 0) {
      dispatch(setPage(prevPage));
      dispatch(fetchMovies({ search, page: prevPage, category }));
    }
  };

  return (
    <div className="text-center bg-violet-950 p-4">
      <CategoryFilter />
      {selectedMovie ? (
        <ShowMovie movie={selectedMovie} onClose={handleCloseMovie} />
      ) : (
        <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md mr-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movie;
