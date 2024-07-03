// src/components/SearchForm.js
import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${query}`); // Debugging log
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 flex ">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
