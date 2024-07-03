// src/components/Movies.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const Movies = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">Movies Page</h1>
      <p>Explore our movie collection!</p>
      <Outlet />
    </div>
  );
};

export default Movies;
