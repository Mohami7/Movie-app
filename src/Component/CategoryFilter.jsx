// src/components/CategoryFilter.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, fetchMovies } from '../slices/movieSlice';

const genres = [
  { id: 'All', name: 'All' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const { search, page } = useSelector((state) => state.movie);

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchMovies({ search, page, category }));
  };

  return (
    <div className="category-filter  flex justify-center mb-4">
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => handleCategoryChange(genre.id)}
          className="px-2 py-3  bg-blue-500 text-white border  hover:bg-blue-600"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
