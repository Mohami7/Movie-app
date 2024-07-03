// src/components/Pagination.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, fetchMovies } from '../slices/movieSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const { page, totalPages, search } = useSelector((state) => state.movie);

  const handlePrevious = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
      dispatch(fetchMovies({ search, page: page - 1 }));
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
      dispatch(fetchMovies({ search, page: page + 1 }));
    }
  };

  return (
    <div className="pagination">
      <button className="btn btn-primary" onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button className="btn btn-primary" onClick={handleNext} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
